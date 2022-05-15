import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import {LoginComponent} from "./pages/login/login.component";
import { RegisterComponent } from './pages/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeModule} from "../home/home.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        HomeModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    exports: [

    ]
})
export class AccountModule { }
