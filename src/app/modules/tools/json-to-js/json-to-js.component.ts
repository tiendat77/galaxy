import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { stringify } from 'javascript-stringify';
import { NotifyService } from '@app/core/services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-json-to-js',
  templateUrl: './json-to-js.component.html',
  styleUrls: ['./json-to-js.component.scss']
})
export class JsonToJsComponent implements OnInit {

  @ViewChild('outputRef', { static: false }) private outputRef: ElementRef;

  /**
   * mode == true: Json to Js
   * mode == false: Js to Json
   */
  mode = true;

  input = ''; /** `{\n  "sender": {\n    "id": "USER_ID"\n  }\n}` */
  output = '';
  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    const mode = this.route.snapshot.paramMap.get('mode');

    if (mode === 'js') {
      this.mode = false;
    } else {
      this.mode = true;
    }
  }

  public toggle() {
    this.mode = !this.mode;
    this.error = '';
    this.input = '';
    this.output = '';
    this.updateParam();
  }

  public js() {
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

  public json() {
    this.error = '';
    this.output = '';

    /**
     * Thanks to sKumarBinay
     * Github: https://github.com/sKumarBinay/convert-string-to-object
     */
    function convertToObject(data) {
      const json = data.replace("export default", "").replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, "").replace(/"/g, "").replace(/'/g, "").replace(/{/g, '{"').replace(/}/g, '"}').replace(/:/g, '":"').replace(/,/g, '","').replace(/:"{/g, ":{").replace(/}"}/g, "}}").replace(/}","{/g, "},{").replace(/]"}/g, "]}").replace(/:"\[/g, ':["').replace(/]",/g, "],").replace(/],/g, '"],').replace(/]}/g, '"]}').replace(/\(/g, '("').replace(/\)/g, '")').replace(/"{/g, "{").replace(/}"/g, "}");
      const obj = JSON.parse(json);

      Object.keys(obj).forEach(k => {
        const int = parseInt(obj[k]);
        isNaN(int) || "object" == typeof obj[k] || (obj[k] = int);
      });

      return obj;
    }

    try {
      const jsObject = convertToObject(this.input);
      const json = JSON.stringify(jsObject, null, 2);
      this.output = json;
      this.scrollToOutput();

    } catch (error) {
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

  private updateParam() {
    const mode = this.mode ? 'json' : 'js';
    this.router.navigate(['/tools/json-to-js', {mode}]);
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
