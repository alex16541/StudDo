import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Session} from './session.interface';
import {User, UserService} from "../user";
import {Router} from "@angular/router";
import {AlertService} from "../../shared/alert/alert.service";



@Injectable({providedIn: 'root'})
export class SessionService {
    private sessionSubject: BehaviorSubject<Session>;
    public session: Observable<Session>;
    public api = 'http://26.36.84.33:5163/api/';


    constructor(
        private userService: UserService,
        private http: HttpClient,
        private router: Router,
        private alertService: AlertService
    ) {
        //@ts-ignore
        this.sessionSubject = new BehaviorSubject<Session>(JSON.parse(localStorage.getItem('session')));
        this.session = this.sessionSubject.asObservable();
    }



    public getSession(): Session {
        return this.sessionSubject.value;
    }

    public login(email: string, pass: string): Observable<Session> {
        return this.http.post<Session>(`${this.api}Auth/login`, {
            "email": email,
            "password": pass
        }).pipe(
            map(
                session => {
                    localStorage.setItem('session', JSON.stringify(session));
                    this.sessionSubject.next(session);
                    return session;
                }
            )
        );
    }

    public test(): void {

    }

    /** Remove session from local storage and set current session to null */
    logout() {
        localStorage.removeItem('session');
        //@ts-ignore
        this.sessionSubject.next(null);
        this.userService.logout();
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post<any>(`${this.api}Auth/register`, user)
            .pipe(catchError(this.handleError<any>('register')));
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
            if(error.message){
                SessionService.log(`${operation} failed: ${error.message}`);
                this.alertService.error(error.message, { keepAfterRouteChange: true });
            }
            else if (error.title){
                SessionService.log(`${operation} failed: ${error.title}`);
                this.alertService.error(error.title, { keepAfterRouteChange: true });
            }



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
