import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaxySharedModule } from '../../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';

/** Components */
import { JsonToJsComponent } from './json-to-js/json-to-js.component';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    GalaxySharedModule,
  ],
  declarations: [
    JsonToJsComponent
  ],
})
export class ToolsModule { }
