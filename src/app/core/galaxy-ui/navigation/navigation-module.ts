import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GalaxyNavigation } from './navigation';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [GalaxyNavigation],
  declarations: [GalaxyNavigation],
})
export class GalaxyNavigationModule {}
