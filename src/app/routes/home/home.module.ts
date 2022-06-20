import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ResizebarComponent} from "./layouts/resizebar/resizebar.component";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {SidebarComponent} from "./layouts/sidebar/sidebar.component";
import {TimetableComponent} from "./pages/timetable/timetable.component";
import {HeaderComponent} from "./layouts/header/header.component";
import {FooterComponent} from "./layouts/footer/footer.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {RoomComponent} from "./pages/room/room.component";
import {HomeRoutingModule} from "./home-routing.module";
import {SwiperModule} from "swiper/angular";
import {SharedModule} from "../../shared/shared.module";
import { ListItemComponent } from './pages/calendar/list-item/list-item.component';
import { DetailsComponent } from './pages/calendar/pages/details/details.component';
import { FilterComponent } from './pages/calendar/pages/filter/filter.component';
import { PageTemplateComponent } from './layouts/page-template/page-template.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import { MembersPageComponent } from './pages/room/members-page/members-page.component';
import { MemberInviteComponent } from './pages/room/member-invite/member-invite.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        SwiperModule,
        SharedModule,
        FormsModule,
        MatMenuModule,
        MatInputModule,

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
        CalendarComponent,
        RoomsComponent,
        RoomComponent,
        ListItemComponent,
        DetailsComponent,
        FilterComponent,
        PageTemplateComponent,
        MembersPageComponent,
        MemberInviteComponent,
    ]
})
export class HomeModule { }
