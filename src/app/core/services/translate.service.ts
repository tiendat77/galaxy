import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { TranslateService as NgxTranslate } from '@ngx-translate/core';
import { STORAGE_LANG } from '../configs/storage-keys';

@Injectable({ providedIn: 'root' })
export class TranslateService {

  currentLanguage$ = new BehaviorSubject('vn');

  constructor(
    private ngxTranslate: NgxTranslate,
    private http: HttpClient
  ) {
    this.init();
  }

  init() {
    this.ngxTranslate.setDefaultLang('vn');

    const lang = localStorage.getItem(STORAGE_LANG);

    if (lang) {
      this.currentLanguage$.next(lang);
      this.ngxTranslate.setDefaultLang(lang);
      this.ngxTranslate.use(lang);
    } else {
      this.changeLanguage('vn');
    }
  }

  changeLanguage(lang: string) {
    this.loadLangFile(lang).subscribe(() => {
      switch (lang) {
        case 'en':
          localStorage.setItem(STORAGE_LANG, lang);
          this.ngxTranslate.use(lang);
          this.currentLanguage$.next('en');
          break;

        default:
          localStorage.setItem(STORAGE_LANG, 'vn');
          this.ngxTranslate.use('vn');
          this.currentLanguage$.next('vn');
      }
    }, err => {
      console.error(err);
    });
  }

  get(key: string, params: object = {}): Promise<string> {
    return this.ngxTranslate.get(key, params).toPromise();
  }

  private loadLangFile(lang: string) {
    return new Observable((resolver) => {
      this.http.get(`/assets/i18n/${lang}.json`).subscribe(res => {
        resolver.next();
        resolver.complete();
      }, err => {
        resolver.error(err);
      });
    });
  }
}
