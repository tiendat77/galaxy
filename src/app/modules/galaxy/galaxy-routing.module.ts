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
import { GalaxyFormDemoComponent } from './form/form-demo';
import { GalaxyMenuDemoComponent } from './menu/menu-demo';
import { GalaxyRadioDemoComponent } from './radio/radio-demo';
import { GalaxySidenavDemoComponent } from './sidenav/sidenav-demo';
import { GalaxySpinnerDemoComponent } from './spinner/spinner-demo';
import { GalaxyTabsDemoComponent } from './tabs/tabs-demo';
import { GalaxyTerminalDemoComponent } from './terminal/terminal-demo';
import { GalaxyTooltipDemoComponent } from './tooltip/tooltip-demo';

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
      { path: 'ui/form', component: GalaxyFormDemoComponent },
      { path: 'ui/menu', component: GalaxyMenuDemoComponent },
      { path: 'ui/radio', component: GalaxyRadioDemoComponent },
      { path: 'ui/sidenav', component: GalaxySidenavDemoComponent },
      { path: 'ui/spinner', component: GalaxySpinnerDemoComponent },
      { path: 'ui/tabs', component: GalaxyTabsDemoComponent },
      { path: 'ui/terminal', component: GalaxyTerminalDemoComponent },
      { path: 'ui/tooltip', component: GalaxyTooltipDemoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalaxyRoutingModule { }
