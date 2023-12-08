import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Components */
import { BoxShadowComponent } from './box-shadow/box-shadow.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { JsonToJsComponent } from './json-to-js/json-to-js.component';
import { UnixConverterComponent } from './unix-converter/unix-converter.component';
import { SignalrParserComponent } from './signalr-parser/signalr-parser.component';

const routes: Routes = [
  { path: 'box-shadow', component: BoxShadowComponent },
  { path: 'json-to-js', component: JsonToJsComponent },
  { path: 'flex-layout', component: FlexLayoutComponent },
  { path: 'unix-converter', component: UnixConverterComponent },
  { path: 'signalr-parser', component: SignalrParserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
