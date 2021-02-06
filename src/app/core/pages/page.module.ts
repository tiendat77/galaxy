import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule,
    TranslateModule
  ],
  exports: [
    LoginComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  declarations: [
    LoginComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
})
export class PageModule { }