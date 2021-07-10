import { NgModule } from '@angular/core';

import { GalaxyAvatarModule } from './avatar';
import { GalaxyButtonModule } from './button';
import { GalaxyCardModule } from './card';
import { GalaxyFormModule } from './form';
import { GalaxyMenuModule } from './menu';
import { GalaxyNavigationModule } from './navigation';
import { GalaxyRadioModule } from './radio';
import { GalaxySidenavModule } from './sidenav';
import { GalaxySpinnerModule } from './spinner';
import { GalaxyTabsModule } from './tabs';
import { GalaxyTerminalModule } from './terminal';
import { GalaxyToolbarModule } from './toolbar';
import { GalaxyTooltipModule } from './tooltip';

const GALAXY_UI_COMPONENTS = [
  GalaxyAvatarModule,
  GalaxyButtonModule,
  GalaxyCardModule,
  GalaxyFormModule,
  GalaxyMenuModule,
  GalaxyNavigationModule,
  GalaxyRadioModule,
  GalaxySidenavModule,
  GalaxySpinnerModule,
  GalaxyTabsModule,
  GalaxyToolbarModule,
  GalaxyTooltipModule,
  GalaxyTerminalModule,
];

@NgModule({
  imports: GALAXY_UI_COMPONENTS,
  exports: GALAXY_UI_COMPONENTS,
  declarations: [],
})
export class GalaxyUIModule { }
