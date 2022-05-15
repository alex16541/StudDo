import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CalendarConstructorComponent} from "./calendar-constructor/calendar-constructor.component";
import {Calendar, CalendarService} from "../../../../../../features/calendar";
import {firstValueFrom, Observable} from "rxjs";
import {ModalQuestionComponent} from "../../../../../../shared/modal-question/modal-question.component";


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    title = 'Календари';
    allChecked = false;
    fetchedCalendars?: Observable<Calendar[]>;
    calendars?: Calendar[];
    calendarsCount: number | null = null;
    isLoading: boolean = true;


    constructor(
        private location: Location,
        private router: Router,
        public dialog: MatDialog,
        public calendarService: CalendarService,
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
            this.calendars = calendars;
            this.calendarsCount = calendars.length;
            this.isLoading = false;
        });
        this.fetchedCalendars = this.calendarService.getCalendars();
    }

    createCalendar() {
        const createDialogRef = this.dialog.open(CalendarConstructorComponent);

        createDialogRef.afterClosed().subscribe(result => {
            if(result && this.calendars){
                this.isLoading = true;
                firstValueFrom(
                    this.calendarService.addCalendar({
                        id: 0,
                        name: result.name,
                        color: result.color, description: result.description,
                        mainCalendarVisible: true,
                        events: result.events
                    })
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
                question: `Удалить календарь "${calendar.name}"?`,
                yes: 'Да, удалить календарь',
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

    updateAllComplete() {
        this.allChecked = this.calendars != null && this.calendars.every(t => t.mainCalendarVisible);
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
        this.calendars.forEach(t => (t.mainCalendarVisible = completed));
    }
}
