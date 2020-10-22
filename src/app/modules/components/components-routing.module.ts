import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MagicButtonComponent } from './magic-button/magic-button.component';
import { TypeWriterComponent } from './type-writer/type-writer.component';
import { FormSelectComponent } from './form-select/form-select.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'wrapper', component: WrapperComponent },
      { path: 'type-writer', component: TypeWriterComponent },
      { path: 'magic-button', component: MagicButtonComponent },
      { path: 'form-select', component: FormSelectComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
