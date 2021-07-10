import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'galaxy-example',
  templateUrl: 'example.html',
  styleUrls: ['example.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyExample {

  constructor() { }

}
