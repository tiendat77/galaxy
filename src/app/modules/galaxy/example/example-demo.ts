import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-example-demo',
  templateUrl: './example-demo.html',
  styleUrls: ['./example-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyExampleDemoComponent implements OnInit {

  id = 'ui/example';

  html = ``;
  sass = ``;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
