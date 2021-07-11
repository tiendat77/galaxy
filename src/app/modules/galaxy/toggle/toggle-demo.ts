import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-toggle-demo',
  templateUrl: './toggle-demo.html',
  styleUrls: ['./toggle-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyToggleDemoComponent implements OnInit {

  id = 'ui/toggle';

  html = ``;
  sass = ``;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
