import { NgModule } from '@angular/core';

import { GalaxyNavigationModule } from './navigation';
import { GalaxyToolbarModule } from './toolbar';

@NgModule({
  imports: [
    GalaxyNavigationModule,
    GalaxyToolbarModule,
  ],
  exports: [
    GalaxyNavigationModule,
    GalaxyToolbarModule,
  ],
  declarations: [],
})
export class GalaxyUIModule { }