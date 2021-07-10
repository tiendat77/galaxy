import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GalaxyRadioButton } from './radio-button';

@NgModule({
  imports: [
    FormsModule
  ],
  exports: [
    GalaxyRadioButton
  ],
  declarations: [
    GalaxyRadioButton
  ],
})
export class GalaxyRadioButtonModule {}
