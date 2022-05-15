import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Calendar} from "../../../../../../../features/calendar";


@Component({
  selector: 'app-calendar-event-constructor',
  templateUrl: './calendar-constructor.component.html',
  styleUrls: ['./calendar-constructor.component.scss']
})
export class CalendarConstructorComponent implements OnInit {
    title = 'Создание нового календаря';
    calendar: Calendar;
    form: FormGroup;
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<CalendarConstructorComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data?: { calendar?: Calendar},

    ) {
        this.calendar = {id: 0, name: '', description: '', color: '', mainCalendarVisible: true, events: []};

        if (data?.calendar)
        {
            this.calendar = data.calendar;
            this.title = 'Редактирование календаря';
        }

        this.form = this.formBuilder.group({
            name: [this.calendar.name, Validators.required],
            description: [this.calendar.description],
            color: [this.calendar.color],
        });
    }
    ngOnInit(): void {
    }

    get f() { return this.form.controls; }

    onSubmit() {

        if (this.form.invalid) return;

        this.calendar.name = this.f['name'].value;
        this.calendar.description = this.f['description'].value;
        this.calendar.color = this.f['color'].value;

        this.dialogRef.close(this.calendar);
    }
}
