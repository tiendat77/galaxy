import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as d3 from 'd3';
import { TranslateService } from './translate.service';
import { viDefaultLocale, enDefaultLocale, ruDefaultLocale } from '../../shared/default-time-locale';

@Injectable({providedIn: 'root'})
export class ChartControllerService {
  onResizeRequest$ = new Subject();

  constructor(private translate: TranslateService) {
    this.init();
  }

  init() {
    fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
      this.onResizeRequest$.next();
    });

    this.translate.currentLanguage$.subscribe((lang) => {
      this.setTimeFormatDefaultLocale(lang);
    });
  }

  setTimeFormatDefaultLocale(lang: string) {
    switch (lang) {
      case 'vi': {
        d3.timeFormatDefaultLocale(viDefaultLocale);
        break;
      }

      case 'ru': {
        d3.timeFormatDefaultLocale(ruDefaultLocale);
        break;
      }

      default: {
        d3.timeFormatDefaultLocale(enDefaultLocale);
        break;
      }
    }
  }
}
