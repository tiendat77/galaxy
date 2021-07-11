import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'galaxy-toggle',
  templateUrl: 'toggle.html',
  styleUrls: ['toggle.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyToggle {

  constructor() { }

}
