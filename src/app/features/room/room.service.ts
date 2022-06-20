import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {IRoomCalendar, IRoomUser, Room} from './room.interface';
import {User} from "../user";



@Injectable({ providedIn: 'root' })
export class RoomService {

    private roomsUrl = 'api/rooms';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET rooms from the server */
    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.roomsUrl)
            .pipe(
                tap(_ => RoomService.log('fetched rooms')),
                catchError(this.handleError<Room[]>('getRooms', []))
            );
    }

    users(): Observable<IRoomUser[]> {
        return this.http.get<IRoomUser[]>('api/roomUsers')
            .pipe(
                tap(_ => RoomService.log('fetched room users')),
                catchError(this.handleError<IRoomUser[]>('users', []))
            );
    }

    addUser(user: IRoomUser) {
        return this.http.post<IRoomUser[]>('api/roomUsers', user, this.httpOptions)
            .pipe(
                tap(_ => RoomService.log('added room users')),
                catchError(this.handleError<IRoomUser[]>('addUser', []))
            );
    }

    deleteUser(user: IRoomUser) {
        return this.http.delete<IRoomUser[]>('api/roomUsers/'+user.id, this.httpOptions)
            .pipe(
                tap(_ => RoomService.log('deleted room users')),
                catchError(this.handleError<IRoomUser[]>('addUser', []))
            );
    }
    updateUser(roomUser: IRoomUser): Observable<any> {
        return this.http.put('api/roomUsers/', roomUser, this.httpOptions).pipe(
            tap(_ => RoomService.log(`updated room user id=${roomUser.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    getCalendars(): Observable<IRoomCalendar[]> {
        return this.http.get<IRoomCalendar[]>('api/roomCalendar')
            .pipe(
                tap(_ => RoomService.log('fetched room calendar list')),
                catchError(this.handleError<IRoomCalendar[]>('getCalendars', []))
            );
    }

    initCalendar(roomCalendar: IRoomCalendar) {
        return this.http.post<IRoomCalendar[]>('api/roomCalendar', roomCalendar, this.httpOptions)
            .pipe(
                tap(_ => RoomService.log('added calendar to room')),
                catchError(this.handleError<IRoomCalendar[]>('initCalendar', []))
            );
    }

    deleteCalendar(roomCalendar: IRoomCalendar) {
        return this.http.delete<IRoomCalendar[]>('api/roomCalendar/'+roomCalendar.id, this.httpOptions)
            .pipe(
                tap(_ => RoomService.log('deleted calendar room users')),
                catchError(this.handleError<IRoomCalendar[]>('deleteCalendar', []))
            );
    }


    /** GET room by id. Return `undefined` when id not found */
    getRoomNo404<Data>(id: number): Observable<Room> {
        const url = `${this.roomsUrl}/?id=${id}`;
        return this.http.get<Room[]>(url)
            .pipe(
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? 'fetched' : 'did not find';
                    RoomService.log(`${outcome} room id=${id}`);
                }),
                catchError(this.handleError<Room>(`getRoom id=${id}`))
            );
    }

    /** GET room by id. Will 404 if id not found */
    getRoom(id: number): Observable<Room> {
        const url = `${this.roomsUrl}/${id}`;
        return this.http.get<Room>(url).pipe(
            tap(_ => RoomService.log(`fetched room id=${id}`)),
            catchError(this.handleError<Room>(`getRoom id=${id}`))
        );
    }

    /** GET rooms whose name contains search term */
    searchRooms(term: string): Observable<Room[]> {
        if (!term.trim()) {
            // if not search term, return empty room array.
            return of([]);
        }
        return this.http.get<Room[]>(`${this.roomsUrl}/?name=${term}`).pipe(
            tap(x => x.length ?
                RoomService.log(`found rooms matching "${term}"`) :
                RoomService.log(`no rooms matching "${term}"`)),
            catchError(this.handleError<Room[]>('searchRooms', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new room to the server */
    addRoom(room: Room): Observable<Room> {
        return this.http.post<Room>(this.roomsUrl, room, this.httpOptions).pipe(
            tap((newRoom: Room) => RoomService.log(`added room w/ id=${newRoom.id}`)),
            catchError(this.handleError<Room>('addRoom'))
        );
    }

    /** DELETE: delete the room from the server */
    deleteRoom(id: number): Observable<Room> {
        const url = `${this.roomsUrl}/${id}`;

        return this.http.delete<Room>(url, this.httpOptions).pipe(
            tap(_ => RoomService.log(`deleted room id=${id}`)),
            catchError(this.handleError<Room>('deleteRoom'))
        );
    }

    /** PUT: update the room on the server */
    updateRoom(room: Room): Observable<any> {
        return this.http.put(this.roomsUrl, room, this.httpOptions).pipe(
            tap(_ => RoomService.log(`updated room id=${room.id}`)),
            catchError(this.handleError<any>('updateRoom'))
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
            RoomService.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a CalendarService message with the Log */
    private static log(message: string) {
        console.log(`RoomService: ${message}`);
    }

    // private log(message: string) {
    //     this.messageService.add(`HeroService: ${message}`);
    // }

}
