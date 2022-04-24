import { Component, OnInit } from '@angular/core';
import SwiperCore, {Scrollbar, Mousewheel, FreeMode,  SwiperOptions} from "swiper";
SwiperCore.use([Scrollbar, Mousewheel, FreeMode]);
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    links = [
        {text: 'Главная', url: '#'},
        {text: 'Расписание', url: '#'},
        {text: 'Календарь', url: '#'},
        {text: '-------', url: '#'},
        {text: 'Комната1', url: '#'},
        {text: 'Комната2', url: '#'},
        {text: 'Комната3', url: '#'},
        {text: '-------', url: '#'},
        {text: 'Чат1', url: '#'},
        {text: 'Чат2', url: '#'},
        {text: 'Чат3', url: '#'},
        {text: 'Чат4', url: '#'},
        {text: '-------', url: '#'},
        {text: 'Настройки', url: '#'},
        {text: 'Выход', url: '#'},
    ];
    config: SwiperOptions = {
        direction: 'vertical',
        loop: false,
        speed: 200,
        slidesPerView: 10,
        slidesPerGroup: 2,

        // And if we need scrollbar
        // freeMode:true,
        grabCursor: true,
        mousewheel: true,
        scrollbar: {
            draggable: false,
        },
    };

  constructor() { }

  ngOnInit(): void {
  }

}
