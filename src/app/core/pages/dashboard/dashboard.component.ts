import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// https://scrollmagic.io/examples/basic/reveal_on_scroll.html
import { ScrollMagic, Controller, Scene } from 'scrollmagic';

// https://github.com/inorganik/CountUp.js
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.scrollMagic();
    this.countUp();
  }

  scrollMagic() {
    const controller = new Controller();
  }

  countUp() {
    let demo = new CountUp('myTargetElement', 6701);
    if (!demo.error) {
      demo.start();
    } else {
      console.error(demo.error);
    }
  }

}
