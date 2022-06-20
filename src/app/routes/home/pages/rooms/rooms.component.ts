import {Component, OnInit} from '@angular/core';
import SwiperCore, {FreeMode, Mousewheel, Scrollbar} from "swiper";
import {Router} from "@angular/router";
import {IRoomUser, Room, RoomRole, RoomService} from "../../../../features/room";
import {SessionService} from "../../../../features/session";
import {firstValueFrom} from "rxjs";
import {
    RoomConstructorComponent
} from "../../../../components/constructors/room-constructor/room-constructor.component";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../../shared/alert/alert.service";
import {logos} from "@igniteui/material-icons-extended";

SwiperCore.use([Scrollbar, Mousewheel, FreeMode]);

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

    public rooms?: Room[];
    public roomUsers: IRoomUser[] = [];
    public searchedRooms: Room[] = [];
    user = this.sessionService.getSession();

    constructor(
        private router: Router,
        private roomService: RoomService,
        private sessionService: SessionService,
        private dialog: MatDialog,
        private alertService: AlertService,
    ) {
        this.getRooms();
    }

    ngOnInit(): void {
    }

    getRooms() {
        firstValueFrom(this.roomService.users()).then(roomUsers => {
                this.roomUsers = roomUsers;
                this.roomUsers = this.roomUsers.filter(user => user.userId == this.user.id);
                firstValueFrom(this.roomService.getRooms()).then(
                    rooms => {
                        this.rooms = rooms?.filter(room => {
                            return !!this.roomUsers.find(ru => ru.roomId == room.id)
                        });
                        this.rooms = this.rooms.sort();
                        this.searchedRooms = this.rooms;
                    }
                )
            }
        )
    }

    createRoom() {
        const createDialogRef = this.dialog.open(RoomConstructorComponent);

        createDialogRef.afterClosed().subscribe((result: Room) => {
            if (result) {
                this.rooms?.push(result);
                this.roomService.addUser({id: null, roomId: result.id, userId: this.user.id, role: RoomRole.admin}).subscribe();
                this.rooms = this.rooms?.sort();
                this.alertService.success('Комната успешно создана! 🎉');
            }
        });

        this.roomService.getCalendars().subscribe(c => console.log(c))
    }

    enterTheRoom(id: number) {
        this.router.navigate(['/home/room/' + id]).then();
    }

    searchRoom($event: string) {
        if (this.rooms) {
            this.searchedRooms = this.rooms.filter(r => {
                return r.name.toLowerCase().includes($event.toLowerCase())
            });
        }
    }
}
