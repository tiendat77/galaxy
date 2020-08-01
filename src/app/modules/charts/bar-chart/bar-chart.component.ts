import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MOCK_OLE } from './mock';
import * as d3 from 'd3';

@Component({
  selector: '[kpiBarChart]',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('barChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() showValueOnBar = true;
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showXLabel = true;
  @Input() showYLabel = false;
  @Input() showGradient = true;
  @Input() yLabel = '';
  @Input() barColor = '#3195f5';
  @Input() axisColor = 'rgba(250, 250, 250, 0.4)';
  @Input() axisLabelColor = 'rgba(255, 255, 255, 0.68)';
  @Input() gradientColors = ['rgba(49,149,245,0.2)', 'rgba(49,149,245,0.04)', 'transparent'];
  @Input() fontSize = '1.3em';
  @Input() valueUom = '%';

  chartID = 'BAR_CHART';
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = 460;
  height = 400;

  resizeSub: Subscription;

  constructor() {
    this.chartID = this.initID();
  }

  ngOnInit(): void {
    this.initData();

    this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(200)).subscribe((event) => {
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

    return 'BAR_CHART_' + rand() + '_' + rand();
  }

  initData() {
    this.data = MOCK_OLE.map(({id, value}) => ({id, value: +value}));
  }

  initSvg() {
    d3.select('#' + this.chartID)
      .selectAll('svg')
      .remove();

    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;

      // this.width = element.offsetWidth;
      // this.height = element.offsetHeight;

      this.width = element.parentNode.clientWidth;
      this.height = element.parentNode.clientHeight;

      this.fontSize = this.width * 1.1 / (600) + 'em';
    }

    const svg = d3.select('#' + this.chartID)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    svg.append('defs')
      .html(`
        <linearGradient id="barChartGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="${this.gradientColors[0]}"/>
          <stop offset="45%" stop-color="${this.gradientColors[1]}"/>
          <stop offset="70%" stop-color="${this.gradientColors[2]}"/>
        </linearGradient>
      `);

    return svg;
  }

  draw() {
    const svg = this.initSvg();

    const xScale = d3.scaleBand()
      .domain(this.data.map(d => d.id))
      .rangeRound([this.margin.left + 10, this.width - this.margin.right])
      .padding(0.2);

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
        .attr('fill', this.axisLabelColor)
        .attr('font-size', this.fontSize)
      );

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.selectAll('line').remove())
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisLabelColor)
        .attr('font-size', this.fontSize)
      )
      .call(axis => axis.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('fill', this.axisColor)
        .attr('text-anchor', 'start')
        .text(this.yLabel)
      );

    // Draw bar
    svg.append('g')
        .attr('fill', this.showGradient ? 'url(#barChartGradient)' : this.barColor)
      .selectAll('rect')
      .data(this.data)
      .join('rect')
        .attr('x', (d: any) => xScale(d.id))
        .attr('y', (d: any) => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d: any) => yScale(0) - yScale(d.value))
        .attr('stroke', this.barColor)
        .attr('stroke-width', 2);

    // Draw title
    svg.append('g')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
      .selectAll('rect')
      .data(this.data)
      .join('rect')
        .attr('x', (d: any) => xScale(d.id))
        .attr('y', 0)
        .attr('width', xScale.bandwidth())
        .attr('height', this.height)
      .append('title')
        .text((d: any) => d.value);

    // Draw value on top of bar
    if (this.showValueOnBar) {
      svg.append('g')
          .attr('fill', this.axisLabelColor)
          .attr('text-anchor', 'middle')
        .selectAll('text')
        .data(this.data)
        .join('text')
          .attr('font-size', this.fontSize)
          .attr('x', (d: any) => xScale(d.id))
          .attr('y', (d: any) => yScale(d.value))
          .attr('dx', xScale.bandwidth() / 2)
          .attr('dy', -8)
          .text((d: any) => d.value + this.valueUom);
    }

    // Draw axises
    if (this.showXAxis) {
      svg.append('g').call(xAxis);
    }

    if (this.showYAxis) {
      svg.append('g').call(yAxis);
    }
  }

}
