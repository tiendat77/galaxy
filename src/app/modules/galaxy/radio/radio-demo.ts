import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-radio-demo',
  templateUrl: './radio-demo.html',
  styleUrls: ['./radio-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyRadioDemoComponent implements OnInit {

  id = 'ui/radio';

  html = `
  <galaxy-radio
    value="hero"
    name="character"
    [formControl]="character">
  Hero
  </galaxy-radio>

  <galaxy-radio
    value="devil"
    name="character"
    [formControl]="character">
  Devil
  </galaxy-radio>

  <span>Your character: {{character.value}}</span>
  `;
  sass = ``;
  ts = `
  import { Component } from '@angular/core';
  import { FormControl } from '@angular/forms';

  @Component({
    selector: 'galaxy-radio-demo',
    templateUrl: './radio-demo.html',
  })
  export class GalaxyRadioDemoComponent {

    character: FormControl = new FormControl('hero');

  }
  `;

  character: FormControl = new FormControl('hero');

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
