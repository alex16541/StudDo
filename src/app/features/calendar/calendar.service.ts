import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {firstValueFrom, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Calendar } from './calendar.interface';
import {CalendarEvent} from "./event.interface";



@Injectable({ providedIn: 'root' })
export class CalendarService {

    private calendarsUrl = 'api/calendars';  // URL to web api
    private calendarEventsUrl = 'api/events';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET calendars from the server */
    getCalendars(): Observable<Calendar[]> {
        return this.http.get<Calendar[]>(this.calendarsUrl)
            .pipe(
                tap(_ => CalendarService.log('fetched calendars')),
                catchError(this.handleError<Calendar[]>('getCalendars', []))
            );
    }

    /** GET calendars from the server */
    getEvents(): Observable<CalendarEvent[]> {
        return this.http.get<CalendarEvent[]>(this.calendarEventsUrl)
            .pipe(
                tap(_ => CalendarService.log('fetched calendarEvents')),
                catchError(this.handleError<CalendarEvent[]>('getCalendarEvents', []))
            );
    }

    async getCalendarsWithEvents(){
        let calendars = await firstValueFrom(this.getCalendars());
        let events = await firstValueFrom(this.getEvents());

        calendars.forEach(calendar => {
            calendar.events = events.filter(e => e.calendarId == calendar.id)
        })

        return calendars;
    }

    /** GET calendar by id. Will 404 if id not found */
    getCalendar(id: number): Observable<Calendar> {
        const url = `${this.calendarsUrl}/${id}`;
        return this.http.get<Calendar>(url).pipe(
            tap(_ => CalendarService.log(`fetched calendar id=${id}`)),
            catchError(this.handleError<Calendar>(`getCalendar id=${id}`))
        );
    }

    /** GET calendars whose name contains search term */
    searchCalendars(term: string): Observable<Calendar[]> {
        if (!term.trim()) {
            // if not search term, return empty calendar array.
            return of([]);
        }
        return this.http.get<Calendar[]>(`${this.calendarsUrl}/?name=${term}`).pipe(
            tap(x => x.length ?
                CalendarService.log(`found calendars matching "${term}"`) :
                CalendarService.log(`no calendars matching "${term}"`)),
            catchError(this.handleError<Calendar[]>('searchCalendars', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new calendar to the server */
    addCalendar(calendar: Calendar): Observable<Calendar> {
        return this.http.post<Calendar>(this.calendarsUrl, calendar, this.httpOptions).pipe(
            tap((newCalendar: Calendar) => CalendarService.log(`added calendar w/ id=${newCalendar.id}`)),
            catchError(this.handleError<Calendar>('addCalendar'))
        );
    }

    /** POST: add a new event to the server */
    addEvent(event: CalendarEvent): Observable<CalendarEvent> {
        return this.http.post<CalendarEvent>(this.calendarEventsUrl, event, this.httpOptions).pipe(
            tap((newEvent: CalendarEvent) => CalendarService.log(`added event w/ id=${newEvent.id}`)),
            catchError(this.handleError<CalendarEvent>('addCalendarEvent'))
        );
    }

    /** DELETE: delete the calendar from the server */
    deleteCalendar(id: number): Observable<Calendar> {
        const url = `${this.calendarsUrl}/${id}`;

        return this.http.delete<Calendar>(url, this.httpOptions).pipe(
            tap(_ => CalendarService.log(`deleted calendar id=${id}`)),
            catchError(this.handleError<Calendar>('deleteCalendar'))
        );
    }

    /** DELETE: delete the calendar from the server */
    deleteEvent(id: number): Observable<CalendarEvent> {
        const url = `${this.calendarEventsUrl}/${id}`;

        return this.http.delete<CalendarEvent>(url, this.httpOptions).pipe(
            tap(_ => CalendarService.log(`deleted event id=${id}`)),
            catchError(this.handleError<CalendarEvent>('deleteEvent'))
        );
    }

    /** PUT: update the calendar on the server */
    updateCalendar(calendar: Calendar): Observable<any> {
        return this.http.put(this.calendarsUrl, calendar, this.httpOptions).pipe(
            tap(_ => CalendarService.log(`updated calendar id=${calendar.id}`)),
            catchError(this.handleError<any>('updateCalendar'))
        );
    }

    /** PUT: update the calendar on the server */
    updateEvent(event: CalendarEvent): Observable<any> {
        return this.http.put(this.calendarEventsUrl, event, this.httpOptions).pipe(
            tap(_ => CalendarService.log(`updated event id=${event.id}`)),
            catchError(this.handleError<any>('updateEvent'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            CalendarService.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a CalendarService message with the Log */
    private static log(message: string) {
        console.log(`CalendarService: ${message}`);
    }

    // private log(message: string) {
    //     this.messageService.add(`HeroService: ${message}`);
    // }
}
