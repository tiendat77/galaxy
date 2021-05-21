import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { SplashService } from './core/services/splash.service';
import { TranslateService } from './core/services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private auth: AuthService,
    private splash: SplashService,
    private translate: TranslateService
  ) {
    this.init();
  }

  init() {
    const path = window.location.pathname;
    this.auth.init().then((authorized) => {
      this.router.navigateByUrl(path);
    });

    setTimeout(() => this.splash.hide(), 1000);
  }

}
