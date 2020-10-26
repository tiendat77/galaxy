import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotifyService {

  constructor(private snackbar: MatSnackBar) { }

  notify(message, duration = 3000) {
    const config: MatSnackBarConfig = {
      duration
    };

    this.snackbar.open(message, 'OK', config);
  }

}
