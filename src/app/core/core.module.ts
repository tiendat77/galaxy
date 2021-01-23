import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { NgxTranslateConfig } from './configs/translate';

import { PageModule } from './pages/page.module';
import { ComponentModule } from './components/component.module';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [
    ContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    PageModule,
    ComponentModule,
    TranslateModule.forRoot(NgxTranslateConfig),
  ],
  exports: [
    HttpClientModule,
    TranslateModule,
    RouterModule,
  ],
  providers: []
})
export class CoreModule { }
