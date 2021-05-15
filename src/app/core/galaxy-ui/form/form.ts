import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * @example
 * <galaxy-form>
 *   <galaxy-label>Your email?</galaxy-label>
 *   <input name="email">
 * </galaxy-form>
 */

@Component({
  selector: 'galaxy-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss'],
  host: {
    'class': 'galaxy-form'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyForm {

  constructor() { }

}
