import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalaxyComponent } from './galaxy/galaxy.component';


const routes: Routes = [
  { path: '', component: GalaxyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalaxyRoutingModule { }
