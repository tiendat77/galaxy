import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-button-demo',
  templateUrl: './button-demo.html',
  styleUrls: ['./button-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyButtonDemoComponent implements OnInit {

  id = 'ui/button';

  html = `
  <button galaxy-button>
    Glaxy Button
  </button>

  <button galaxy-raised-button>
    Glaxy Raised Button
  </button>
  `;
  sass = ``;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
