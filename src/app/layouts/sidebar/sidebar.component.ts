import { Component, OnInit } from '@angular/core';
import SwiperCore, {Scrollbar, Mousewheel, FreeMode,  SwiperOptions} from "swiper";
import {SIDEBAR_LINKS} from "../../mock";
SwiperCore.use([Scrollbar, Mousewheel, FreeMode]);
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    links = SIDEBAR_LINKS;
    config: SwiperOptions = {
        direction: 'vertical',
        loop: false,
        speed: 200,
        slidesPerView: 10,
        slidesPerGroup: 2,

        // And if we need scrollbar
        freeMode:true,
        grabCursor: true,
        mousewheel: true,
        scrollbar: {
            draggable: true,
        },
    };

  constructor() { }

  ngOnInit(): void {
  }

}
