import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GalaxyService } from '../galaxy.service';

@Component({
  selector: 'galaxy-radio-button-demo',
  templateUrl: './radio-button-demo.html',
  styleUrls: ['./radio-button-demo.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyRadioButtonDemoComponent implements OnInit {

  id = 'ui/radio-button';

  html = `
  <galaxy-radio-button
    value="hero"
    name="character"
    [formControl]="character">
  Hero
  </galaxy-radio-button>

  <galaxy-radio-button
    value="devil"
    name="character"
    [formControl]="character">
  Devil
  </galaxy-radio-button>

  <span>Your character: {{character.value}}</span>
  `;
  sass = ``;
  ts = `
  import { Component } from '@angular/core';
  import { FormControl } from '@angular/forms';

  @Component({
    selector: 'galaxy-radio-button-demo',
    templateUrl: './radio-button-demo.html',
  })
  export class GalaxyRadioButtonDemoComponent {

    character: FormControl = new FormControl('hero');

  }
  `;

  character: FormControl = new FormControl('hero');

  constructor(private galaxy: GalaxyService) { }

  ngOnInit() {
    this.galaxy.setModule(this.id);
  }

}
