import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {SessionService} from "../features/session";
import {AlertService} from "../shared/alert/alert.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private sessionService: SessionService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const session = this.sessionService.getSession();
        const isLoggedIn = session && session.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Token: `Bearer ${session.token}`
                }
            });
        }

        return next.handle(request);
    }
}
