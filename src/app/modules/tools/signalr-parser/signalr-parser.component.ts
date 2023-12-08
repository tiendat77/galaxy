import { Component, ElementRef, ViewChild } from '@angular/core';

import { stringify } from 'javascript-stringify';
import { NotifyService } from '@app/core/services/notify.service';


@Component({
  selector: 'app-signalr-parser',
  templateUrl: './signalr-parser.component.html',
  styleUrls: ['./signalr-parser.component.scss']
})
export class SignalrParserComponent {

  @ViewChild('outputRef', { static: false }) private outputRef: ElementRef;

  input = ''; /** `{\n  "sender": {\n    "id": "USER_ID"\n  }\n}` */
  output = '';
  error = '';

  constructor(
    private notify: NotifyService
  ) { }

  public convert() {
    this.error = '';
    this.output = '';

    try {
      let res = (this.input ?? '').trim();
      res = res.replace(/(.*arguments":\[")/g, '');
      res = res.replace(/("]})/g, '');
      res = res.replace(/\\u0022/g, '"');
      console.log(res);

      let jsObject;
      jsObject = JSON.parse(res);
      const json = JSON.stringify(jsObject, null, 2);

      this.output = json;
      this.scrollToOutput();

    } catch (error) {
      if (error instanceof SyntaxError) {
        this.error = error.toString();
      }

      // what to do?
      this.error = error.toString();
    }
  }

  public copy() {
    setTimeout(() => {
      /* Get the text field */
      const element = this.outputRef.nativeElement;

      if (!element) {
        alert('Oops! Unable to copy');
        return;
      }

      /* Select the text field */
      element.value = this.output;
      element.select();
      element.setSelectionRange(0, 99999); /* For mobile devices */

      try {
        document.execCommand('copy');
        this.notify.push('Copied to clipboard!');

      } catch (error) {
        console.log(error);
        alert('Oops! Unable to copy');
      }
    }, 250);
  }

  private scrollToOutput() {
    setTimeout(() => {
      const element = this.outputRef?.nativeElement;
      element?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 250);
  }

}
