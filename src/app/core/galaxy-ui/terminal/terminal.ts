import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
