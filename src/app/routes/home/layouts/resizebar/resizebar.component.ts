import { Component, OnInit } from '@angular/core';
declare const ResizebarInit: any;

@Component({
    selector: 'app-resizebar',
    templateUrl: './resizebar.component.html',
    styleUrls: ['./resizebar.component.scss']
})
export class ResizebarComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        ResizebarInit();
    }
}
