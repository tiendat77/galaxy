import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * @example
 * <galaxy-terminal [height]="236">
 *   <pre>$ hello world!</pre>
 * </galaxy-terminal>
 */

@Component({
  selector: 'galaxy-terminal',
  templateUrl: 'terminal.html',
  styleUrls: ['terminal.scss'],
  host: {
    '[style.width.px]': 'width',
    '[style.height.px]': 'height',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyTerminal {

  @Input() width: number;
  @Input() height: number;

  constructor() { }

}
