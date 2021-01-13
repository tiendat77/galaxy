import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Libraries
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Components
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [
    ContainerComponent,
    DashboardComponent,
    NotFoundComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule,

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    TranslateModule,

    // Components
    ContainerComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    LoaderService
  ]
})
export class CoreModule { }
