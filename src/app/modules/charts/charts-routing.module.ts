import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SmoothZoomComponent } from './smooth-zoom/smooth-zoom.component';
import { ClockComponent } from './clock/clock.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { LineBarChartComponent } from './line-bar-chart/line-bar-chart.component';
import { BulletChartComponent } from './bullet-chart/bullet-chart.component';
import { DashLineChartComponent } from './dash-line-chart/dash-line-chart.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/chart/bar-chart' },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'smooth-zoom', component: SmoothZoomComponent },
  { path: 'clock', component: ClockComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'line-bar-chart', component: LineBarChartComponent },
  { path: 'bullet-chart', component: BulletChartComponent },
  { path: 'dash-line-chart', component: DashLineChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
