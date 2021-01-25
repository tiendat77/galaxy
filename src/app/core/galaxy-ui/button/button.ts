import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

class GalaxyButtonBase {
  constructor(public _elementRef: ElementRef) {}
}

const BUTTON_HOST_ATTRIBUTES = [
  'galaxy-button',
  'galaxy-raised-button',
  'galaxy-stroked-button',
  'galaxy-icon-button'
];

@Component({
  selector: `button[galaxy-button], button[galaxy-raised-button],
             button[galaxy-stroked-button], button[galaxy-icon-button]`,
  template: '<ng-content></ng-content>',
  styleUrls: ['button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyButton extends GalaxyButtonBase {

  constructor(elementRef: ElementRef) {
    super(elementRef);

    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    elementRef.nativeElement.classList.add('galaxy-button-base');
  }

  _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

}
