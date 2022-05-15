import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Session } from './session.interface';
import {User, UserService} from "../user";
import {Router} from "@angular/router";
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class SessionService {
    private apiUrl = 'api/session';
    public session: Observable<Session>;
    constructor(
        private userService: UserService,
        private http: HttpClient,
        private router: Router
    ) {
        //@ts-ignore
        this.sessionSubject = new BehaviorSubject<Session>(JSON.parse(localStorage.getItem('session')));
        this.session = this.sessionSubject.asObservable();
    }

    private sessionSubject: BehaviorSubject<Session>;

    public getSession(): Session{
        return this.sessionSubject.value;
    }

    public login(name: string, pass: string): Observable<Session>{
        return this.http.post<Session>(`${environment.apiUrl}/account/login`, {name, pass})
            .pipe(
                map(session => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('session', JSON.stringify(session));
                    this.sessionSubject.next(session);
                    return session;
                })
                // ,catchError(this.handleError<any>('login'))
            );
    }

    /** Remove session from local storage and set current session to null */
    logout() {
        localStorage.removeItem('session');
        //@ts-ignore
        this.sessionSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/account/register`, user);
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
            SessionService.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a UserService message with the Log */
    private static log(message: string) {
        console.log(`ServiceService: ${message}`);
    }

    //login тутор
    //https://jasonwatmore.com/post/2020/04/28/angular-9-user-registration-and-login-example-tutorial
}
