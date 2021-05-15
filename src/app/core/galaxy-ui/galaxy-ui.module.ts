import { NgModule } from '@angular/core';

import { GalaxyAvatarModule } from './avatar';
import { GalaxyButtonModule } from './button';
import { GalaxyCardModule } from './card';
import { GalaxyFormModule } from './form';
import { GalaxyMenuModule } from './menu';
import { GalaxyNavigationModule } from './navigation';
import { GalaxySpinnerModule } from './spinner';
import { GalaxyToolbarModule } from './toolbar';
import { GalaxyTooltipModule } from './tooltip';
import { GalaxyTerminalModule } from './terminal';

@NgModule({
  imports: [
    GalaxyAvatarModule,
    GalaxyButtonModule,
    GalaxyCardModule,
    GalaxyFormModule,
    GalaxyMenuModule,
    GalaxyNavigationModule,
    GalaxySpinnerModule,
    GalaxyToolbarModule,
    GalaxyTooltipModule,
    GalaxyTerminalModule,
  ],
  exports: [
    GalaxyAvatarModule,
    GalaxyButtonModule,
    GalaxyCardModule,
    GalaxyFormModule,
    GalaxyMenuModule,
    GalaxyNavigationModule,
    GalaxySpinnerModule,
    GalaxyToolbarModule,
    GalaxyTerminalModule,
  ],
  declarations: [],
})
export class GalaxyUIModule { }
