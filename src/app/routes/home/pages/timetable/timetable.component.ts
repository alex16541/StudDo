import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Mousewheel, Navigation, Pagination, Scrollbar, SwiperOptions} from 'swiper';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Calendar, CalendarService} from "../../../../features/calendar";
import * as moment from "moment";
import {CalendarEvent} from "../../../../features/calendar/event.interface";
import {filter, firstValueFrom, Subscription} from "rxjs";
import {SessionService} from "../../../../features/session";
import {
    EventConstructorComponent
} from "../../../../components/constructors/event-constructor/event-constructor.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit, OnDestroy{

    now: moment.Moment = moment();
    eventsList: CalendarEvent[] = [];
    calendarsList: Calendar[] = [];
    calendar: Calendar = this.calendarsList[0];
    routerEventSubscription: Subscription;
    public isLoading = true;
    days=[] as any[];
    public user = this.sessionService.getSession();

    constructor(
        public router: Router,
        private location: Location,
        private route: ActivatedRoute,
        public calendarService: CalendarService,
        public sessionService: SessionService,
        public dialog: MatDialog,
    ) {
        this.routerEventSubscription = this.router.events
            .pipe(filter(event=>event instanceof NavigationEnd))
            .subscribe(_ => {
                this.isLoading = true;
                this.loadData()
                    .then(_ => this.loadData())
                    .then(_ => this.calendar = this.calendarsList[0])
                    .then(_ => this.generateDaysOfMonth(moment()))
                    .then(_ => this.isLoading = false);
            });
    }

    ngOnDestroy() {
        this.routerEventSubscription.unsubscribe();
    }

    ngOnInit(): void {
    }

    async loadData() {
        this.eventsList = await firstValueFrom(this.calendarService.getEvents());
        await this.calendarService.getCalendarsWithEvents().then(calendars => this.calendarsList = calendars.filter(c=> {
            return !!c.users.find(uId => uId == this.user.id)
        }));
    }

    changeCalendar($event: any) {
        let c = this.calendarsList.find(c => c.id == $event.target.value)
        if(c) this.calendar = c;
        this.generateDaysOfMonth(moment());
    }

    generateDaysOfMonth(dt: moment.Moment) {
        if (this.calendarsList.length > 0){
            this.days = [];
            let firstDay = moment(dt.format('YYYY-MM') + '-01').weekday();
            for (let n = 1; n <= 7; n++) {
                let fullDate = dt.format('DD-MM-YYYY');

                let dayEvents = this.getEventsPerDay(fullDate, this.eventsList);
                dayEvents = dayEvents.filter(e=> e.calendarId == this.calendar.id);

                let dayCalendars = this.calendarsList;

                dayCalendars = dayCalendars.filter(c => dayEvents.find(d=> d.calendarId == c.id));
                dayCalendars = dayCalendars.filter(c => c.mainCalendarVisible);

                let day = {
                    day: n,
                    dayOfWeek: dt.format('dddd'),
                    fullDate: fullDate,
                    events: dayEvents,
                };
                this.days.push(day);
                dt.add(1,"d");
            }
            console.log(this.days)
        }
    }

    getEventsPerDay(date: string, events: CalendarEvent[]): CalendarEvent[] {
        let d = moment(date, 'DD-MM-YYYY');
        return events.filter(e => d >= moment(e.start, 'DD-MM-YYYY') && d <= moment(e.end, 'DD-MM-YYYY'));
    }

    createEvent(fullDate: any) {
        const createDialogRef = this.dialog.open(EventConstructorComponent,
            {
                data: {
                    date: moment(fullDate,'DD-MM-YYYY'),
                    calendars: this.calendarsList,
                    selectedCalendar: this.calendar,
                }
            });

        createDialogRef.afterClosed().subscribe((result: CalendarEvent) => {
            if (result) {
                this.isLoading = true;
                this.loadData()
                    .then(_ => this.generateDaysOfMonth(moment()))
                    .then(_ => this.isLoading = false);
            }
        });
    }

    config: SwiperOptions = {
        slidesPerView: 1,
        spaceBetween: 30,
        direction: "horizontal",
        grabCursor: true,
        mousewheel: true,
        scrollbar: true,

        breakpoints: {
            767.98: {
                slidesPerView: 2,
            },
            1420: {
                slidesPerView: 3,
            },
        },
    };
    day_config: SwiperOptions = {
        direction: "vertical",
        slidesPerView: "auto",
        autoHeight:true,
        spaceBetween: 20,
        scrollbar: true,
        freeMode: true,
    };
}
