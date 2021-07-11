import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GalaxySwitch } from './switch';

@NgModule({
  imports: [
    FormsModule
  ],
  exports: [
    GalaxySwitch
  ],
  declarations: [
    GalaxySwitch
  ],
})
export class GalaxySwitchModule {}
