import {Component, Inject, OnInit} from '@angular/core';
import {Room, RoomService} from "../../../../../features/room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Calendar, CalendarService} from "../../../../../features/calendar";
import {SessionService} from "../../../../../features/session";
import {firstValueFrom} from "rxjs";
import {UserService} from "../../../../../features/user";
import {AlertService} from "../../../../../shared/alert/alert.service";

@Component({
  selector: 'app-member-invite',
  templateUrl: './member-invite.component.html',
  styleUrls: ['./member-invite.component.scss']
})
export class MemberInviteComponent implements OnInit {

    title = 'Приглашение в комнату';

    form: FormGroup;
    loading = false;
    email = '';

    constructor(
        public dialogRef: MatDialogRef<MemberInviteComponent>,
        private formBuilder: FormBuilder,
        private roomService: RoomService,
        private calendarService: CalendarService,
        private userService: UserService,
        private alertService: AlertService,
        private sessionService: SessionService,
        @Inject(MAT_DIALOG_DATA) public data: { room: Room, calendar: Calendar},
    ) {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
        });
    }
    ngOnInit(): void {
    }

    get f() { return this.form.controls; }

    async onSubmit() {
        if (this.form.invalid) return;

        if (this.f['email'].value)
            this.email = this.f['email'].value;

        let users = await firstValueFrom(this.userService.getUsers());

        let user = users.find(u => u.email == this.email);
        let rUsers = await firstValueFrom(this.roomService.users());
        if (user && user.id && Number.isInteger(user.id)){
            // @ts-ignore
            let isUserIsMemberOfRoom = !!rUsers.find(u=> u.roomId == this.data.room.id && u.userId == user.id)
            let isUserSubscribedOnCalendar = this.data.calendar.users.find(uId => uId == user?.id);

            if (!isUserSubscribedOnCalendar){
                // @ts-ignore
                this.data.calendar.users.push(user.id);
                this.calendarService.updateCalendar(this.data.calendar).subscribe();
            }


            if(!isUserIsMemberOfRoom)
            {
                this.roomService.addUser({id: null, roomId: this.data.room.id, userId: user.id, role: 0})
                    .subscribe(rUser => {
                        this.alertService.success('Пользователь успешно приглашён');
                        this.dialogRef.close(rUser)
                    });
            }
            else
            {
                this.alertService.success('Пользователь уже находится в комнате');
            }
        }
        else{
            this.alertService.success('Пользователь с таким email нет');
        }
    }
}
