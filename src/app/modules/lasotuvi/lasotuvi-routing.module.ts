import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LasoComponent } from './laso/laso.component';


const routes: Routes = [
  { path: '', component: LasoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LasotuviRoutingModule { }
