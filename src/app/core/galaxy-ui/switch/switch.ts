import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'galaxy-switch',
  templateUrl: 'switch.html',
  styleUrls: ['switch.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxySwitch {

  constructor() { }

}
