import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HomeComponent } from './routes/home/home.component';
import { AccountComponent } from "./routes/account/account.component";
import { HomeModule } from "./routes/home/home.module";
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './helpers';
import { AccountModule } from "./routes/account/account.module";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalChangePasswordComponent } from './components/modal/modal-change-password/modal-change-password.component';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import { RoomConstructorComponent } from './components/constructors/room-constructor/room-constructor.component';

@NgModule({
    declarations: [
        AppComponent,
        AccountComponent,
        HomeComponent,
        ModalChangePasswordComponent,
        RoomConstructorComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false, delay: 0}),
        HomeModule,
        AccountModule,
        SharedModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
        // provider used to create fake backend
        fakeBackendProvider
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
