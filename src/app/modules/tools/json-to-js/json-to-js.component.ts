import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-json-to-js',
  templateUrl: './json-to-js.component.html',
  styleUrls: ['./json-to-js.component.scss']
})
export class JsonToJsComponent implements OnInit {

  input = '';
  output = '';

  constructor() { }

  ngOnInit(): void {
  }

  convert() {
    console.log(this.input);
    try {
      const jsObject = JSON.parse(this.input);
      this.output = jsObject;

    } catch (error) {
      if (error instanceof SyntaxError) {
        this.output = error.toString();
      } else {
        this.output = error.toString();
      }
    }
  }

  copy() {

  }

  preventKeys(event) {
    if (event.keyCode === 9) { // Tab
      this.input += '  ';
      event.preventDefault();
    }
  }

}
