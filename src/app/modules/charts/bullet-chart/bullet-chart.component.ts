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
  @Input() title: string;
  @Input() subtitle: string;

  chartID = '#BULLET_CHART';
  margin = {top: 5, right: 40, bottom: 20, left: 160};
  width = 960 - this.margin.left - this.margin.right;
  height = 70 - this.margin.top - this.margin.bottom;

  domains = ['range 1', 'range 2', 'range 3'];
  rangeColor: string[] = ['#0570b0', '#74a9cf', '#bdc9e1'];
  measureColor = ['#9fa5af', '#666869'];

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

    return data;
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
    const element = this.bulletContainer.nativeElement;

    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight / this.data.length - 2 * (this.margin.top + this.margin.bottom);
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

  initLegend() {
    const svg = d3.select(this.chartID).append('svg')
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
