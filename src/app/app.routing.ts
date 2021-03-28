import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

import { TestComponent } from './test/test.component';
import { ContainerComponent } from './core/container/container.component';
import { LoginComponent } from './core/pages/login/login.component';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'galaxy', loadChildren: () => import('./modules/galaxy/galaxy.module').then(m => m.GalaxyModule) },
      { path: 'tools', loadChildren: () => import('./modules/tools/tools.module').then(m => m.ToolsModule) },
      { path: 'task-management', loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule) },
      { path: 'hr-management', loadChildren: () => import('./modules/human-resource/human-resource.module').then(m => m.HumanResourceModule) },
      { path: 'inventory-management', loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule) },
    ]
  },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
