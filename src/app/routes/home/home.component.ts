import {Component, OnInit} from '@angular/core';
import {SidebarService} from "./layouts/sidebar/sidebar.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        public sidebarService: SidebarService,
    ) {
    }

    ngOnInit(): void {
    }

}
