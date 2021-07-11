import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

import { BOX_SHADOWS } from './box-shadows';

@Component({
  selector: 'app-box-shadow',
  templateUrl: './box-shadow.component.html',
  styleUrls: ['./box-shadow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxShadowComponent {

  @ViewChild('copier') copier: ElementRef;

  collection = BOX_SHADOWS;

  constructor() { }

  copy(event: Event, style: string) {
    this.clipboard(style);

    const element = event.target as HTMLElement;
    const origin = element.innerHTML;

    element.innerHTML = 'Copied!';
    setTimeout(() => element.innerHTML = origin, 1000);
  }

  clipboard(style: string) {
    /* Get the text field */
    const element = this.copier?.nativeElement;

    try {
      element.value = `box-shadow: ${style};`;

      /* Select the text field */
      element.select();
      element.setSelectionRange(0, 99999); /* For mobile devices */

      /* Do copy */
      document.execCommand('copy');

    } catch (error) {
      console.log(error);
      alert('Oops! Unable to copy');
    }
  }

}
