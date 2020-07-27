import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AAPL } from './mock';
import * as d3 from 'd3';
import { curveBasis } from 'd3';

@Component({
  selector: 'app-dash-line-chart',
  templateUrl: './dash-line-chart.component.html',
  styleUrls: ['./dash-line-chart.component.scss']
})
export class DashLineChartComponent implements OnInit, AfterViewInit {
  @ViewChild('dashedLineChart') chartContainer: ElementRef;

  @Input() data: { date: Date, value: number }[];
  chartID = '#DASHED_LINE';

  margin = ({top: 20, right: 30, bottom: 30, left: 40});
  width = 800 - this.margin.left - this.margin.right;
  height = 600 - this.margin.top - this.margin.bottom;

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
    this.draw();
  }

  initData() { // parse data
    this.data = Object.assign(AAPL.map(({date, close}) => ({ date: new Date(date), value: close })), {y: '$ Close'});

  }

  initStyle() {

  }

  initTooltip() {
    d3.select('#chartTooltip').remove();

    const tooltip = d3.select('body')
      .append('div')
      .attr('id', 'chartTooltip')
      .style('content', '""')
      .style('border', 'solid')
      .style('border-color', 'transparent rgba(0, 0, 0, 0.582)')
      .style('border-width', '6px 12px 6px 0px')
      .style('left', '-12px')
      .style('bottom', '6px')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    return tooltip;
  }

  initSvg() {
    d3.select(this.chartID)
      .select('svg')
      .remove();

    const svg = d3.select(this.chartID)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    return svg;
  }

  draw() {
    this.initData();

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    const xScale = d3.scaleUtc()
      .domain(d3.extent(this.data, (d) => d.date))
      .range([this.margin.left, this.width - this.margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.value)])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(this.width / 80)
          .tickSizeOuter(0)
      );

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('$ Close')); // Axis title

    const line = d3.line()
      .defined((d: any) => !isNaN(d.value))
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.value))
      .curve(d3.curveBasis);

    const data: any = Object.assign(this.data, { y: '$ Close'});

    const svg = this.initSvg();

    svg.append('g')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    svg.append('path')
      .datum(this.data)
      .transition()
      .duration(1000)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line(this.data));
  }

}
