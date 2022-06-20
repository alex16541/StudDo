import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// let users = JSON.parse(localStorage.getItem('users') || JSON.stringify([{id:11,name: 'alex', password: '123'}])) ;
//@ts-ignore
let users = JSON.parse(localStorage.getItem('users')) || [] ;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(50))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/account/login') && method === 'POST':
                    return login();
                case url.endsWith('/account/register') && method === 'POST':
                    return register();
                case url.endsWith('/account') && method === 'GET':
                    return getUsers();
                case url.match(/\/account\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/account\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/account\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // password through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function login() {
            const { name, password } = body;
            const user = users.find((x: { name: string; password: string; }) => x.name === name && x.password === password);
            if (!user) return error('Логин или пароль не корректны');
            return ok({
                id: user.id,
                name: user.name,
                email: user.email,
                token: 'fake-jwt-token'
            });
        }

        function register() {
            const user = body

            if (users.find((x: { name: any; }) => x.name === user.name)) {
                return error('Логин "' + user.name + '" уже занят')
            }

            user.id = users.length ? Math.max(...users.map((x: { id: any; }) => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find((x: { id: number; }) => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find((x: { id: number; }) => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter((x: { id: number; }) => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?: { id: number; name: string; email: string; token: string; } | undefined) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Token') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
