import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Libraries
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { EffectsRoutingModule } from './effects-routing.module';
import { MagicButtonComponent } from './magic-button/magic-button.component';
import { TypeWriterComponent } from './type-writer/type-writer.component';

@NgModule({
  declarations: [
    MagicButtonComponent,
    TypeWriterComponent
  ],
  imports: [
    CommonModule,
    EffectsRoutingModule,
    FlexLayoutModule
  ]
})
export class EffectsModule { }
