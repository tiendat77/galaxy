import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'galaxy-avatar',
  templateUrl: 'avatar.html',
  styleUrls: ['avatar.scss'],
  host: {
    'class': 'galaxy-avatar',
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyAvatar {

  @Input() diameter = 50;
  @Input() source = 'assets/images/default-avatar.jpg';

  constructor() { }

}