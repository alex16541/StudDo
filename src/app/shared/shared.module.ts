import {NgModule} from '@angular/core';
import {AlertComponent} from "./alert/alert.component";
import {LoadingComponent} from "./loading/loading.component";
import {ModalQuestionComponent} from "./modal-question/modal-question.component";
import {CommonModule} from "@angular/common";
import {MatRippleModule} from "@angular/material/core";
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
} from "../routes/home/pages/calendar/pages/filter/calendar-constructor/calendar-constructor.component";
import {
    EventConstructorComponent
} from "../routes/home/pages/calendar/pages/details/event-constructor/event-constructor.component";



@NgModule({
    declarations: [
        LoadingComponent,
        ModalQuestionComponent,
        AlertComponent,
        CalendarConstructorComponent,
        EventConstructorComponent,
        DatePeriodPipe,

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
        CalendarConstructorComponent,
        EventConstructorComponent,

    ],
})
export class SharedModule {
}
