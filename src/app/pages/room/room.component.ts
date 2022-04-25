import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd,RouterEvent} from "@angular/router";
import {ROOMS} from "../../mock";
import {Room, RoomService} from "../../features/room";
import {filter, Observable} from "rxjs";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

    room : Room | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private roomService: RoomService
    ) {
        console.log('reade');

        this.router.events
            .pipe(filter(event=>event instanceof NavigationEnd))
            .subscribe(e => this.getRoom());
    }

    ngOnInit(): void {

    }

    getRoom(){
        this.room = undefined;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.roomService.getRoom(id)
            .subscribe(r => this.room = r);
    }

}
