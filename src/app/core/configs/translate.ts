import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const config: TranslateModuleConfig = {
  loader: {
    useFactory: HttpLoaderFactory,
    provide: TranslateLoader,
    deps: [HttpClient]
  }
};

export { config as NgxTranslateConfig }