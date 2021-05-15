import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'galaxy-tooltip',
  templateUrl: 'tooltip.html',
  styleUrls: ['tooltip.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyTooltip {

  constructor() { }

}
