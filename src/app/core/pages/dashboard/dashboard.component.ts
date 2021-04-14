import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// https://scrollmagic.io/examples/basic/reveal_on_scroll.html
import * as ScrollMagic from 'scrollmagic';

// https://github.com/inorganik/CountUp.js
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollTrigger') scrollTrigger: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.scrollMagic();
    this.countUp();
  }

  scrollMagic() {
    const that = this;
    const trigger = this.scrollTrigger?.nativeElement;

    if (!trigger) {
      return;
    }

    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({triggerElement: trigger, duration: 200});

    scene.addTo(controller)
      .on('enter', (e) => {
        console.log(e);
        that.countUp();
      });
  }

  countUp() {
    const emoji1 = new CountUp('dashboardEmoji1', 6701);
    if (emoji1 && !emoji1.error) {
      emoji1.start();
    }

    const emoji2 = new CountUp('dashboardEmoji2', 1234);
    if (emoji2 && !emoji2.error) {
      emoji2.start();
    }
  }

}
