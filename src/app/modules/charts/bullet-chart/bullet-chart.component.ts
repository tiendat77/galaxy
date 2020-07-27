import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TEST_DATA } from './mock';
import { createBulletChart } from './bullet';

import * as d3 from 'd3';

@Component({
  selector: 'app-bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.scss']
})
export class BulletChartComponent implements OnInit, AfterViewInit {
  @ViewChild('bulletContainer') bulletContainer: ElementRef;

  @Input() data;

  chartID = '#BULLET_CHART';
  margin = {top: 5, right: 40, bottom: 20, left: 160};
  width = 960 - this.margin.left - this.margin.right;
  height = 70 - this.margin.top - this.margin.bottom;

  debounce: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor() { }

  ngOnInit(): void {
    this.initStyle();

    fromEvent(window, 'resize').pipe(
      debounceTime(600)
    ).subscribe((event) => {
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.debounce.next(0);
    this.data = this.initData(TEST_DATA);
    this.draw();
  }

  initData(data: any[]) {
    // Parse data?
    for (const item of data) {
      item.truncatedTitle = '';
      item.truncatedSubtitle = '';

      if (item.title && item.title.length > 16) {
        item.truncatedTitle = item.title.slice(0, 13) + '...';
      } else {
        item.truncatedTitle = item.title;
      }

      if (item.subtitle && item.subtitle.length > 16) {
        item.truncatedSubtitle = item.subtitle.slice(0, 13) + '...';
      } else {
        item.truncatedSubtitle = item.subtitle;
      }
    }

    return data;
  }

  initStyle() {
    d3.select('body')
      .append('style')
      .text(`
        .bullet { font: 10px sans-serif; }
        .bullet .marker { stroke: #ff2839; stroke-width: 2px; }
        .bullet .tick line { stroke: #666; stroke-width: .5px; }
        .bullet .range.s0 { fill: #0570b0; }
        .bullet .range.s1 { fill: #74a9cf; }
        .bullet .range.s2 { fill: #bdc9e1; }
        .bullet .measure.s0 { fill: #9fa5af; }
        .bullet .measure.s1 { fill: #666869; }
        .bullet .title {
          font-size: 14px;
          font-weight: bold;
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bullet .subtitle { fill: #999; }
      `);
  }

  initSvg() {
    const element = this.bulletContainer.nativeElement;

    this.width = element.offsetWidth - this.margin.left - this.margin.right;
  }

  draw() {
    this.initSvg();

    d3.select(this.chartID)
      .selectAll('svg')
      .remove();

    const bullletChart = createBulletChart(d3);
    const chart = bullletChart.bullet()
      .width(this.width)
      .height(this.height);

    const svg = d3.select(this.chartID)
      .selectAll('svg')
      .data(this.data)
      .enter()
      .append('svg')
        .attr('class', 'bullet')
        .style('font-size', '12px')
        .style('margin-bottom', '10px')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(chart);

    const title = svg.append('g')
        .style('text-anchor', 'end')
        .attr('transform', `translate(-10, ${this.height / 2})`);

    title.append('text')
        .attr('class', 'title')
        .text((d: any) => d.truncatedTitle)
      .append('title')
        .text((d: any) => d.title);

    title.append('text')
        .attr('fill', '#999')
        .attr('dy', '1em')
        .text((d: any) => d.truncatedSubtitle)
      .append('title')
        .text((d: any) => d.subtitle);
  }

}
