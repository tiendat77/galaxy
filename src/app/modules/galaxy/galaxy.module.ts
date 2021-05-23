import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaxyRoutingModule } from './galaxy-routing.module';
import { GalaxySharedModule } from '../../shared/shared.module';
import { GalaxyUIModule } from '../../core/galaxy-ui/galaxy-ui.module';

/** Components */
import { GalaxyComponent } from './galaxy/galaxy.component';

/** Services */
import { GalaxyService } from './galaxy/galaxy.service';


@NgModule({
  declarations: [
    GalaxyComponent
  ],
  imports: [
    CommonModule,
    GalaxyUIModule,
    GalaxySharedModule,
    GalaxyRoutingModule
  ],
  providers: [
    GalaxyService
  ]
})
export class GalaxyModule { }
