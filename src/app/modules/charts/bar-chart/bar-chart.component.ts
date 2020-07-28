import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MOCK_DATA } from './mock';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @ViewChild('barChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() title: string;
  @Input() subtitle: string;
  @Input() yLabel = 'Frequency';
  @Input() barColor = 'steelblue';
  @Input() axisColor = 'rgba(0, 0, 0, 0.68)';


  chartID = '#BAR_CHART';
  margin = { top: 10, right: 30, bottom: 30, left: 40 };
  width = 460 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;

  scale = {
    xScale: undefined,
    yScale: undefined,
  };

  axis = {
    xAxis: undefined,
    yAxis: undefined
  };

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
    this.data = MOCK_DATA.map(({date, value}) => ({date, value: +value}));
  }

  initSvg() {
    d3.select(this.chartID)
      .selectAll('svg')
      .remove();

    const svg = d3.select(this.chartID)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    return svg;
  }

  draw() {
    const element = this.chartContainer.nativeElement;

    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    const svg = this.initSvg();

    const xScale = d3.scaleBand()
      .domain(this.data.map(d => d.date))
      .rangeRound([this.margin.left, this.width - this.margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d: any) => d.value)]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
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
      .call(d3.axisLeft(yScale))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.selectAll('line')
        .attr('stroke', this.axisColor)
      )
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisColor)
      )
      .call(axis => axis.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('fill', this.axisColor)
        .attr('text-anchor', 'start')
        .text(this.yLabel)
      );

    svg.append('g')
        .attr('fill', this.barColor)
      .selectAll('rect')
      .data(this.data)
      .join('rect')
        .attr('x', (d: any) => xScale(d.date))
        .attr('y', (d: any) => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d: any) => yScale(0) - yScale(d.value));

    svg.append('g')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
      .selectAll('rect')
      .data(this.data)
      .join('rect')
        .attr('x', (d: any) => xScale(d.date))
        .attr('y', 0)
        .attr('width', xScale.bandwidth())
        .attr('height', this.height)
      .append('title')
        .text((d: any) => d.value);


    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }

}
