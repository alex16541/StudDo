import {NgModule} from '@angular/core';
import {AlertComponent} from "./alert/alert.component";
import {LoadingComponent} from "./loading/loading.component";
import {ModalQuestionComponent} from "../components/modal/modal-question/modal-question.component";
import {CommonModule} from "@angular/common";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePeriodPipe} from "./pipes/date-period.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {
    CalendarConstructorComponent
} from "../components/constructors/calendar-constructor/calendar-constructor.component";
import {
    EventConstructorComponent
} from "../components/constructors/event-constructor/event-constructor.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";

import {MonthPickerHeaderComponent} from "../components/layouts/month-picker-header/month-picker-header.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {PostConstructorComponent} from "../components/constructors/post-constructor/post-constructor.component";
import {MatCardModule} from "@angular/material/card";
import {RoomLastPostPipe} from "./pipes/room-last-post.pipe";
import { SearchComponent } from './search/search.component';
import {IsPostReadPipe} from "./pipes/is-post-read.pipe";
import {GetReadsOfPostPipe} from "./pipes/get-reads-of-post.pipe";



@NgModule({
    declarations: [
        LoadingComponent,
        ModalQuestionComponent,
        AlertComponent,
        CalendarConstructorComponent,
        EventConstructorComponent,
        PostConstructorComponent,
        DatePeriodPipe,
        RoomLastPostPipe,
        IsPostReadPipe,
        GetReadsOfPostPipe,
        MonthPickerHeaderComponent,
        SearchComponent,
    ],
    imports: [
        CommonModule,
        MatRippleModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
    ],
    providers: [

    ],
    exports: [
        LoadingComponent,
        ModalQuestionComponent,
        AlertComponent,
        MatRippleModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        DatePeriodPipe,
        RoomLastPostPipe,
        CalendarConstructorComponent,
        EventConstructorComponent,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        SearchComponent,
        IsPostReadPipe,
        GetReadsOfPostPipe,
    ],
})
export class SharedModule {
}
