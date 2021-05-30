import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

import { GALAXY_MODULES, GalaxyMenuItem } from './modules';

@Component({
  selector: 'app-galaxy-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  /** ElementRef */
  @ViewChild('navbar') private navbarRef: ElementRef;

  public modules: Array<any>;
  public moduleLink: string;
  public moduleName: string;

  /** RxJs */
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initialize();
    this.handleUrlParam();
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
    const scrollSub = fromEvent(window, 'scroll').subscribe((event) => {
      this.onScroll(event);
    });
    this.subscription.add(scrollSub);
  }

  private handleUrlParam() {
    this.moduleLink = 'dashboard';
    this.moduleName = 'Dashboard';

    const params = this.route.snapshot.firstChild.params;
    if (!params || !params.id) {
      return this.router.navigate(['/galaxy']);
    }

    const module = GALAXY_MODULES.find(m => m.link === params.id);
    if (!module) {
      return this.router.navigate(['/galaxy']);
    }

    this.moduleName = module.name;
    this.moduleLink = module.link;
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

  public selectModule(module: GalaxyMenuItem) {
    this.moduleLink = module.link;
    this.moduleName = module.name;
  }

}
