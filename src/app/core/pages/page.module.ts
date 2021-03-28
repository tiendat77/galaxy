import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { GalaxyUIModule } from '../galaxy-ui/galaxy-ui.module';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    GalaxyUIModule
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