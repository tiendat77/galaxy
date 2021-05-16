import { NgModule } from '@angular/core';

import { CommonModule } from './modules/common.module';
import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule
  ],
  providers: []
})
export class GalaxySharedModule { }