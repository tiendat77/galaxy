import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaxyUIModule } from '../../core/galaxy-ui/galaxy-ui.module';
import { GalaxySharedModule } from '../../shared/shared.module';
import { ToolsRoutingModule } from './tools-routing.module';

/** Components */
import { BoxShadowComponent } from './box-shadow/box-shadow.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { JsonToJsComponent } from './json-to-js/json-to-js.component';
import { UnixConverterComponent } from './unix-converter/unix-converter.component';
import { SignalrParserComponent } from './signalr-parser/signalr-parser.component';

@NgModule({
  imports: [
    CommonModule,
    ToolsRoutingModule,
    GalaxyUIModule,
    GalaxySharedModule,
  ],
  declarations: [
    BoxShadowComponent,
    FlexLayoutComponent,
    JsonToJsComponent,
    UnixConverterComponent,
    SignalrParserComponent
  ],
})
export class ToolsModule { }
