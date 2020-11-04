import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MOCK_DATA } from './mock';
import * as d3 from 'd3';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stackedBarChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];

  chartID = 'STACKED_BAR_CHART';
  width = 500;
  height = 500;

  resizeSub: Subscription;

  constructor() {
    this.chartID = this.initID();
  }

  ngOnInit(): void {
    this.initData();

    this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(200))
      .subscribe(event => {
        this.draw();
      });
  }

  ngOnDestroy(): void {
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {

  }

  initID() {
    const rand = () => Math.floor(1000 + (9999 - 1000) * Math.random());

    return 'STACKED_BAR_CHART_' + rand() + '_' + rand();
  }

  initData() { // Crazy math
    const parsed = MOCK_DATA.filter((d: any) => d.location !== 'BRICS' && d.location !== 'EU27' && d.location !== 'OECD');

    const locations = Object.keys( parsed.reduce((acc, d: any) => {
      acc[d.location] = true;
      return acc;
    }, {}));

    const categories = Object.keys( parsed.reduce((acc, d: any) => {
      acc[d.subject] = true;
      return acc;
    }, {}));

    const allData = locations.map(location => {

      const locationData = parsed.filter((d: any) => d.location === location).reduce((acc, d: any) => {
        acc[ d.subject ] = d.value;
        return acc;
      }, {});

      return Object.assign({
        location,
        total: d3.sum( parsed.filter((d: any) => d.location === location), (d: any) => d.value )
      }, locationData);

    }).sort((a, b) => b.total - a.total);

    return Object.assign( allData, { categories });
  }

  initSvg() {
    d3.select('#' + this.chartID)
      .selectAll('svg')
      .remove();

    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;


    }

  }

  draw() {

  }

}
