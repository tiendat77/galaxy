import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { TranslateService } from './core/services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'galaxy';

  constructor(
    private auth: AuthService,
    private translate: TranslateService
  ) {
    this.init();
  }

  init() {
    this.auth.init();
  }

}
