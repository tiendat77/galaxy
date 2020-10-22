import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Libraries
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { LasoComponent } from './laso/laso.component';

// Material Components
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import { LasotuviRoutingModule } from './lasotuvi-routing.module';

@NgModule({
  declarations: [
    LasoComponent
  ],
  imports: [
    CommonModule,
    LasotuviRoutingModule,

    // Libraries
    FlexLayoutModule,
    ReactiveFormsModule,

    // Material Components
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
  ]
})
export class LasotuviModule { }
