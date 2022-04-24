import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ResizebarComponent} from './resizebar/resizebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TimetableComponent} from './timetable/timetable.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SwiperModule} from "swiper/angular";
import { ItemComponent } from './timetable/item/item.component';

@NgModule({
    declarations: [
        AppComponent,
        ResizebarComponent,
        NavbarComponent,
        SidebarComponent,
        TimetableComponent,
        HeaderComponent,
        FooterComponent,
        ItemComponent
    ],
    imports: [
        BrowserModule,
        SwiperModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
