import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[galaxy-card]',
  template: '<ng-content></ng-content>',
  styleUrls: ['card.scss'],
  host: {
    'class': 'galaxy-card'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyCard {

  constructor() { }

}
