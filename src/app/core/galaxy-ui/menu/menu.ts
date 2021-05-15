import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: 'galaxy-menu-trigger',
  host: {
    'class': 'galaxy-menu-trigger'
  }
})
export class GalaxyMenuTrigger { }

@Directive({
  selector: 'galaxy-menu-content'
})
export class GalaxyMenuContent { }

export type MENU_POSITION_X = 'left' | 'right';
export type MENU_POSITION_Y = 'top' | 'bottom';
export type MENU_TRIGGER_TYPE = 'click' | 'hover';

@Component({
  selector: 'galaxy-menu',
  templateUrl: 'menu.html',
  styleUrls: ['menu.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyMenu {

  @Input() positionX: MENU_POSITION_X = 'left';
  @Input() positionY: MENU_POSITION_Y = 'bottom';
  @Input() triggerBy: MENU_TRIGGER_TYPE = 'click';

  isShow = false;

  constructor(public elementRef: ElementRef) {
    if (this._hasHostAttributes('positionX')) {
      this.positionX = this._getAttribute('positionX');
    }
    (elementRef.nativeElement as HTMLElement).classList.add(`galaxy-menu-${this.positionX}`);

    if (this._hasHostAttributes('positionY')) {
      this.positionY = this._getAttribute('positionY');
    }
    (elementRef.nativeElement as HTMLElement).classList.add(`galaxy-menu-${this.positionY}`);

    if (this._hasHostAttributes('triggerBy')) {
      this.triggerBy = this._getAttribute('triggerBy');
    }
  }

  toggle(event) {
    if (this.isShow) {
      this._hide();
      this.isShow = false;
      return;
    }

    this._show();
    this.isShow = true;
  }

  backdrop(event) {
    if (!this.isShow) {
      return;
    }

    this._hide();
    this.isShow = false;
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this.elementRef.nativeElement.hasAttribute(attribute));
  }

  private _getAttribute(attribute: string) {
    return this.elementRef.nativeElement.getAttribute(attribute);
  }

  private _show() {
    const element = this.elementRef.nativeElement;

    if (!element) {
      return;
    }

    element.classList.add('galaxy-menu-show');
  }

  private _hide() {
    const element = this.elementRef.nativeElement;

    if (!element) {
      return;
    }

    element.classList.remove('galaxy-menu-show');
  }

}
