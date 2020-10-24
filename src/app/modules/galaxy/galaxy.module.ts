import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Installed Library
import { TranslateModule } from '@ngx-translate/core';
import { GalaxyRoutingModule } from './galaxy-routing.module';

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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { GalaxyService } from './galaxy/galaxy.service';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { FormSelectComponent } from './galaxy/components/form-select/form-select.component';
import { FormDateTimeComponent } from './galaxy/components/form-date-time/form-date-time.component';
import { FormDateMonthYearComponent } from './galaxy/components/form-date-month-year/form-date-month-year.component';

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
  MatTooltipModule,
  MatToolbarModule,
  MatMenuModule,
  MatTabsModule,
  MatListModule,
  ScrollingModule,
];


@NgModule({
  declarations: [
    GalaxyComponent,
    FormSelectComponent,
    FormDateMonthYearComponent,
    FormDateTimeComponent,
  ],
  imports: [
    CommonModule,
    GalaxyRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule.forChild(),

    ...MATERIAL_MODULES
  ],
  providers: [
    GalaxyService
  ]
})
export class GalaxyModule { }
