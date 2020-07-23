import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ClockComponent } from './clock/clock.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/chart/bar-chart' },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'line-chart', component: LineChartComponent },
  { path: 'clock', component: ClockComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
