import { NgModule } from '@angular/core';

import { GalaxyAvatarModule } from './avatar';
import { GalaxyButtonModule } from './button';
import { GalaxyCardModule } from './card';
import { GalaxyFormModule } from './form';
import { GalaxyMenuModule } from './menu';
import { GalaxyNavigationModule } from './navigation';
import { GalaxySpinnerModule } from './spinner';
import { GalaxyToolbarModule } from './toolbar';

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
  ],
  declarations: [],
})
export class GalaxyUIModule { }