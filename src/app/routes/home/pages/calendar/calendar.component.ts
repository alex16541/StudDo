import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";
import {filter, firstValueFrom, Observable, Subject, Subscription} from "rxjs";
import {Calendar, CalendarService} from "../../../../features/calendar";
import {CalendarEvent} from "../../../../features/calendar/event.interface";
import {
    MonthPickerHeaderComponent
} from "../../../../components/layouts/month-picker-header/month-picker-header.component";
import {SessionService} from "../../../../features/session";


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
    selectedDay: moment.Moment | null = null;
    days=[] as any[];
    dateText: string = '';
    events$: Observable<CalendarEvent[]> = this.calendarService.getEvents();
    calendars$: Observable<Calendar[]> = this.calendarService.getCalendars();
    routerEventSubscription: Subscription;
    isLoading = false;
    user = this.sessionService.getSession();
    monthPickerHeader = MonthPickerHeaderComponent;

    now: moment.Moment;
    eventsList: CalendarEvent[] = [];
    calendarsList: Calendar[] = [];


    constructor(
        public router: Router,
        private location: Location,
        private route: ActivatedRoute,
        public calendarService: CalendarService,
        public sessionService: SessionService
    ) {
        this.now = moment();
        this.now.locale('ru');
        this.routerEventSubscription = this.router.events
            .pipe(filter(event=>event instanceof NavigationEnd))
            .subscribe(_ => {
                this.isLoading = true;
                this.loadData()
                    .then(_ => this.setDate())
                    .then(_ => this.isLoading = false)
                    .then(_ => this.generateDaysOfMonth(this.now));
            });

        this.dateText = moment(this.now).format('MMMM YYYY');
    }

    ngOnInit():void {

    }

    ngOnDestroy() {
        this.routerEventSubscription.unsubscribe();
    }

    async loadData() {
        this.eventsList = await firstValueFrom(this.events$);
        this.calendarsList = await firstValueFrom(this.calendars$).then( calendars => {
            return  calendars.filter(c => c.users.find(uId => uId == this.user.id))
        });
    }

    setDate() {
        if(Number(this.route.snapshot.paramMap.get('year') && Number(this.route.snapshot.paramMap.get('month')))){
            let routerYear = this.route.snapshot.paramMap.get('year');
            let routerMonth = this.route.snapshot.paramMap.get('month');

            this.now = moment(`${routerYear}/${routerMonth}/01`, 'YYYY/MM/DD');
            this.now.locale('ru');

            this.dateText = moment(this.now).format('MMMM YYYY');
        }
    }

    generateDaysOfMonth(dt: moment.Moment) {
        this.days = [];
        let countOfDays = moment(dt).daysInMonth();
        let firstDayOfWeek = moment(dt.format('YYYY-MM') + '-01').weekday();

        for (let n = 1, dayOfWeek = firstDayOfWeek; n <= countOfDays; n++, dayOfWeek++) {
            if (dayOfWeek == 7)
                dayOfWeek = 0;
            dt.set('date', n);
            let fullDate=moment(dt).format('DD-MM-YYYY');
            let dayEvents = this.getEventsPerDay(fullDate, this.eventsList);
            let dayCalendars = this.calendarsList;
            dayCalendars = dayCalendars.filter(c => dayEvents.find(d=> d.calendarId == c.id));
            dayCalendars = dayCalendars.filter(c => c.mainCalendarVisible);

            let day = {
                day: n,
                dayOfWeek: dayOfWeek,
                fullDate: fullDate,
                events: dayEvents,
                calendars: dayCalendars
            };
            this.days.push(day);
        }
    }

    getEventsPerDay(date: string, events: CalendarEvent[]): CalendarEvent[] {
        let d = moment(date, 'DD-MM-YYYY');
        return events.filter(e => d >= moment(e.start, 'DD-MM-YYYY') && d <= moment(e.end, 'DD-MM-YYYY'));
    }

    changeMonth(offset: number) {
        this.now.set('month',this.now.month()+offset);
        this.router.navigate([`/home/calendar/${moment(this.now).format('YYYY/MM')}`]).then();
    }

    clickDay(date: string) {
        this.router.navigate([`/home/calendar/${moment(date, 'DD-MM-YYYY').format('YYYY/MM/DD')}`]).then();
    }

    setMonthAndYear($event: () => Date, dp: any) {
        dp.close();
        let date = new Date($event.toString())
        let selectedDate = moment(`${date.getFullYear()}/${date.getMonth()+1}`, 'YYYY/MM');
        this.router.navigate([`/home/calendar/${selectedDate.format('YYYY/MM')}`]).then();
    }
}

