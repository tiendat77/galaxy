import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// https://scrollmagic.io/examples/basic/reveal_on_scroll.html
import * as ScrollMagic from 'scrollmagic';

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
    const controller = new ScrollMagic.Controller();
    // build scenes
    let revealElements = document.getElementsByClassName('digit');
    for (let i = 0; i < revealElements.length; i++) { // create a scene for each element
      const scene = new ScrollMagic.Scene({
        triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
        offset: 50, // start a little later
        triggerHook: 0.9,
      })
        .setClassToggle(revealElements[i], 'visible') // add class toggle
        .addIndicators({ name: 'digit ' + (i + 1) }); // add indicators (requires plugin)

      controller.addScene(scene);
    }
  }

}
