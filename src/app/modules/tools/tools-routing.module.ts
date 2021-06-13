import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Components */
import { JsonToJsComponent } from './json-to-js/json-to-js.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { UnixConverterComponent } from './unix-converter/unix-converter.component';

const routes: Routes = [
  { path: 'json-to-js', component: JsonToJsComponent },
  { path: 'flex-layout', component: FlexLayoutComponent },
  { path: 'unix-converter', component: UnixConverterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
