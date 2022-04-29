import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../../features/session";
import {SidebarService} from "../sidebar/sidebar.service";
import {AlertService} from "../../../../shared/alert/alert.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public date: Date;
    constructor(
        public sessionService: SessionService,
        private sidebarService: SidebarService
    ) {
        this.date = new Date();
    }

    ngOnInit(): void {
    }

    menuClick(){
        this.sidebarService.toggleVisibility();
    }
}
