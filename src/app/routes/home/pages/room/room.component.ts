import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {IRoomCalendar, IRoomUser, Room, RoomRole, RoomService} from "../../../../features/room";
import {filter, firstValueFrom, Observable, Subscription} from "rxjs";
import {
    ModalChangePasswordComponent
} from "../../../../components/modal/modal-change-password/modal-change-password.component";
import {SessionService} from "../../../../features/session";
import {SidebarService} from "../../layouts/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {
    PostConstructorComponent
} from "../../../../components/constructors/post-constructor/post-constructor.component";
import {CalendarEvent} from "../../../../features/calendar/event.interface";
import {Post} from "../../../../features/post/post.interface";
import {PostService} from "../../../../features/post/post.service";
import {AlertService} from "../../../../shared/alert/alert.service";
import {logos} from "@igniteui/material-icons-extended";
import * as moment from 'moment';
import {ModalQuestionComponent} from "../../../../components/modal/modal-question/modal-question.component";
import {
    EventConstructorComponent
} from "../../../../components/constructors/event-constructor/event-constructor.component";
import {Calendar, CalendarService} from "../../../../features/calendar";
import {MembersPageComponent} from "./members-page/members-page.component";
import {User, UserService} from "../../../../features/user";
import {
    RoomConstructorComponent
} from "../../../../components/constructors/room-constructor/room-constructor.component";
import {MemberInviteComponent} from "./member-invite/member-invite.component";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnDestroy{

    room : Room | undefined;
    posts : Post[] = [];
    user = this.sessionService.getSession();
    routerEventSubscription: Subscription;
    readPosts: { id: any; postId: number; userId: number }[] = [];
    roomUsers: IRoomUser[] = [];
    now: moment.Moment = moment();
    eventsList: CalendarEvent[] = [];
    todayEvents: CalendarEvent[] = [];
    calendarsList: Calendar[] = [];
    calendar: Calendar = this.calendarsList[0];
    roomCalendars: IRoomCalendar[] = [];
    public isLoading = true;
    days=[] as any[];
    users:  Array<{user: User, roomUser: IRoomUser}> = [];
    member: {user: User, roomUser: IRoomUser} | null = null;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private roomService: RoomService,
        private postService: PostService,
        public calendarService: CalendarService,
        public sessionService: SessionService,
        private userService: UserService,
        private dialog: MatDialog,
        private alertService: AlertService,
    ) {
        this.routerEventSubscription = this.router.events
            .pipe(filter(event=>event instanceof NavigationEnd))
            .subscribe(e => {
                this.isLoading = true;
                firstValueFrom(this.roomService.users()).then( roomUsers =>
                    {
                        this.roomUsers = roomUsers;
                        if(!this.roomUsers.find(ru=> ru.userId == this.user.id)){
                            this.router.navigate(['/home/rooms/']).then();
                        }
                    }
                )
                this.loadData().then(_ => this.isLoading = false);
            });
    }

    ngOnDestroy() {
        this.routerEventSubscription.unsubscribe();
    }

    async loadData() {
        await this.getRoom().then(
            _ =>{
                let isRoomHasUsers = this.roomUsers.find(roomUser=> roomUser.roomId == this.room?.id)
                if(!isRoomHasUsers)
                    this.router.navigate(['/home/rooms/']).then();
            }
        );
        await this.loadCalendars().then()
        await this.getPosts().then();
        await this.getReadPosts().then();
        await this.loadMember().then();

        this.todayEvents = this.getTodayEvents(moment().format('DD-MM-YYYY'), this.calendar.events)
    }

    async getRoom(){
        this.room = undefined;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.room = await firstValueFrom(this.roomService.getRoom(id));
    }

    async getReadPosts(){
        this.readPosts = await firstValueFrom(this.postService.getReadPosts());
    }

    async getPosts(){
        this.posts = [];
        this.posts = await firstValueFrom(this.postService.getPosts());
        this.posts = this.posts.filter(post => post.roomId == this.room?.id);
        this.posts = this.posts.sort((a,b) => this.sort(a,b));
    }

    async loadMember(){
        this.roomUsers = await firstValueFrom(this.roomService.users());
        this.roomUsers = this.roomUsers.filter(u => u.roomId == this.room?.id);

        let ru = this.roomUsers.find(ru => {
            return this.user.id == ru.userId
        })
        if (ru) this.member = {user: this.user, roomUser:ru};
    }

    async loadCalendars(){
        this.eventsList = await firstValueFrom(this.calendarService.getEvents());
        await this.calendarService.getCalendarsWithEvents().then(calendars => this.calendarsList = calendars.filter(c=> {
            return !!c.users.find(uId => uId == this.user.id)
        }));
        this.roomCalendars = await firstValueFrom(this.roomService.getCalendars());
        let roomCalendar = this.roomCalendars.find(c => c.roomId == this.room?.id)
        let calendar = this.calendarsList.find(c => c.id == roomCalendar?.calendarId)
        if (calendar){
            this.calendar = calendar;
        }
    }

    getTodayEvents(date: string, events: CalendarEvent[]): CalendarEvent[] {
        let d = moment(date, 'DD-MM-YYYY');
        return events.filter(e => d >= moment(e.start, 'DD-MM-YYYY') && d <= moment(e.end, 'DD-MM-YYYY'));
    }

    inviteUser(){
        const createDialogRef = this.dialog.open(MemberInviteComponent, {
            data:{
                room: this.room,
                calendar: this.calendar
            }
        });

        createDialogRef.afterClosed().subscribe();
    }

    createPost(){
        const createDialogRef = this.dialog.open(PostConstructorComponent,{
            data:{
                roomId: this.room?.id,
                user: this.user
            }
        });
        createDialogRef.afterClosed().subscribe((result: Post) => {
            if (result) {
                firstValueFrom(this.postService.add(result))
                    .then( post => {
                        if(this.room && post) {
                            this.posts?.push(post);
                            this.room.lastPost = post.roomId;
                            this.roomService.updateRoom(this.room).subscribe()
                            this.posts = this.posts.sort((a,b) => this.sort(a,b));
                        }
                    })
                    .then(_ => this.alertService.success('Пост успешно создан! 🎉'));
            }
        });
    }

    sort(a:Post, b:Post):number {
        let aTime = moment(a.created, 'DD-MM-YYYY hh:mm');
        let bTime = moment(b.created, 'DD-MM-YYYY hh:mm');

        if (aTime.valueOf() > bTime.valueOf()) {
            return -1;
        }
        if (aTime.valueOf() < bTime.valueOf()) {
            return 1;
        }
        return 0;
    };

    leaveTheRoom(room: Room) {
        const deleteDialogRef = this.dialog.open(ModalQuestionComponent, {
            data: {
                question: `Покинуть комнату "${room.name}"?`,
                yes: 'Да, покинуть комнату',
                no: 'Нет, остаться'
            }
        });

        deleteDialogRef.afterClosed().subscribe(result => {
            if (result && room) {
                let userRoom = this.roomUsers.find(ru=> (ru.roomId == room.id) && (ru.userId = this.user.id))
                if (userRoom){
                    this.roomService.deleteUser(userRoom).subscribe()
                    this.router.navigate(['/home/rooms']).then(
                        _=> this.alertService.success('Вы успешно покинули комнату', 'Закрыть')
                    )
                }
            }
        });
    }

    createEvent() {
        const createDialogRef = this.dialog.open(EventConstructorComponent,
            {
                data: {
                    date: moment(),
                    calendars: this.calendarsList,
                    selectedCalendar: this.calendar,
                }
            });

        createDialogRef.afterClosed().subscribe((result: CalendarEvent) => {
            if (result) {
                this.isLoading = true;
                this.loadData()
                    .then(_ => this.isLoading = false);
            }
        });
    }

    deletePost(post: Post) {
        const deleteDialogRef = this.dialog.open(ModalQuestionComponent, {
            data: {
                question: `Удалить пост?`,
                yes: 'Да, удалить пост',
                no: 'Нет, не удалять'
            }
        });

        deleteDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.postService.delete(post.id).subscribe(_ =>{
                    this.alertService.success('Пост успешно удалён', 'Закрыть');
                    this.getPosts().then();
                })
            }
        })
    }

    readThePost(post: Post) {
        this.postService.read({id: null, postId: post.id, userId: this.user.id}).subscribe();
        this.getReadPosts().then();
    }

    unreadThePost(post: Post) {
        let readPost = this.readPosts.find(read => read.postId == post.id && read.userId == this.user.id)
        if(readPost){
            this.postService.unread(readPost).subscribe();
            this.getReadPosts().then();
        }
    }

    showMembers() {
        const createDialogRef = this.dialog.open(MembersPageComponent,
            {
                data: {
                    room: this.room
                }
            });

        createDialogRef.afterClosed().subscribe();
    }
}

// TODO: Сделать создание комнаты

// TODO: Починить сайд бар
// TODO: Переименовать интерфейсы
// TODO: Сделать тулбар в расписаниях
// TODO: Сделать возможность закрепить расписание как основное

// TODO: Сделать список участников в комнате
// TODO: Сделать добавление пользователя в комнату
// TODO: Сделать календари в комнате
// TODO: Сделать расписания в комнате
