import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NavigationItem } from '../../interfaces/navigation-item';

/**
 * @example
 * <galaxy-navigation [menu]="menuItems"></galaxy-navigation>
 * menuItems = [
 *  { name: 'Galaxy', url: '/galaxy' },
 *  { name: 'Charts', url: '/chart', children: [
 *    {name: 'Line', url: '/chart/line-chart', description: 'Line chart'},
 *    {name: 'Bar', url: '/chart/bar-chart', description: 'Bar chart'}
 *   ]},
 */

@Component({
  selector: 'galaxy-navigation',
  templateUrl: 'navigation.html',
  styleUrls: ['navigation.scss'],
  host: {
    'class': 'galaxy-navigation'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyNavigation implements OnChanges {

  @Input() menu: NavigationItem[] = [];
  menu$ = new BehaviorSubject([]);

  constructor() { }

  ngOnChanges(): void {
    this.menu$.next(this.menu);
  }

}
