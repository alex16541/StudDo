import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../../features/session";
import {SidebarService} from "../sidebar/sidebar.service";
import * as moment from "moment";
import {UserService} from "../../../../features/user";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public date: moment.Moment;
    constructor(
        public sessionService: SessionService,
        private sidebarService: SidebarService,
        public  userService: UserService
    ) {
        moment.locale('ru');
        this.date = moment();
    }

    ngOnInit(): void {
    }

    menuClick(){
        this.sidebarService.toggleVisibility();
    }

    test() {
        this.sessionService.test();
    }
}
