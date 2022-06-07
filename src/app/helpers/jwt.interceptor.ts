import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from "../features/session";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private api = 'http://26.36.84.33:5163/api/';

    constructor(private sessionService: SessionService) {

    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const session = this.sessionService.getSession();
        const isLoggedIn = session && session.data;
        const isApiUrl = request.url.startsWith(this.api);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `bearer ${session.data}`
                }
            });
        }

        return next.handle(request);
    }
}
