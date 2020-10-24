import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// Services
import { TranslateService } from './translate.service';

@Injectable({ providedIn: 'root' })
export class NotifyService {

  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) { }

  pushNotify(message: string, duration = 3000, delayTime = 0) {
    setTimeout(() => {
      this.snackBar.open(message, 'OK', { duration });
    }, delayTime);
  }

  async pushTranslatedNotify(i18nValue: string, duration = 3000, delayTime = 0) {
    const message = await this.translate.get(i18nValue);

    setTimeout(() => {
      this.snackBar.open(message, 'OK', { duration });
    }, delayTime);
  }

  async pushSuccessTranslatedNotify(i18nValue: string, duration = 3000, delayTime = 0) {
    const message = await this.translate.get(i18nValue);

    const snackBarConfig: MatSnackBarConfig = {
      duration,
      panelClass: ['snackbar-style-success']
    };

    setTimeout(() => {
      this.snackBar.open(message, 'OK', snackBarConfig);
    }, delayTime);
  }

}
