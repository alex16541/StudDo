import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ResizebarComponent} from './layouts/resizebar/resizebar.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {SidebarComponent} from './layouts/sidebar/sidebar.component';
import {TimetableComponent} from './pages/timetable/timetable.component';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {SwiperModule} from "swiper/angular";
import { ItemComponent } from './pages/timetable/item/item.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomComponent } from './pages/room/room.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        ResizebarComponent,
        NavbarComponent,
        SidebarComponent,
        TimetableComponent,
        HeaderComponent,
        FooterComponent,
        ItemComponent,
        CalendarComponent,
        RoomsComponent,
        RoomComponent,
        LoadingComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        SwiperModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
