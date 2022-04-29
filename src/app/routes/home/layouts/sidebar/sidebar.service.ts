import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class SidebarService {

    public _visibility: boolean = false;

    public toggleVisibility(){
        this._visibility = !this._visibility;
    }
    public get visibility(){
        return this._visibility;
    };
}
