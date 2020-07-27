import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SmoothZoomComponent } from './smooth-zoom/smooth-zoom.component';
import { ZoomXYComponent } from './zoom-xy/zoom-xy.component';
import { ClockComponent } from './clock/clock.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { LineBarChartComponent } from './line-bar-chart/line-bar-chart.component';
import { BulletChartComponent } from './bullet-chart/bullet-chart.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/chart/bar-chart' },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'smooth-zoom', component: SmoothZoomComponent },
  { path: 'zoom', component: ZoomXYComponent },
  { path: 'clock', component: ClockComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'line-bar', component: LineBarChartComponent },
  { path: 'bullet-chart', component: BulletChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
