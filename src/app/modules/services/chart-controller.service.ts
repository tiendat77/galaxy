import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ChartControllerService {
  onResizeRequest$ = new Subject();

  constructor() {
    this.init();
  }

  init() {
    fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
      this.onResizeRequest$.next();
    });
  }
}
