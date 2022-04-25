import {Component, OnInit} from '@angular/core';
import {ROOMS} from "../../mock";
import SwiperCore, {Scrollbar, Mousewheel, FreeMode,  SwiperOptions} from "swiper";
import {Router} from "@angular/router";
import {Room, RoomService} from "../../features/room";
SwiperCore.use([Scrollbar, Mousewheel, FreeMode]);

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

    public rooms?: Room[];

    public config:SwiperOptions = {
        direction: 'vertical',
        loop: false,
        speed: 300,
        slidesPerView: 4,
        slidesPerGroup: 2,
        spaceBetween: 20,

        freeMode:true,

        mousewheel: true,
        scrollbar: {
            draggable: true,
        },
    };

    constructor(
        private router: Router,
        private roomService: RoomService
    ) {
        this.getRooms();
    }

    ngOnInit(): void {
    }

    getRooms() {
        this.roomService.getRooms()
            .subscribe(rooms => this.rooms = rooms);
    }

    enterTheRoom(id: number) {
        this.router.navigate(['/room/'+id]);
    }

}
