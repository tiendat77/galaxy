import {NgModule} from '@angular/core';
import { GalaxySidenav } from './sidenav';
import { GalaxySidenavToggle } from './sidenav-toggle';

@NgModule({
  imports: [],
  exports: [
    GalaxySidenav,
    GalaxySidenavToggle
  ],
  declarations: [
    GalaxySidenav,
    GalaxySidenavToggle
  ],
})
export class GalaxySidenavModule {}
