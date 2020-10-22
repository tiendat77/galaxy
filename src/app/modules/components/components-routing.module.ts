import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MagicButtonComponent } from './magic-button/magic-button.component';
import { TypeWriterComponent } from './type-writer/type-writer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'type-writer', component: TypeWriterComponent },
      { path: 'magic-button', component: MagicButtonComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
