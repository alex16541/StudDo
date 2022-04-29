import { Component, OnInit } from '@angular/core';
import SwiperCore, {Scrollbar, Mousewheel, FreeMode,  SwiperOptions} from "swiper";
import {SIDEBAR_LINKS} from "../../../../mock";
import {SessionService} from "../../../../features/session";
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
        autoHeight:true,
        slidesPerView: 'auto',

        // And if we need scrollbar
        freeMode:true,
        grabCursor: true,
        mousewheel: true,
        scrollbar: {
            draggable: true,
        },
    };

  constructor(
      private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
  }

    logout() {
        this.sessionService.logout();
    }
}
