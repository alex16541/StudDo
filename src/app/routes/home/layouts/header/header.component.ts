import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../../features/session";
import {SidebarService} from "../sidebar/sidebar.service";
import * as moment from "moment";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public date: moment.Moment;
    constructor(
        public sessionService: SessionService,
        private sidebarService: SidebarService
    ) {
        moment.locale('ru');
        this.date = moment();
    }

    ngOnInit(): void {
    }

    menuClick(){
        this.sidebarService.toggleVisibility();
    }
}
