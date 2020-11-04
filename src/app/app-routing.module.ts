import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './core/container/container.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'chart', loadChildren: () => import('./modules/charts/charts.module').then(m => m.ChartsModule) },
      { path: 'components', loadChildren: () => import('./modules/components/components.module').then(m => m.ComponentsModule) },
      { path: 'tools', loadChildren: () => import('./modules/tools/tools.module').then(m => m.ToolsModule) },
      { path: 'galaxy', loadChildren: () => import('./modules/galaxy/galaxy.module').then(m => m.GalaxyModule) }
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
