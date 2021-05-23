import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

/** Services */
import { GalaxyService } from './galaxy.service';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyComponent implements OnInit, OnDestroy {

  /** RxJs */
  private subscriptions: Subscription[] = [];

  /** ElementRef */
  @ViewChild('navbar') private navbarRef: ElementRef;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    public service: GalaxyService,
  ) { }

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }

  private initialize() {
    const scrollSub = fromEvent(window, 'scroll').subscribe((event) => {
      this.onScroll(event);
    });

    this.subscriptions.push(scrollSub);
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
