import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Components */
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { GalaxyAvatarDemoComponent } from './avatar/avatar-demo';
import { GalaxyButtonDemoComponent } from './button/button-demo';
import { GalaxyCardDemoComponent } from './card/card-demo';
import { GalaxyExampleDemoComponent } from './example/example-demo';
import { GalaxyTerminalDemoComponent } from './terminal/terminal-demo';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/galaxy/dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ui', component: GalaxyComponent },
      { path: 'ui/avatar', component: GalaxyAvatarDemoComponent },
      { path: 'ui/button', component: GalaxyButtonDemoComponent },
      { path: 'ui/card', component: GalaxyCardDemoComponent },
      { path: 'ui/example', component: GalaxyExampleDemoComponent },
      { path: 'ui/form', component: GalaxyExampleDemoComponent },
      { path: 'ui/menu', component: GalaxyExampleDemoComponent },
      { path: 'ui/sidenav', component: GalaxyExampleDemoComponent },
      { path: 'ui/spinner', component: GalaxyExampleDemoComponent },
      { path: 'ui/tabs', component: GalaxyExampleDemoComponent },
      { path: 'ui/terminal', component: GalaxyTerminalDemoComponent },
      { path: 'ui/tooltip', component: GalaxyExampleDemoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalaxyRoutingModule { }
