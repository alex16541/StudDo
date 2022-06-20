import {Component, OnInit} from '@angular/core';
import {SessionService} from "./features/session";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    constructor(
        private sessionService: SessionService
    ) {
    }
    ngOnInit() {
        this.sessionService.initUsers().subscribe();
    }

    title = 'Stud.do';
}
