import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, HostListener, Input, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: 'galaxy-menu-trigger',
  host: {
    'style': 'display: inline-block;'
  }
})
export class GalaxyMenuTrigger {

  @HostListener('focus') onTrigger() {

  }

}

@Directive({
  selector: 'galaxy-menu-content',
  host: {
    'style': 'display: inline-block;'
  }
})
export class GalaxyMenuContent { }

export type MENU_POSITION = 'top' | 'bottom' | 'left' | 'right';
export type MENU_TRIGGER_TYPE = 'click' | 'hover';

@Component({
  selector: 'galaxy-menu',
  templateUrl: 'menu.html',
  styleUrls: ['menu.scss'],
  host: {
    'class': 'galaxy-menu'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyMenu {

  @Input() position: MENU_POSITION = 'bottom';
  @Input() triggerBy: MENU_TRIGGER_TYPE = 'click';

  @ContentChild(GalaxyMenuTrigger) menuTrigger;
  @ContentChild(GalaxyMenuContent) menuContent;

  constructor(private elementRef: ElementRef) {
    (elementRef.nativeElement as HTMLElement).classList.add(`galaxy-menu-${this.position}`);
  }

}