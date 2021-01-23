import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaxyRoutingModule } from './galaxy-routing.module';
import { GalaxyService } from './galaxy/galaxy.service';
import { GalaxyComponent } from './galaxy/galaxy.component';


@NgModule({
  declarations: [
    GalaxyComponent
  ],
  imports: [
    CommonModule,
    GalaxyRoutingModule
  ],
  providers: [
    GalaxyService
  ]
})
export class GalaxyModule { }
