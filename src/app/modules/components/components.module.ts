import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Installed Libraries
import { TranslateModule } from '@ngx-translate/core';

// Material Components
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatDatepickerModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatToolbarModule,
  MatTabsModule,
  MatMenuModule,
  MatListModule,
  ScrollingModule,
];

import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';

// Components
import { ComponentsRoutingModule } from './components-routing.module';
import { MainComponent } from './main/main.component';
import { TypeWriterComponent } from './type-writer/type-writer.component';
import { MagicButtonComponent } from './magic-button/magic-button.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { FormDateTimeComponent } from './form-date-time/form-date-time.component';
import { FormInputFileComponent } from './form-input-file/form-input-file.component';
import { FormDateMonthYearComponent } from './form-date-month-year/form-date-month-year.component';
import { FormSelectTimezoneComponent } from './form-select-timezone/form-select-timezone.component';


@NgModule({
  declarations: [
    MomentFormatPipe,
    MainComponent,
    TypeWriterComponent,
    MagicButtonComponent,
    FormSelectComponent,
    FormDateTimeComponent,
    FormDateMonthYearComponent,
    WrapperComponent,
    FormInputFileComponent,
    DragAndDropDirective,
    FormSelectTimezoneComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ComponentsRoutingModule,

    ...MATERIAL_MODULES
  ]
})
export class ComponentsModule { }
