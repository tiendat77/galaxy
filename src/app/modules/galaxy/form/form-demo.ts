import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-form-demo',
  templateUrl: './form-demo.html',
  styleUrls: ['./form-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyFormDemoComponent implements OnInit {

  id = 'ui/form';

  html = `
  <galaxy-form class="form-demo">
    <galaxy-label>Your name</galaxy-label>
    <input name="name" placeholder=" ">
  </galaxy-form>

  <galaxy-form class="form-demo">
    <galaxy-label>Your email</galaxy-label>
    <input name="email" placeholder=" ">
  </galaxy-form>
  `;
  sass = `
  .form-demo {
    max-width: 200px;
    margin-bottom: 1rem;
  }
  `;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
