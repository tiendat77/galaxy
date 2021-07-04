import { NgModule } from '@angular/core';

/** Modules */
import { CommonsModule } from './modules/common.module';
import { MaterialModule } from './modules/material.module';

/** Components */
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';
import { AirQualityIndexComponent } from './components/air-quality-index/air-quality-index.component';
import { CovidTrackerComponent } from './components/covid-tracker/covid-tracker.component';

const COMPONENTS = [
  AnalogClockComponent,
  AirQualityIndexComponent,
  CovidTrackerComponent
];

/** Pipes */
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

const PIPES = [
  SanitizeHtmlPipe
];

/** Services */
import { RequestService } from './services/request.service';

@NgModule({
  declarations: [
    COMPONENTS,
    PIPES
  ],
  imports: [
    CommonsModule,
    MaterialModule
  ],
  exports: [
    CommonsModule,
    MaterialModule,
    COMPONENTS,
    PIPES
  ],
  providers: [
    RequestService
  ]
})
export class GalaxySharedModule { }