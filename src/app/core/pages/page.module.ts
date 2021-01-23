import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    NotFoundComponent,
    TestComponent,
  ],
  imports: [TranslateModule],
  exports: [
    LoginComponent,
    DashboardComponent,
    NotFoundComponent,
    TestComponent,
  ]
})
export class PageModule { }