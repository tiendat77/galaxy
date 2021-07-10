import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GalaxyRadio } from './radio';

@NgModule({
  imports: [
    FormsModule
  ],
  exports: [
    GalaxyRadio
  ],
  declarations: [
    GalaxyRadio
  ],
})
export class GalaxyRadioModule {}
