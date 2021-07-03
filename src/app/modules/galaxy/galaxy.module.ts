import { NgModule } from '@angular/core';

import { CoreModule } from './../../core/core.module';
import { GalaxyRoutingModule } from './galaxy-routing.module';
import { GalaxySharedModule } from '../../shared/shared.module';
import { GalaxyUIModule } from '../../core/galaxy-ui/galaxy-ui.module';

/** Components */
import { MainComponent } from './main/main.component';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalaxyAvatarDemoComponent } from './avatar/avatar-demo';
import { GalaxyButtonDemoComponent } from './button/button-demo';
import { GalaxyCardDemoComponent } from './card/card-demo';
import { GalaxyExampleDemoComponent } from './example/example-demo';
import { GalaxyTerminalDemoComponent } from './terminal/terminal-demo';

const COMPONENTS = [
  MainComponent,
  GalaxyComponent,
  DashboardComponent,
  GalaxyAvatarDemoComponent,
  GalaxyButtonDemoComponent,
  GalaxyCardDemoComponent,
  GalaxyExampleDemoComponent,
  GalaxyTerminalDemoComponent,
];

/** Services */
import { GalaxyService } from './galaxy.service';

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CoreModule,
    GalaxyUIModule,
    GalaxySharedModule,
    GalaxyRoutingModule
  ],
  providers: [
    GalaxyService
  ]
})
export class GalaxyModule { }
