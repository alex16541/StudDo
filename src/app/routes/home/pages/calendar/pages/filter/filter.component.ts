import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CalendarConstructorComponent} from "../../../../../../components/constructors/calendar-constructor/calendar-constructor.component";
import {Calendar, CalendarService} from "../../../../../../features/calendar";
import {firstValueFrom, Observable} from "rxjs";
import {ModalQuestionComponent} from "../../../../../../components/modal/modal-question/modal-question.component";
import {SessionService} from "../../../../../../features/session";


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    title = 'Расписания';
    allChecked = false;
    fetchedCalendars?: Observable<Calendar[]>;
    calendars?: Calendar[];
    calendarsCount = 0;
    isLoading: boolean = true;
    user = this.sessionService.getSession();


    constructor(
        private location: Location,
        private router: Router,
        public dialog: MatDialog,
        public calendarService: CalendarService,
        private sessionService: SessionService,
    ) {
        this.getCalendars();
    }

    ngOnInit(): void {
    }

    back() {
        this.location.back();
    }

    getCalendars(){
        this.isLoading = true;
        this.calendarService.getCalendars().subscribe(calendars => {
            calendars = calendars.filter(c => c.users.find(uId => uId == this.user.id))
            if (calendars.length > 0){
                this.calendars = calendars.sort((a,b)=>this.sort(a,b));
                this.calendarsCount = calendars.length;
            }
            this.isLoading = false;
        });
        this.fetchedCalendars = this.calendarService.getCalendars();
    }

    sort(a:Calendar, b:Calendar):number {
        if(a.name && b.name) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
        }
        return 0;
    };

    createCalendar() {
        const createDialogRef = this.dialog.open(CalendarConstructorComponent);

        createDialogRef.afterClosed().subscribe(result => {
            if(result && this.calendars){
                this.isLoading = true;
                result.mainCalendarVisible = true
                firstValueFrom(
                    this.calendarService.addCalendar(result)
                ).then(_ => this.getCalendars())
            }
        })
    }

    editCalendar(calendar: Calendar) {
        const editDialogRef = this.dialog.open(CalendarConstructorComponent,{
            data: {calendar: {...calendar}}
        });

        editDialogRef.afterClosed().subscribe(result => {
            if (result && this.calendars) {
                this.calendarService.updateCalendar(result).subscribe();
                this.getCalendars();
            }
        })
    }

    deleteCalendar(calendar: Calendar) {
        const deleteDialogRef = this.dialog.open(ModalQuestionComponent, {
            data: {
                question: `Удалить расписание "${calendar.name}"?`,
                yes: 'Да, удалить расписание',
                no: 'Нет, не удалять'
            }
        });

        deleteDialogRef.afterClosed().subscribe(result => {
            if (result && this.calendars) {
                this.calendarService.deleteCalendar(calendar.id).subscribe();
                this.getCalendars();
            }
        })
    }

    updateAllComplete(calendar: Calendar) {
        this.allChecked = this.calendars != null && this.calendars.every(t => t.mainCalendarVisible);
        this.changeCalendarVisibility(calendar);
    }

    someComplete(): boolean {
        if (this.calendars == null) {
            return false;
        }
        return this.calendars.filter(t => t.mainCalendarVisible).length > 0 && !this.allChecked;
    }

    setAll(completed: boolean) {
        this.allChecked = completed;
        if (this.calendars == null) {
            return;
        }
        this.calendars.forEach(t => {
            t.mainCalendarVisible = completed;
            this.changeCalendarVisibility(t);
        });
    }

    changeCalendarVisibility(calendar: Calendar) {
        this.calendarService.updateCalendar(calendar).subscribe();
    }
}
