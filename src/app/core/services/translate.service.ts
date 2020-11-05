import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { TranslateService as NgxTranslate } from '@ngx-translate/core';
import { STORAGE_LANGUAGE } from '../configs/storage-keys';

@Injectable({ providedIn: 'root' })
export class TranslateService {

  language$ = new BehaviorSubject('vn');

  constructor(
    private translate: NgxTranslate,
    private http: HttpClient
  ) {
    this.init();
  }

  private init() {
    this.translate.setDefaultLang('vn');

    const lang = localStorage.getItem(STORAGE_LANGUAGE);

    if (!lang) {
      return this.change('vn');
    }

    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  private useLanguage(language: string) {
    this.translate.use(language);
    this.language$.next(language);
    localStorage.setItem(STORAGE_LANGUAGE, language);
  }

  private load(lang: string) {
    return this.http.get(`assets/i18n/${lang}.json`).toPromise();
  }

  change(language: string) {
    this.load(language).then(() => {
        switch (language) {
          case 'en':
            this.useLanguage('en');
            break;

          default:
            this.useLanguage('vn');
        }
    })
    .catch((error: any) => {
      console.error(error);
    });
  }

}
