import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { nonaccent } from './non-accent';
import { ColorMapping } from './color-mapping';

@Component({
  selector: 'galaxy-avatar',
  templateUrl: 'avatar.html',
  styleUrls: ['avatar.scss'],
  host: {
    '[style.width.px]': 'diameter',
    '[style.height.px]': 'diameter',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyAvatar implements AfterViewInit {

  @Input() diameter = 50;
  @Input() name;
  @Input() source = 'assets/images/default-avatar.jpg';

  @ViewChild('avatarDiv') avatarDivRef: ElementRef;
  @ViewChild('avatarImg') avatarImgRef: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.set(this.source);
  }

  onError(event) {
    this.hide();
    this.get();
  }

  private get() {
    if (!this.name) {
      return;
    }

    const element = this.avatarDivRef?.nativeElement;
    if (!element) {
      return;
    }

    const capName = this.cap(this.name);
    const color = ColorMapping[capName] ? ColorMapping[capName] : '#cab2d6';

    element.style.backgroundColor = color;
    element.innerHTML = capName;
  }

  private set(source: string) {
    const element = this.avatarImgRef?.nativeElement;
    if (!element) {
      return;
    }

    element.src = source;
  }

  private hide() {
    const element = this.avatarImgRef?.nativeElement;
    if (!element) {
      return;
    }

    element.style.display = 'none';
  }

  private cap(name: string): string | undefined {
    if (!name) {
      return;
    }

    try {
      const firstName = name.trim().split(' ');
      if (!firstName || !firstName.length) {
        return;
      }

      let cap = firstName[firstName.length - 1].slice(0, 1);
      cap = nonaccent(cap).toUpperCase();

      return cap;

    } catch (error) {
      return;
    }
  }

}
