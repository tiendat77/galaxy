import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-tooltip-demo',
  templateUrl: './tooltip-demo.html',
  styleUrls: ['./tooltip-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyTooltipDemoComponent implements OnInit {

  id = 'ui/tooltip';

  html = `
  <button galaxy-button
          galaxyTooltip="Galaxy tooltip worked!!!">
    Hover me
  </button>

  <button galaxy-button
          galaxyTooltip="Galaxy bottom tooltip"
          placement="bottom">
    Bottom tooltip
  </button>

  <button galaxy-button
          galaxyTooltip="Galaxy left tooltip"
          placement="left">
    Left tooltip
  </button>

  <button galaxy-button
          galaxyTooltip="Galaxy right tooltip"
          placement="right">
    Right tooltip
  </button>
  `;
  sass = `
  button {
    margin-bottom: 2rem;
  }
  `;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
