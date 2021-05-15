import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * @example
 * <galaxy-toolbar>
 *   <span>title<span>
 * </galaxy-toolbar>
 */

@Component({
  selector: 'galaxy-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.scss'],
  host: {
    'class': 'galaxy-toolbar'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyToolbar {

  constructor() { }

}
