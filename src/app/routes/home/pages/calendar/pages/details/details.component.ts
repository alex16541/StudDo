import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {Location} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, firstValueFrom, Subscription} from "rxjs";
import {Calendar, CalendarService} from "../../../../../../features/calendar";
import {CalendarConstructorComponent} from "../filter/calendar-constructor/calendar-constructor.component";
import {MatDialog} from "@angular/material/dialog";
import {EventConstructorComponent} from "./event-constructor/event-constructor.component";
import {CalendarEvent} from "../../../../../../features/calendar/event.interface";

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


    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private calendarService: CalendarService,
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
        let data = await this.calendarService.getCalendarsWithEvents();
        this.allCalendars = data;
        data.map(value => {
            value.events = value.events.filter( e => this.isEventToday(e) )
        });

        data = data.filter(value => value.events.length > 0);

        this.calendars = data;
    }

    isEventToday(e: CalendarEvent): boolean{
        let d = moment(this.date, 'DD-MM-YYYY');
        return (d >= moment(e.start, 'DD-MM-YYYY')
            && d <= moment(e.end, 'DD-MM-YYYY'));
    }

    createEvent() {
        const createDialogRef = this.dialog.open(EventConstructorComponent,
            {
                data: {
                    calendars: this.allCalendars
                }
            });

        createDialogRef.afterClosed().subscribe((result: CalendarEvent) => {
            if (result && this.calendars) {
                this.isLoading = true;
                firstValueFrom(this.calendarService.addEvent(result))
                    .then( _ => this.loadData())
                    .then( _ => this.isLoading = false);
            }
        });
    }

    editEvent(event: CalendarEvent) {
        const createDialogRef = this.dialog.open(EventConstructorComponent,
            {
                data: {
                    event: event,
                    calendars: this.allCalendars
                }
            });

        createDialogRef.afterClosed().subscribe(result => {
            if (result && this.calendars) {
                this.isLoading = true;
                firstValueFrom(this.calendarService.updateEvent(result))
                    .then( _ => this.loadData())
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
