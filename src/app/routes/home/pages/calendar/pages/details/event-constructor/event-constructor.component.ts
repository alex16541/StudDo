import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Calendar} from "../../../../../../../features/calendar";
import {CalendarEvent} from "../../../../../../../features/calendar/event.interface";


@Component({
  selector: 'app-calendar-event-constructor',
  templateUrl: './event-constructor.component.html',
  styleUrls: ['./event-constructor.component.scss']
})
export class EventConstructorComponent implements OnInit {
    title = 'Создание нового события';
    event: CalendarEvent;
    calendars: Calendar[];
    form: FormGroup;
    loading = false;
    constructor(
        public dialogRef: MatDialogRef<EventConstructorComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {
            event?: CalendarEvent,
            calendars: Calendar[]
        },

    ) {
        this.event = {id: 0, title: "", start: "", end: "", calendarId: 0};
        this.calendars = data.calendars;
        if (data.event)
        {
            this.event = data.event;
            this.title = 'Редактирование события';
        }

        this.form = this.formBuilder.group({
            title: [this.event.title, Validators.required],
            start: [this.event.start, Validators.required],
            end: [this.event.end, Validators.required],
            calendarId: [this.event.calendarId, Validators.required]
        });
    }
    ngOnInit(): void {
    }

    get f() { return this.form.controls; }

    onSubmit() {

        if (this.form.invalid) return;

        this.event.title = this.f['title'].value;
        this.event.start = this.f['start'].value;
        this.event.end = this.f['end'].value;
        this.event.calendarId = this.f['calendarId'].value;

        this.dialogRef.close(this.event);
    }
}
