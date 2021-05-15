import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

const BUTTON_HOST_ATTRIBUTES = [
  'galaxy-button',
  'galaxy-raised-button',
  'galaxy-stroked-button',
  'galaxy-icon-button'
];

/**
 * @example
 * <button galaxy-button>Galaxy</button>
 * <a galaxy-button>Galaxy</a>
 */

@Component({
  selector: `button[galaxy-button], button[galaxy-raised-button],
             button[galaxy-stroked-button], button[galaxy-icon-button],
             a[galaxy-button], a[galaxy-raised-button],
             a[galaxy-stroked-button], a[galaxy-icon-button]`,
  template: '<ng-content></ng-content>',
  styleUrls: ['button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyButton {

  constructor(elementRef: ElementRef) {
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (hasHostAttributes(attr)) {
        (elementRef.nativeElement as HTMLElement).classList.add(attr);
      }
    }

    elementRef.nativeElement.classList.add('galaxy-button-base');

    function hasHostAttributes(...attributes: string[]) {
      return attributes.some(attribute => elementRef.nativeElement.hasAttribute(attribute));
    }
  }

}
