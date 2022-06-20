import {Component, Inject, OnInit} from '@angular/core';
import {User, UserService} from "../../../../../features/user";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {SessionService} from "../../../../../features/session";
import {firstValueFrom} from "rxjs";
import {ModalQuestionComponent} from "../../../../../components/modal/modal-question/modal-question.component";
import {IRoomUser, Room, RoomRole, RoomService} from "../../../../../features/room";
import {AlertService} from "../../../../../shared/alert/alert.service";
import {CalendarService} from "../../../../../features/calendar";

@Component({
    selector: 'app-members-page',
    templateUrl: './members-page.component.html',
    styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent {
    users:  Array<{user: User, roomUser: IRoomUser}> = [];
    member: {user: User, roomUser: IRoomUser} | null = null;
    roomUsers: IRoomUser[] = []
    roles = RoomRole;
    isLoading: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<MembersPageComponent>,
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private userService: UserService,
        private roomService: RoomService,
        private alertService: AlertService,
        private calendarService: CalendarService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: { room: Room },
    ) {
        this.loadData().then(_ => this.isLoading = false)
    }

    async loadData(){
        this.isLoading = true;
        this.users = [];
        let tempUsers = await firstValueFrom(this.userService.getUsers());
        this.roomUsers = await firstValueFrom(this.roomService.users());
        this.roomUsers = this.roomUsers.filter(u => u.roomId == this.data.room.id);
        let member = this.sessionService.getSession();
        this.roomUsers.forEach(ru => {
            let u = tempUsers.find(u => u.id == ru.userId)
            if (ru.userId == member.id)
                this.member = {user: member, roomUser:ru};
            if (u){
                this.users.push({
                    user:u,
                    roomUser: ru
                })
            }
        })
    }

    deleteMember(user: any) {
        const deleteDialogRef = this.dialog.open(ModalQuestionComponent, {
            data: {
                question: `Исключить участника из комнаты"?`,
                yes: 'Да, исключить участника',
                no: 'Нет, не исключать'
            }
        });

        deleteDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.roomService.deleteUser(user.roomUser).subscribe(async _ => {
                    let calendars = await firstValueFrom(this.calendarService.getCalendars())
                    let calendar = calendars.find(c => !!c.users.find(id => id == user.user.id))
                    if (calendar){
                        calendar.users = calendar.users.filter(id => id != user.user.id)
                        this.calendarService.updateCalendar(calendar).subscribe()
                    }
                    this.alertService.success('Пользователь успешно исключён', 'Закрыть');
                    this.loadData().then(_ => this.isLoading = false);
                })
            }
        })

    }

    makeMember(user: { user: User; roomUser: IRoomUser }) {
        user.roomUser.role = 0;
        this.roomService.updateUser(user.roomUser).subscribe( _ =>this.alertService.success(user.user.name+' понижен до участника!', 'Закрыть'));
    }

    makeEditor(user: { user: User; roomUser: IRoomUser }) {
        user.roomUser.role = 1;
        this.roomService.updateUser(user.roomUser).subscribe( _ =>this.alertService.success(user.user.name+' повышен до редактора!', 'Закрыть'));
    }
}
