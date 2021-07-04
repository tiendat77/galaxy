import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

let nextId = 0;

@Directive({
  selector: '[galaxyTooltip]',
  exportAs: 'tooltip',
})

export class GalaxyTooltipDirective {

  @Input('galaxyTooltip') tooltipTitle: string;
  @Input() delay = 200;
  @Input() placement = 'top';

  tooltip: HTMLElement;
  tooltipId: number;
  offset = 10;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.tooltipId = nextId++;
  }

  @HostListener('focusin')
  @HostListener('mouseenter')
  onMouseEnter() {
    this.show();
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  onMouseLeave() {
    this.hide();
  }

  show() {
    this.create();
    this.setPosition();
  }

  hide() {
    window.setTimeout(() => {
      if (!this.tooltip) {
        return;
      }

      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }, this.delay);
  }

  private create() {
    if (this.tooltip) {
      return;
    }

    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) // textNode
    );

    this.renderer.addClass(this.tooltip, 'galaxy-tooltip');
    this.renderer.setAttribute(this.tooltip, 'id', ('galaxy-tooltip-' + this.tooltipId));

    this.renderer.appendChild(document.body, this.tooltip);
  }

  private setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top;
    let left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}
