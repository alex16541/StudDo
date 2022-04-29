import {NgModule} from '@angular/core';
import {AlertComponent} from "./alert/alert.component";
import {LoadingComponent} from "./loading/loading.component";
import {ModalComponent} from "./modal/modal.component";
import {CommonModule} from "@angular/common";


@NgModule({
    declarations: [
        LoadingComponent,
        ModalComponent,
        AlertComponent,
    ],
    imports: [
        CommonModule

    ],
    providers: [

    ],
    exports: [
        LoadingComponent,
        ModalComponent,
        AlertComponent
    ],
})
export class SharedModule {
}
