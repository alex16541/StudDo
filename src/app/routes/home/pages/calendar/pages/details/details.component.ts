import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {Location} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, firstValueFrom, Subscription} from "rxjs";
import {Calendar, CalendarService} from "../../../../../../features/calendar";
import {CalendarConstructorComponent} from "../../../../../../components/constructors/calendar-constructor/calendar-constructor.component";
import {MatDialog} from "@angular/material/dialog";
import {EventConstructorComponent} from "../../../../../../components/constructors/event-constructor/event-constructor.component";
import {CalendarEvent} from "../../../../../../features/calendar/event.interface";
import {logos} from "@igniteui/material-icons-extended";
import {SessionService} from "../../../../../../features/session";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
    date: moment.Moment;
    title: string = '';
    calendars: Calendar[] = [];
    allCalendars: Calendar[] = [];
    routerEventSubscription: Subscription;
    isLoading: boolean;
    user = this.sessionService.getSession();



    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private calendarService: CalendarService,
        private sessionService: SessionService,
        public dialog: MatDialog,
    ) {
        this.isLoading = true;
        this.date = moment();
        this.routerEventSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(e => {
                this.isLoading = true;
                this.setDate();
                this.loadData().then( _ => this.isLoading = false);
            });
    }

    ngOnInit(): void {
        moment.locale('ru');
        this.setDate();
    }

    ngOnDestroy() {
        this.routerEventSubscription.unsubscribe();
    }

    async loadData(){
        this.calendarService.getCalendarsWithEvents().then( calendars =>{
            this.allCalendars = calendars
            this.filterCalendars();
        });
    }

    private filterCalendars() {
        let data :Calendar[] = [];
        data = JSON.parse(JSON.stringify(this.allCalendars))
        data.forEach(value => {
            value.events = value.events.filter( e => this.isEventToday(e) )
        });
        data = data.filter(calendar => calendar.mainCalendarVisible);
        data = data.filter(calendar => calendar.events.length > 0);
        data = data.filter(calendar => calendar.users.find(uId=>uId == this.user.id))
        this.calendars = data;
    }

    isEventToday(event: CalendarEvent): boolean{

        let d = moment(this.date.format('DD-MM-YYYY'),'DD-MM-YYYY');
        let s = moment(event.start,'DD-MM-YYYY');
        let e = moment(event.end,'DD-MM-YYYY');
        return (d.valueOf() >= moment(s, 'DD-MM-YYYY').valueOf()
            && d.valueOf() <= moment(e, 'DD-MM-YYYY').valueOf());
    }

    createEvent() {
        const createDialogRef = this.dialog.open(EventConstructorComponent,
            {
                data: {
                    date: moment(this.date.format('DD-MM-YYYY'),'DD-MM-YYYY'),
                    calendars: this.allCalendars
                }
            });

        createDialogRef.afterClosed().subscribe((result: CalendarEvent) => {
            if (result) {
                this.isLoading = true;
                this.loadData().then(_ => this.isLoading = false);
            }
        });
    }

    editEvent(event: CalendarEvent) {
        const createDialogRef = this.dialog.open(EventConstructorComponent,
            {
                data: {
                    date: moment(this.date.format('DD-MM-YYYY'),'DD-MM-YYYY'),
                    event: event,
                    calendars: this.allCalendars
                }
            });

        createDialogRef.afterClosed().subscribe(result => {
            if (result && this.calendars) {
                this.isLoading = true;
                this.loadData()
                .then( _ => this.isLoading = false)
            }
        });
    }

    setDate() {
        let routerYear = this.route.snapshot.paramMap.get('year');
        let routerMonth = this.route.snapshot.paramMap.get('month');
        let routerDay = this.route.snapshot.paramMap.get('day');

        if(routerMonth && routerYear && routerDay){
            this.date = moment(`${routerYear}/${routerMonth}/${routerDay}`, 'YYYY/MM/DD');
            this.title = this.date.format('DD MMMM YYYY');
        }
    }

    back() {
        this.location.back();
    }
}
