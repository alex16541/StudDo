import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public date: Date;
    constructor() {
        this.date = new Date();
    }

    ngOnInit(): void {
    }

    settingsClick(){
        console.log('Вызов окна фильтра')
    }
}
