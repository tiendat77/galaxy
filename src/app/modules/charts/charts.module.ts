import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';

// Components
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ClockComponent } from './clock/clock.component';
import { SmoothZoomComponent } from './smooth-zoom/smooth-zoom.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { LineBarChartComponent } from './line-bar-chart/line-bar-chart.component';
import { BulletChartComponent } from './bullet-chart/bullet-chart.component';
import { DashedLineChartComponent } from './dashed-line-chart/dashed-line-chart.component';


@NgModule({
  declarations: [
    BarChartComponent,
    LineChartComponent,
    ClockComponent,
    SmoothZoomComponent,
    TooltipComponent,
    LineBarChartComponent,
    BulletChartComponent,
    DashedLineChartComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
