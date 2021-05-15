import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

// https://scrollmagic.io/examples/basic/reveal_on_scroll.html
import * as ScrollMagic from 'scrollmagic';

// https://github.com/inorganik/CountUp.js
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements AfterViewInit {

  @ViewChild('scrollTrigger') scrollTrigger: ElementRef;

  stats = [
    { id: 'dashboardStats1', value: 6071 },
    { id: 'dashboardStats2', value: 9600 },
    { id: 'dashboardStats3', value: 115200 },
    { id: 'dashboardStats4', value: 2000 },
  ];

  constructor() { }

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
    this.stats.forEach((stat) => {
      const counter = new CountUp(stat.id, stat.value);

      if (counter && !counter.error) {
        counter.start();
      }
    });
  }

}
