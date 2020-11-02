import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MagicButtonComponent } from './magic-button/magic-button.component';
import { TypeWriterComponent } from './type-writer/type-writer.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormDateTimeComponent } from './form-date-time/form-date-time.component';
import { FormDateMonthYearComponent } from './form-date-month-year/form-date-month-year.component';
import { FormInputFileComponent } from './form-input-file/form-input-file.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'wrapper', component: WrapperComponent },
      { path: 'type-writer', component: TypeWriterComponent },
      { path: 'magic-button', component: MagicButtonComponent },
      { path: 'form-select', component: FormSelectComponent },
      { path: 'form-date-time', component: FormDateTimeComponent },
      { path: 'form-date-month-year', component: FormDateMonthYearComponent },
      { path: 'form-input-file', component: FormInputFileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
