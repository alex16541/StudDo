import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import SwiperCore, {FreeMode, Mousewheel, Scrollbar, SwiperOptions} from 'swiper';
SwiperCore.use([Scrollbar, Mousewheel, FreeMode]);

@Component({
    selector: 'app-page-template',
    templateUrl: './page-template.component.html',
    styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent implements OnInit {

    config: SwiperOptions = {
        freeMode:true,
        direction:'vertical',
        scrollbar:true,
        slidesPerView:'auto',
        autoHeight:true,
        mousewheel:true,
        allowTouchMove:true,
        breakpoints: {
            768:{
                allowTouchMove:false
            }
        }
    }

    @Input()
    bannerText = 'Пусто';
    @Input()
    bannerTextInvalidData = 'Не верные данные';
    @Input()
    title = '';

    @Input()
    isBannerVisible: boolean = false;
    @Input()
    isInvalidData: boolean = false;


    constructor(
        private location: Location
    ) {
    }

    ngOnInit(): void {

    }

    back() {
        this.location.back();
    }
}
