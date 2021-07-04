import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-card-demo',
  templateUrl: './card-demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyCardDemoComponent implements OnInit {

  id = 'ui/card';

  html = `
  <div galaxy-card>
    <h1>Hello</h1>
    <h1>Bonjour</h1>
    <h1>Vietnam xin chào!</h1>
  </div>
  `;
  sass = ``;
  ts = ``;

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
