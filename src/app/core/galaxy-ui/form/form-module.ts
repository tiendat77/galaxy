import {NgModule} from '@angular/core';
import { GalaxyForm } from './form';
import { GalaxyLabel } from './label';

@NgModule({
  imports: [],
  exports: [GalaxyForm, GalaxyLabel],
  declarations: [GalaxyForm, GalaxyLabel],
})
export class GalaxyFormModule {}
