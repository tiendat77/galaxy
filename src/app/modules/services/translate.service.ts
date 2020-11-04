import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  currentLanguage$ = new BehaviorSubject('vi');

  constructor(
  ) {
    this.init();
  }

  init() {
    const lang = localStorage.getItem('[GALAXY] LANG');

    if (lang) {
      this.currentLanguage$.next(lang);
    } else {
      this.changeLanguage('vi');
    }
  }

  changeLanguage(lang: string) {
  }

  get(key: string, params: object = {}): Promise<string> {
    return new Promise(resolve => {
      resolve('TEXT');
    });
  }

}
