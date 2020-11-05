import { NgModule } from '@angular/core';
import { GalaxyUIModule } from '../galaxy-ui/galaxy-ui.module';

import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [GalaxyUIModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class ComponentModule { }