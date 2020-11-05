import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EpochConverterComponent } from './epoch-converter/epoch-converter.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { JsonToJsComponent } from './json-to-js/json-to-js.component';
import { LasotuviComponent } from './lasotuvi/lasotuvi.component';
import { MainComponent } from './main/main.component';
import { MomentFormatDocComponent } from './moment-format-doc/moment-format-doc.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'lasotuvi', component: LasotuviComponent },
      { path: 'json-to-js', component: JsonToJsComponent },
      { path: 'epoch-converter', component: EpochConverterComponent },
      { path: 'flex-layout-demos', component: FlexLayoutComponent },
      { path: 'moment-format-doc', component: MomentFormatDocComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
