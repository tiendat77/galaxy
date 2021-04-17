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
    const stats1 = new CountUp('dashboardStats1', 6701);
    if (stats1 && !stats1.error) {
      stats1.start();
    }

    const stats2 = new CountUp('dashboardStats2', 1234);
    if (stats2 && !stats2.error) {
      stats2.start();
    }

    const stats3 = new CountUp('dashboardStats3', 9600);
    if (stats3 && !stats3.error) {
      stats3.start();
    }

    const stats4 = new CountUp('dashboardStats4', 115200);
    if (stats4 && !stats4.error) {
      stats4.start();
    }
  }

}
