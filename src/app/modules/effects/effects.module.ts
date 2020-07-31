import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsRoutingModule } from './effects-routing.module';
import { TypeWritterComponent } from './type-writter/type-writter.component';
import { MagicButtonComponent } from './magic-button/magic-button.component';


@NgModule({
  declarations: [
    TypeWritterComponent,
    MagicButtonComponent
  ],
  imports: [
    CommonModule,
    EffectsRoutingModule
  ]
})
export class EffectsModule { }
