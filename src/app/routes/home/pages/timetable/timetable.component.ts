import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Mousewheel, Navigation, Pagination, Scrollbar, SwiperOptions} from 'swiper';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {

    constructor() {
    }

    days = [
        {
            day: "Понедельник",
            items: [
                '', '','','','Мат. моделирование [СДО]'
            ]
        },
        {
            day: "Вторник",
            items: [
                'Экономика', 'Менеджмент в ПД','Физ. культура','ДОП Тех. през. ИТ','Менеджмент в ПД'
            ]
        },
        {
            day: "Среда",
            items: [
                'Тех. разработка ПО', 'Тех. разработка ПО','Основы философии'
            ]
        },
        {
            day: "Четверг",
            items: [
                'Мат. моделирование', 'Ин. язык в проф. деятельности','ПОПД','ПОПД'
            ]
        },
        {
            day: "Пятница",
            items: [

            ]
        },
        {
            day: "Суббота",
            items: [
                '', 'Инстр. сред. разр. ПО','Инстр. сред. разр. ПО','Экон. отросли','Менедж. в ПД'
            ]
        },
        {
            day: "Воскресенье",
            items: [

            ]
        },
    ];
    config: SwiperOptions = {
        slidesPerView: 1,
        spaceBetween: 30,
        direction: "horizontal",
        grabCursor: true,
        mousewheel: true,
        scrollbar: true,

        breakpoints: {
            767.98: {
                slidesPerView: 2,
            },
            1420: {
                slidesPerView: 3,
            },
        },
    };
    day_config: SwiperOptions = {
        direction: "vertical",
        slidesPerView: "auto",
        autoHeight:true,
        spaceBetween: 20,
        // mousewheel: true,
        scrollbar: true,
        freeMode: true,
    };

    ngOnInit(): void {
    }

}
