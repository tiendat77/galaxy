import { Component, ElementRef, ViewChild } from '@angular/core';

import { stringify } from 'javascript-stringify';
import { NotifyService } from '@app/core/services/notify.service';

@Component({
  selector: 'app-json-to-js',
  templateUrl: './json-to-js.component.html',
  styleUrls: ['./json-to-js.component.scss']
})
export class JsonToJsComponent {

  @ViewChild('outputRef', { static: false }) private outputRef: ElementRef;

  input = `{
    "sender":{
      "id":"USER_ID"
    }
  }`;
  output = '';
  error = '';

  constructor(private notify: NotifyService) { }

  public convert() {
    this.error = '';
    this.output = '';

    try {
      const jsObject = JSON.parse(this.input);
      const stringifiedObject = stringify(jsObject, null, 2);
      this.output = stringifiedObject;
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
      const element = this.outputRef.nativeElement;
      element?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 250);
  }

}
