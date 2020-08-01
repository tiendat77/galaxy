import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TEST_DATA } from './mock';
import { createBulletChart } from './bullet';

import * as d3 from 'd3';

@Component({
  selector: 'app-bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.scss']
})
export class BulletChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bulletContainer') bulletContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() rangeColor: string[] = ['#0570b0', '#74a9cf', '#bdc9e1'];
  @Input() measureColor = ['#9fa5af', '#666869'];
  @Output() itemClick: EventEmitter<any> = new EventEmitter();

  chartID = 'BULLET_CHART';
  margin = {top: 5, right: 40, bottom: 20, left: 160};
  width = 800 - this.margin.left - this.margin.right;
  height = 70 - this.margin.top - this.margin.bottom;

  domains = ['range 1', 'range 2', 'range 3'];

  resizeSub: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.initStyle();
    this.initData(TEST_DATA);

    this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(600)).subscribe((event) => {
      this.draw();
    });
  }

  ngOnDestroy() {
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.draw();
  }

  initID() {
    const rand = () => Math.floor(1000 + (9990 - 1000) * Math.random());

    return 'BULLET_CHART_' + rand() + '_' + rand();
  }

  initData(data: any[]) {
    // Parse data?
    for (const item of data) {
      item.truncatedTitle = truncateText(item.title, 16);
      item.truncatedSubtitle = truncateText(item.subtitle, 16);
    }

    function truncateText(text: string, maxCharacter: number): string {
      if (text && text.length > maxCharacter) {
        return text.slice(0, maxCharacter - 3) + '...';
      } else {
        return text;
      }
    }

    this.data = data;
  }

  initStyle() {
    d3.select('body')
      .append('style')
      .text(`
        .bullet { font: 10px sans-serif; }
        .bullet .marker { stroke: #ff2839; stroke-width: 2px; }
        .bullet .tick line { stroke: #666; stroke-width: .5px; }
        .bullet .range.s0 { fill: ${this.rangeColor[0]}; }
        .bullet .range.s1 { fill: ${this.rangeColor[1]}; }
        .bullet .range.s2 { fill: ${this.rangeColor[2]}; }
        .bullet .measure.s0 { fill: ${this.measureColor[0]}; }
        .bullet .measure.s1 { fill: ${this.measureColor[1]}; }
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
    d3.select('#' + this.chartID)
      .selectAll('svg')
      .remove();

    const element = this.bulletContainer.nativeElement;

    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = Math.floor((element.offsetHeight / this.data.length) * 6 / 7 - this.margin.top - this.margin.bottom);
  }

  draw() {
    this.initSvg();

    const bullletChart = createBulletChart(d3);
    const chart = bullletChart.bullet()
      .width(this.width)
      .height(this.height);

    const svg = d3.select('#' + this.chartID)
      .selectAll('svg')
      .data(this.data)
      .enter()
      .append('svg')
        .attr('class', 'bullet')
        .style('font-size', '1.2em')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', Math.floor(this.height * 7 / 6 + this.margin.top + this.margin.bottom)) // crazy math, huh?
      .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(chart)
        .on('click', (d, i) => {
          this.itemClick.next(d);
        });

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

  initLegend() { // TODO
    const svg = d3.select('#' + this.chartID).append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', 125);

    const legend = svg.append('g')
      .attr('transform', `translate(${this.width - this.margin.right}, 0)`);

    // Border
    legend
      .append('rect')
      .attr('width', 120)
      .attr('height', 125)
      .style('fill', 'none')
      .style('stroke-width', 1)
      .style('stroke', 'black');

    const size = 20;
    const borderPadding = 15;
    const itemPadding = 5;
    const textOffset = 2;

    // Boxes
    legend.selectAll('boxes')
      .data(this.domains)
      .enter()
      .append('rect')
        .attr('x', borderPadding)
        .attr('y', (d, i) => borderPadding + (i * (size + itemPadding)))
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', (d, i) => this.rangeColor[i]);

    // Labels
    legend.selectAll('labels')
      .data(this.domains)
      .enter()
      .append('text')
        .attr('x', borderPadding + size + itemPadding)
        .attr('y', (d, i) => borderPadding + i * (size + itemPadding) + (size / 2) + textOffset)
        .text((d) => d)
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle')
        .style('font-family', 'sans-serif');

    return svg.node();
  }

}
