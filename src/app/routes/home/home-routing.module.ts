import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimetableComponent} from "./pages/timetable/timetable.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {RoomComponent} from "./pages/room/room.component";
import {HomeComponent} from "./home.component";
import {DetailsComponent} from "./pages/calendar/pages/details/details.component";
import {FilterComponent} from "./pages/calendar/pages/filter/filter.component";
import {CalendarConstructorComponent} from "../../components/constructors/calendar-constructor/calendar-constructor.component";



const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: '', component: TimetableComponent},
            { path: 'timetable', component: TimetableComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: 'timetable/filter', component: FilterComponent },
            { path: 'calendar/calendar-event-constructor/:id', component: CalendarConstructorComponent },
            { path: 'calendar/:year/:month/:day', component: DetailsComponent },
            { path: 'calendar/:year/:month', component: CalendarComponent },
            { path: 'rooms', component: RoomsComponent },
            { path: 'room/:id', component: RoomComponent },
            { path: 'room', redirectTo: 'home/rooms', pathMatch: 'full'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
