import { Component } from '@angular/core';

import { LoaderService } from './core/services/loader.service';
import { TranslateService } from './core/services/translate.service';
import { NotifyService } from './core/services/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'galaxy';

  constructor(
    private translate: TranslateService,
    private loader: LoaderService,
    private notify: NotifyService
  ) {}
}
