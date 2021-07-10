import { ElementRef, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BOX_SHADOWS } from './box-shadows';

@Component({
  selector: 'app-box-shadow',
  templateUrl: './box-shadow.component.html',
  styleUrls: ['./box-shadow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxShadowComponent implements OnInit {

  @ViewChild('copier') copier: ElementRef;

  collection = BOX_SHADOWS;

  constructor() { }

  ngOnInit() {
  }

  copy(style: string) {
    setTimeout(() => {
      /* Get the text field */
      const element = this.copier?.nativeElement;

      if (!element) {
        alert('Oops! Unable to copy');
        return;
      }

      /* Select the text field */
      element.value = style;
      element.select();
      element.setSelectionRange(0, 99999); /* For mobile devices */

      try {
        document.execCommand('copy');
        // this.notify.push('Copied to clipboard!');

      } catch (error) {
        console.log(error);
        alert('Oops! Unable to copy');
      }
    }, 250);
  }

}
