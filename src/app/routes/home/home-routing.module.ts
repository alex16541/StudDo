import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimetableComponent} from "./pages/timetable/timetable.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {RoomComponent} from "./pages/room/room.component";
import {HomeComponent} from "./home.component";



const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: '', redirectTo: '/home/timetable', pathMatch: 'full'},
            { path: 'timetable', component: TimetableComponent },
            { path: 'calendar', component: CalendarComponent },
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
