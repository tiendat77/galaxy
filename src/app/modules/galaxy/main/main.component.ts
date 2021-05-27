import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

import { GALAXY_MODULES } from './modules';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

/** ElementRef */
@ViewChild('navbar') private navbarRef: ElementRef;

modules: Array<any> = GALAXY_MODULES;

/** RxJs */
private subscription: Subscription = new Subscription();

constructor(
  private router: Router,
  private cdr: ChangeDetectorRef
) { }

ngOnInit() {
  this.initialize();
}

ngOnDestroy() {
  this.subscription?.unsubscribe();
}

private initialize() {
  const scrollSub = fromEvent(window, 'scroll').subscribe((event) => {
    this.onScroll(event);
  });

  this.subscription.add(scrollSub);
}

/////////////// TEMPLATE EVENT HANDLERS ///////////////
public onScroll(event) {
  const navbar = this.navbarRef?.nativeElement;

  if (!navbar) return;

  if (window.pageYOffset >= 50) {
    navbar.classList.add('nav-bar-sticky');
  } else {
    navbar.classList.remove('nav-bar-sticky');
  }
}

}
