import { NgModule } from '@angular/core';
import { GalaxyTooltip } from './tooltip';
import { GalaxyTooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [],
  exports: [
    GalaxyTooltip,
    GalaxyTooltipDirective
  ],
  declarations: [
    GalaxyTooltip,
    GalaxyTooltipDirective
  ],
})
export class GalaxyTooltipModule {}
