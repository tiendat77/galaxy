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

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    console.log(this.wtf);
  }

}
