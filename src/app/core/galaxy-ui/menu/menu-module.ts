import {NgModule} from '@angular/core';
import { GalaxyMenu, GalaxyMenuTrigger, GalaxyMenuContent } from './menu';

@NgModule({
  imports: [],
  exports: [GalaxyMenu, GalaxyMenuTrigger, GalaxyMenuContent],
  declarations: [GalaxyMenu, GalaxyMenuTrigger, GalaxyMenuContent],
})
export class GalaxyMenuModule {}