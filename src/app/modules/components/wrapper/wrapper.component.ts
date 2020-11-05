import { Component, OnInit } from '@angular/core';

import { OPTIONS } from './mock';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  wtf = {
    value: ['github'],
    label: 'Company',
    source: OPTIONS,
    multiple: true,
    required: true,
  };

  timezone = {
    required: true,
    value: undefined,
    label: 'Timezone'
  };

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    console.log(this.wtf);
    console.log(this.timezone);
  }

}
