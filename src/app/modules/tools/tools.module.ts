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
import { MatRadioModule } from '@angular/material/radio';
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
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatDatepickerModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
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
  MatCardModule,
  ScrollingModule,
];

import { ToolsRoutingModule } from './tools-routing.module';
import { LasotuviComponent } from './lasotuvi/lasotuvi.component';
import { MainComponent } from './main/main.component';
import { JsonToJsComponent } from './json-to-js/json-to-js.component';
import { EpochConverterComponent } from './epoch-converter/epoch-converter.component';
import { MomentFormatDocComponent } from './moment-format-doc/moment-format-doc.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';


@NgModule({
  declarations: [
    LasotuviComponent,
    MainComponent,
    JsonToJsComponent,
    EpochConverterComponent,
    MomentFormatDocComponent,
    FlexLayoutComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ...MATERIAL_MODULES,

    ToolsRoutingModule
  ]
})
export class ToolsModule { }