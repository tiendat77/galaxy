import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'galaxy-spinner',
  templateUrl: 'spinner.html',
  styleUrls: ['spinner.scss'],
  host: {
    'class': 'galaxy-process-spinner',
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxySpinner {
  private _diameter = 50;

  @Input()
  get diameter(): number { return this._diameter; }
  set diameter(size: number) { this._diameter = size;}

  @Input() strokeWidth = 5;

  constructor() {}

}
