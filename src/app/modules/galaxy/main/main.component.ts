import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GALAXY_MODULES, GalaxyMenuItem } from '../galaxy-modules';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'app-galaxy-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  /** ElementRef */
  @ViewChild('navbar') private navbarRef: ElementRef;

  public modules: GalaxyMenuItem[];

  /** RxJs */
  private subscription: Subscription;

  constructor(public galaxy: GalaxyService) { }

  ngOnInit() {
    this.initialize();
    this.initScrollSubscription();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initialize() {
    this.modules = GALAXY_MODULES;
    this.subscription = new Subscription();
  }

  private initScrollSubscription() {
    const scrollSub = fromEvent(window, 'scroll').pipe(
      debounceTime(200)
    ).subscribe((event) => {
      this.onScroll(event);
    });
    this.subscription.add(scrollSub);
  }

  test() {
    console.log('tested ^^');
  }

  /////////////// TEMPLATE EVENT HANDLERS ///////////////
  public onScroll(event) {
    const navbar = this.navbarRef?.nativeElement;

    if (!navbar) { return; }

    if (window.pageYOffset >= 50) {
      navbar.classList.add('nav-bar-sticky');
    } else {
      navbar.classList.remove('nav-bar-sticky');
    }
  }

}
