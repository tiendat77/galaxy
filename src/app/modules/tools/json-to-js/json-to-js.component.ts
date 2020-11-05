import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { stringify } from 'javascript-stringify';

@Component({
  selector: 'app-json-to-js',
  templateUrl: './json-to-js.component.html',
  styleUrls: ['./json-to-js.component.scss']
})
export class JsonToJsComponent implements OnInit {
  @ViewChild('outputArea') outputArea: ElementRef;

  input = `{
    "sender":{
      "id":"USER_ID"
    },
    "recipient":{
      "id":"PAGE_ID"
    },
    "timestamp":1458692752478,
    "message":{
      "seq":73,
      "text":"hello, world!",
      "quick_reply": {
        "payload": "DEVELOPER_DEFINED_PAYLOAD"
      }
    }
  }`;
  output = ``;

  constructor() { }

  ngOnInit(): void {
  }

  convert() {
    console.log(this.input);
    try {
      const jsObject = JSON.parse(this.input);
      const stringifiedObject = stringify(jsObject, null, 2);
      this.output = stringifiedObject;

    } catch (error) {
      if (error instanceof SyntaxError) {
        this.output = error.toString();
      } else {
        this.output = error.toString();
      }
    }
  }

  copy() {
    if (this.outputArea) {
      this.outputArea.nativeElement.focus();
      this.outputArea.nativeElement.select();

      try {
        document.execCommand('copy');

      } catch (error) {
        console.log(error);
        alert('Oops! Unable to copy');
      }
    }
  }

  preventKeys(event) {
    if (event.keyCode === 9) { // Tab
      this.input += '  ';
      event.preventDefault();
    }
  }

}
