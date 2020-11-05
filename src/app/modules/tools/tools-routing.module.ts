import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsonToJsComponent } from './json-to-js/json-to-js.component';
import { LasotuviComponent } from './lasotuvi/lasotuvi.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'lasotuvi', component: LasotuviComponent },
      { path: 'json-to-js', component: JsonToJsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
