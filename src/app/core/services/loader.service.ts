import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderDialogComponent } from '../dialogs/loader/loader.component';

@Injectable({providedIn: 'root'})
export class LoaderService {
  dialogRef: MatDialogRef<LoaderDialogComponent>;

  constructor(private dialog: MatDialog) { }

  start() {
    if (this.dialogRef) {
      return;
    }

    this.dialogRef = this.dialog.open(LoaderDialogComponent, {
      autoFocus: false,
      disableClose: true,
      restoreFocus: false
    });
  }

  stop() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = undefined;
    }
  }

}
