import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Input('value') searchText: string = '';
    @Output() onChange = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    change(e: any){
        this.onChange.emit(e.target.value);
    }

}
