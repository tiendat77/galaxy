import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SplashService } from '@app/core/services/splash.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent implements OnInit, OnDestroy {

  subscribe: Subscription;

  constructor(
    private splashService: SplashService
  ) { }

  ngOnInit() {
    this.subscribe = this.splashService.subscribe(state => state ? this.start() : this.stop());
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  start() {
    const element = document.getElementById('APP_LOADER');

    if (element && element.classList) {
      setTimeout(() => {
        element.classList.remove('app-splash-screen-loaded');
      }, 100);
    }
  }

  stop() {
    const element = document.getElementById('APP_LOADER');

    if (element && element.classList) {
      setTimeout(() => {
        element.classList.add('app-splash-screen-loaded');
      }, 100);
    }
  }

}
