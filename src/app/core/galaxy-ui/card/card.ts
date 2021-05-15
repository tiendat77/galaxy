import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * @example
 * <div galaxy-card>
 *   <h1>Hello</h1>
 *   <h1>Bonjour</h1>
 *   <h1>Vietnam xin chào!</h1>
 * </div>
 */

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
