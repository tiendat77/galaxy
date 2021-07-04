import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

import { GalaxyTab } from './tab';

let nextId = 0;

@Component({
  selector: 'galaxy-tabs',
  templateUrl: 'tabs.html',
  styleUrls: ['tabs.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyTabs implements AfterContentInit {

  private readonly tabId!: number;
  readonly tabControlName!: string;

  @ContentChildren(GalaxyTab, { descendants: true })
  tabs: QueryList<GalaxyTab> = new QueryList<GalaxyTab>();

  @ViewChild('slider') slider: ElementRef;

  selectedIndex: number;

  constructor(
    private renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.tabId = nextId++;
    this.tabControlName = 'galaxy-tab-control' + this.tabId;
  }

  ngAfterContentInit() {
    Promise.resolve().then(() => {
      this.setSlider(0);
      this.selectedIndex = 0;

      this.tabs.forEach((tab: GalaxyTab, index: number) => {
        tab.id = 'galaxy-tab-' + this.tabId + '_' + index;
      });

      this.tabs.first.active = true;

      this._changeDetectorRef.markForCheck();
    });
  }

  tabChange(_tab: GalaxyTab, index: number) {
    this.setSlider(index);
    this.selectedIndex = index;

    this.tabs.forEach((tab: GalaxyTab) => {
      tab.active = false;
    });

    _tab.active = true;

    this._changeDetectorRef.markForCheck();
  }

  setSlider(index: number) {
    setTimeout(() => {
      this.renderer.setStyle(
        this.slider.nativeElement,
        'transform',
        `translateX(${100 * index}%)`
      );
    });
  }

}
