import { NgModule } from '@angular/core';

import { GalaxyNavigationModule } from './navigation';
import { GalaxyToolbarModule } from './toolbar';
import { GalaxyButtonModule } from './button';
import { GalaxyCardModule } from './card';
import { GalaxyFormModule } from './form';

@NgModule({
  imports: [
    GalaxyNavigationModule,
    GalaxyToolbarModule,
    GalaxyButtonModule,
    GalaxyCardModule,
    GalaxyFormModule,
  ],
  exports: [
    GalaxyNavigationModule,
    GalaxyToolbarModule,
    GalaxyButtonModule,
    GalaxyCardModule,
    GalaxyFormModule,
  ],
  declarations: [],
})
export class GalaxyUIModule { }