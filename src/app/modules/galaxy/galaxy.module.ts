import { NgModule } from '@angular/core';

import { CoreModule } from './../../core/core.module';
import { GalaxyRoutingModule } from './galaxy-routing.module';
import { GalaxySharedModule } from '../../shared/shared.module';
import { GalaxyUIModule } from '../../core/galaxy-ui/galaxy-ui.module';

/** Components */
import { MainComponent } from './main/main.component';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { DashboardComponent } from './dashboard/dashboard.component';

/** Services */

@NgModule({
  declarations: [
    MainComponent,
    GalaxyComponent,
    DashboardComponent
  ],
  imports: [
    CoreModule,
    GalaxyUIModule,
    GalaxySharedModule,
    GalaxyRoutingModule
  ],
  providers: []
})
export class GalaxyModule { }
