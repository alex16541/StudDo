import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user.interface';



@Injectable({ providedIn: 'root' })
export class UserService {

    private userUrl = 'api/user';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) { }

    /** GET users from the server */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl)
            .pipe(
                tap(_ => UserService.log('fetched users')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    /** GET user by id. Return `undefined` when id not found */
    getNo404<Data>(id: number): Observable<User> {
        const url = `${this.userUrl}/?id=${id}`;
        return this.http.get<User[]>(url)
            .pipe(
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? 'fetched' : 'did not find';
                    UserService.log(`${outcome} user id=${id}`);
                }),
                catchError(this.handleError<User>(`getUser id=${id}`))
            );
    }

    /** GET room by id. Will 404 if id not found */
    get(id: number): Observable<User> {
        const url = `${this.userUrl}/${id}`;
        return this.http.get<User>(url).pipe(
            tap(_ => UserService.log(`fetched user id=${id}`)),
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }


    /** GET Users whose name contains search term */
    search(term: string): Observable<User[]> {
        if (!term.trim()) {
            // if not search term, return empty user array.
            return of([]);
        }
        return this.http.get<User[]>(`${this.userUrl}/?name=${term}`).pipe(
            tap(x => x.length ?
                UserService.log(`found users matching "${term}"`) :
                UserService.log(`no users matching "${term}"`)),
            catchError(this.handleError<User[]>('searchUsers', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new user to the server */
    add(user: User): Observable<User> {
        return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
            tap((newUser: User) => UserService.log(`added user w/ id=${newUser.id}`)),
            catchError(this.handleError<User>('addUser'))
        );
    }

    /** DELETE: delete the user from the server */
    delete(id: number): Observable<User> {
        const url = `${this.userUrl}/${id}`;

        return this.http.delete<User>(url, this.httpOptions).pipe(
            tap(_ => UserService.log(`deleted user id=${id}`)),
            catchError(this.handleError<User>('deleteUser'))
        );
    }

    /** PUT: update the user on the server */
    update(user: User): Observable<any> {
        return this.http.put(this.userUrl, user, this.httpOptions).pipe(
            tap(_ => UserService.log(`updated user id=${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
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
            UserService.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a UserService message with the Log */
    private static log(message: string) {
        console.log(`RoomService: ${message}`);
    }

    // private log(message: string) {
    //     this.messageService.add(`HeroService: ${message}`);
    // }


}
