import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MOCK_DATA } from './mock';

import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('lineChartContainer') chartContainer: ElementRef;

  @Input() data: any[];
  @Input() axisLabelColor = 'rgba(255, 255, 255, 0.68)';
  @Input() axisColor = 'rgba(250, 250, 250, 0.4)';
  @Input() gradientColors: string[] = ['rgba(124,209,119,0.5)', 'rgba(45,71,141,0.2)', 'transparent'];
  @Input() lineColor = '#7cd177';
  @Input() dashedLine = false;
  @Input() showYAxisLabel = true;
  @Input() showXAxisLabel = true;
  @Input() showDot = false;
  @Input() showGradient = true;
  @Input() showTooltip = true;

  chartID = 'LINE_CHART';
  margin = { top: 20, right: 16, bottom: 30, left: 40 };
  width = 800 - this.margin.left - this.margin.right;
  height = 600 - this.margin.top - this.margin.bottom;

  resizeSub: Subscription;

  constructor() {
    this.chartID = this.initID();
  }

  ngOnInit(): void {
    this.initData();
    this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
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
    const rand = () => Math.floor(1000 + (9999 - 1000) * Math.random());

    return 'LINE_CHART_' + rand() + '_' + rand();
  }

  initData() {
    this.data = MOCK_DATA.map(({date, value}) => ({ date: d3.timeParse('%Y-%m-%d')(date), value: +value }));
  }

  initSvg() {
    d3.select('#' + this.chartID)
      .select('svg')
      .remove();

    const element = this.chartContainer.nativeElement;

    this.width = element.offsetWidth;
    this.height = element.offsetHeight;

    // this.width = element.parentNode.clientWidth;
    // this.height = element.parentNode.clientHeight;

    const svg = d3.select('#' + this.chartID)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    return svg;
  }

  draw() {
    const that = this;
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
      .call(axis => axis.selectAll('line').remove())
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisLabelColor)
        .attr('font-size', '1.3em')
      );

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.selectAll('line').remove())
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisLabelColor)
        .attr('font-size', '1.3em')
      );

    if (!this.showXAxisLabel) {
      xAxis.call(axis => axis.selectAll('text').remove());
    }

    if (!this.showYAxisLabel) {
      yAxis.call(axis => axis.selectAll('text').remove());
    }

    const line = d3.line()
      .curve(d3.curveCatmullRom.alpha(0.25))
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.value));

    const area = d3.area()
      .curve(d3.curveCatmullRom.alpha(0.25))
      .x((d: any) => xScale(d.date))
      .y0(yScale(d3.min(this.data, (d: any) => d.value)))
      .y1((d: any) => yScale(d.value));

    // Define gradient
    svg.append('defs')
      .html(`
        <linearGradient id="dottedLineChartGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="${this.gradientColors[0]}"/>
          <stop offset="100%" stop-color="${this.gradientColors[1]}"/>
        </linearGradient>
      `);

    // Draw line
    if (this.showGradient) {
      svg.append('path')
        .datum(this.data)
        .attr('fill', 'url(#dottedLineChartGradient)')
        .attr('stroke-width', 1)
        .attr('d', area);
    }

    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', this.lineColor)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', this.dashedLine ? 3 : 0)
      .attr('d', line);

    // Draw circle
    if (this.showDot) {
      svg.append('g')
        .selectAll('circle')
        .data(this.data)
        .join('circle')
          .attr('fill', this.lineColor)
          .attr('stroke', 'none')
          .attr('cx', (d: any) => xScale(d.date))
          .attr('cy', (d: any) => yScale(d.value))
          .attr('r', 4);
    }

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // TOOLTIP
    const bisect = d3.bisector((d: any) => d.date).left;

    function mouseX(mx) {
      const date = xScale.invert(mx);
      const index = bisect(that.data, date, 1);
      const a = that.data[index - 1];
      const b = that.data[index];
      return b && (date.getTime() - a.date.getTime() > b.date.getTime() - date.getTime()) ? b : a;
    }

    const tooltip = svg.append('g')
        .attr('id', 'lineChartTooltip')
        .style('pointer-events', 'none')
        .style('visibility', 'hidden');

    if (this.showTooltip) {
      tooltip.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', '7')
        .attr('fill', '#147F90');

      svg.on('mousemove', onMouseMove);
      svg.on('mouseout', onMouseOut);
    }

    function onMouseMove() {
      const { date, value } = mouseX(d3.mouse(this)[0]);

      tooltip
        .style('visibility', 'visible')
        .attr('transform', `translate(${xScale(date)},${yScale(value)})`);
    }

    function onMouseOut() {
      tooltip.style('visibility', 'hidden')
        .attr('transform', 'translate(0, 0)');
    }
  }

}
