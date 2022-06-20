import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Calendar, CalendarService} from "../../../features/calendar";
import {CalendarEvent} from "../../../features/calendar/event.interface";
import {CalendarConstructorComponent} from "../calendar-constructor/calendar-constructor.component";
import {firstValueFrom} from "rxjs";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AlertService} from "../../../shared/alert/alert.service";
import * as moment from 'moment';

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
    date = moment();
    loading = false;

    constructor(
        public dialogRef: MatDialogRef<EventConstructorComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {
            date: moment.Moment,
            event?: CalendarEvent,
            calendars: Calendar[],
            selectedCalendar: Calendar
        },
        public dialog: MatDialog,
        public calendarService: CalendarService,
        private alertService: AlertService

    ) {
        this.event = {id: null, title: "", start: "12:00", end: "13:00", calendarId: 0};
        this.date = data.date;
        this.calendars = data.calendars;
        if (data.selectedCalendar)
            this.event.calendarId = data.selectedCalendar.id;
        if (data.event)
        {
            this.event = data.event;
            this.title = 'Редактирование события';
        }

        this.form = this.formBuilder.group({
            title: [this.event.title, Validators.required],
            start: [this.event.start, Validators.required],
            end: [this.event.end, Validators.required],
            calendarId: [this.event.calendarId, Validators.required],

        });
    }
    ngOnInit(): void {
    }

    get f() { return this.form.controls; }

    onSubmit() {

        // if (this.f['isAllDay'].value){
        //     this.f['start'].setValue('00:00');
        //     this.f['start'].setValue('24:00');
        // }

        if (this.form.invalid) return;

        let date = this.date.format('DD-MM-YYYY');
        let start = date+' '+this.f['start'].value;
        let end = date+' '+this.f['end'].value;

        this.event.title = this.f['title'].value;
        this.event.start = start;
        this.event.end = end;
        this.event.calendarId = +this.f['calendarId'].value;
        if(this.data.event){
            firstValueFrom(this.calendarService.updateEvent(this.event)).then(
                event=> {
                    this.alertService.success('Событие успешно обновлено', 'Закрыть');
                    this.dialogRef.close(event)
                }
            );
        }
        else{
            firstValueFrom(this.calendarService.addEvent(this.event)).then(
                event=> {
                    this.alertService.success('Событие успешно создано', 'Закрыть');
                    this.dialogRef.close(event)
                }
            );
        }

    }

    createCalendar() {
        const createDialogRef = this.dialog.open(CalendarConstructorComponent);

        createDialogRef.afterClosed().subscribe(result => {
            if(result && this.calendars){
                result.mainCalendarVisible = true
                firstValueFrom(
                    this.calendarService.addCalendar(result)
                ).then(calendar => this.calendars.push(calendar))
            }
        })
    }

    changeEndTime($event: any) {
        this.f['end'].setValue( $event.target.value);
    }

    setEventDuration(e: any) {
        if(e.checked){
            this.f['start'].setValue('00:00');
            this.f['end'].setValue('23:59');
        }
        else{
            this.f['start'].setValue('12:00');
            this.f['end'].setValue('13:00');
        }
    }
}
