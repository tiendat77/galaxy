import { NgModule } from '@angular/core';

/** Modules */
import { CommonModule } from './modules/common.module';
import { MaterialModule } from './modules/material.module';

/** Components */
import { AirQualityIndexComponent } from './components/air-quality-index/air-quality-index.component';

const COMPONENTS = [
  AirQualityIndexComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ...COMPONENTS
  ],
  providers: []
})
export class GalaxySharedModule { }