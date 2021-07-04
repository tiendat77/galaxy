import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-spinner-demo',
  templateUrl: './spinner-demo.html',
  styleUrls: ['./spinner-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxySpinnerDemoComponent implements OnInit {

  id = 'ui/spinner';

  html = `
  <galaxy-spinner class="mr" diameter="50"></galaxy-spinner>
  <galaxy-spinner diameter="100"></galaxy-spinner>
  `;
  sass = `
  .mr {
    margin-right: 50px;
  }
  `;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
