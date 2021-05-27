import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Components */
import { MainComponent } from './main/main.component';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // { path: '', pathMatch: 'full', redirectTo: '/galaxy/dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: ':id', component: GalaxyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalaxyRoutingModule { }
