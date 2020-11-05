import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { NgxTranslateConfig } from './configs/translate';

import { PageModule } from './pages/page.module';
import { ComponentModule } from './components/component.module';
import { GalaxyUIModule } from './galaxy-ui/galaxy-ui.module';
import { ContainerComponent } from './container/container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    PageModule,
    GalaxyUIModule,
    ComponentModule,
    TranslateModule.forRoot(NgxTranslateConfig),
  ],
  exports: [
    HttpClientModule,
    TranslateModule,
    RouterModule,
    PageModule,
    GalaxyUIModule,
    ComponentModule,
  ],
  declarations: [ContainerComponent],
  providers: []
})
export class CoreModule { }
