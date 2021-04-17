import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentModule } from '../components/component.module';
import { GalaxyUIModule } from '../galaxy-ui/galaxy-ui.module';

import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentModule,
    GalaxyUIModule
  ],
  exports: [
    AboutComponent,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  declarations: [
    AboutComponent,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent,
  ],
})
export class PageModule { }
