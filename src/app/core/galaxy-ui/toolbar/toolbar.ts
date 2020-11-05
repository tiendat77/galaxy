import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'galaxy-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.scss'],
  host: {
    'class': 'galaxy-toolbar'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyToolbar {

  constructor() { }

}
