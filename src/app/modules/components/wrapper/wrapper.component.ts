import { Component, OnInit } from '@angular/core';

import { OPTIONS } from './mock';
import { COMPANIES } from './companies';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  wtf = {
    value: [],
    label: 'Company',
    source: COMPANIES,
    multiple: true,
    required: true,
  };

  timezone = {
    required: true,
    value: undefined,
    label: 'Timezone'
  };

  source: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    console.log(this.wtf);
  }

  changed(event) {
    console.log('change neee: ', event);
  }

}
