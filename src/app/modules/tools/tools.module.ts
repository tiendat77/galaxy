import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaxyUIModule } from '../../core/galaxy-ui/galaxy-ui.module';
import { GalaxySharedModule } from '../../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';

/** Components */
import { JsonToJsComponent } from './json-to-js/json-to-js.component';
import { UnixConverterComponent } from './unix-converter/unix-converter.component';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    GalaxyUIModule,
    GalaxySharedModule,
  ],
  declarations: [
    JsonToJsComponent,
    UnixConverterComponent
  ],
})
export class ToolsModule { }
