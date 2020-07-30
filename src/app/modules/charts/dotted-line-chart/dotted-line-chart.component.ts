import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

import { MOCK_DATA } from './mock';

import * as d3 from 'd3';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dotted-line-chart',
  templateUrl: './dotted-line-chart.component.html',
  styleUrls: ['./dotted-line-chart.component.scss']
})
export class DottedLineChartComponent implements OnInit, AfterViewInit {
  @ViewChild('dottedLineChart') chartContainer: ElementRef;

  @Input() data: any[];
  @Input() title: string;
  @Input() subtitle: string;
  @Input() axisColor = 'rgba(0, 0, 0, 0.68)';

  chartID = '#DOTTED_LINE_CHART';
  margin = ({top: 20, right: 30, bottom: 30, left: 40});
  width = 800 - this.margin.left - this.margin.right;
  height = 600 - this.margin.top - this.margin.bottom;

  constructor() { }

  ngOnInit(): void {
    this.initData();

    fromEvent(window, 'resize').pipe(
      debounceTime(1000)
    ).subscribe((event) => {
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.draw();
  }

  initData() {
    this.data = MOCK_DATA.map(({date, value}) => ({ date: d3.timeParse('%Y-%m-%d')(date), value: +value }));
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
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.bottom - this.margin.top;

    const svg = this.initSvg();

    const xScale = d3.scaleTime()
      .domain(d3.extent(this.data, (d: any) => d.date))
      .range([this.margin.left, this.width - this.margin.right]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, (d: any) => d.value))
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSizeOuter(0))
      .call(axis => axis.select('.domain')
        .attr('stroke', this.axisColor)
      )
      .call(axis => axis.selectAll('line')
        .attr('stroke', this.axisColor)
      )
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisColor)
      );

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.selectAll('line').remove())
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisColor)
      );

    const line = d3.line()
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.value));

    // Draw line
    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#D23231')
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);

    // Draw rect
    svg.append('g')
      .selectAll('rect')
      .data(this.data)
      .join('rect')
        .attr('fill', '#D23231')
        .attr('stroke', 'none')
        .attr('x', (d: any) => xScale(d.date) - 3)
        .attr('y', (d: any) => yScale(d.value) - 3)
        .attr('width', 6)
        .attr('height', 6);

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }

}
