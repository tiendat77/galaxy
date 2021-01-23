import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService as NgxTranslate } from '@ngx-translate/core';

const snackBarConfig: MatSnackBarConfig = {
  duration: 3000,
  panelClass: ['snackbar-style-success']
};

@Injectable({ providedIn: 'root' })
export class NotifyService {

  constructor(
    private translate: NgxTranslate,
    private snackbar: MatSnackBar
  ) { }

  async push(i18nValue: string, params: object = {}, duration = 3000) {
    const message = await this.translate.get(i18nValue, params).toPromise();
    this.snackbar.open(message, 'OK', {...snackBarConfig, duration});
  }

}
