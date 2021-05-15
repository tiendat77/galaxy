import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[galaxyTooltip]',
  exportAs: 'tooltip',
})

export class GalaxyTooltipDirective {

  @Input('galaxyTooltip') tooltipTitle: string;
  @Input() delay = 200;
  @Input() placement = 'top';

  tooltip: HTMLElement;
  offset = 10;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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

  @HostListener('click')
  onClick() { }

  show() {
    console.log('show tooltip thoi nao');
    this.create();
    this.setPosition();
  }

  hide() {
    console.log('hide tooltip thoi nao');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }, this.delay);
  }

  private create() {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) // textNode
    );

    this.renderer.addClass(this.tooltip, 'galaxy-tooltip');

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
