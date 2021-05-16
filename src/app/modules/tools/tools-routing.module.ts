import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Components */
import { JsonToJsComponent } from './json-to-js/json-to-js.component';

const routes: Routes = [
  { path: 'json-to-js', component: JsonToJsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
