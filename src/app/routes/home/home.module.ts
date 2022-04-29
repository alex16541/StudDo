import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {ResizebarComponent} from "./layouts/resizebar/resizebar.component";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {SidebarComponent} from "./layouts/sidebar/sidebar.component";
import {TimetableComponent} from "./pages/timetable/timetable.component";
import {HeaderComponent} from "./layouts/header/header.component";
import {FooterComponent} from "./layouts/footer/footer.component";
import {ItemComponent} from "./pages/timetable/item/item.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {RoomComponent} from "./pages/room/room.component";
import {HomeRoutingModule} from "./home-routing.module";
import {SwiperModule} from "swiper/angular";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        SwiperModule,
        SharedModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        ResizebarComponent,
        FooterComponent,
        NavbarComponent,


    ],
    declarations: [
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
    ]
})
export class HomeModule { }
