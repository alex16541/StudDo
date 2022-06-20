import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../../features/session";
import {SidebarService} from "../sidebar/sidebar.service";
import * as moment from "moment";
import {
    CalendarConstructorComponent
} from "../../../../components/constructors/calendar-constructor/calendar-constructor.component";
import {firstValueFrom} from "rxjs";
import {
    ModalChangePasswordComponent
} from "../../../../components/modal/modal-change-password/modal-change-password.component";
import {MatDialog} from "@angular/material/dialog";

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
        private dialog: MatDialog
    ) {
        moment.locale('ru');
        this.date = moment();
    }

    ngOnInit(): void {
    }

    menuClick(){
        this.sidebarService.toggleVisibility();
    }

    editPassword() {
        const createDialogRef = this.dialog.open(ModalChangePasswordComponent);

        createDialogRef.afterClosed().subscribe();
    }

    logout() {
        this.sessionService.logout();
    }
}
