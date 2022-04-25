import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TimetableComponent} from "./pages/timetable/timetable.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {RoomComponent} from "./pages/room/room.component";

const routes: Routes = [
    { path: '', redirectTo: '/timetable', pathMatch: 'full'},
    { path: 'timetable', component: TimetableComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'room/:id', component: RoomComponent },
    { path: 'room', redirectTo: '/rooms', pathMatch: 'full'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
