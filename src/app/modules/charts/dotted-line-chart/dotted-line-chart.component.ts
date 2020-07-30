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
  @Input() lineColor = '#D23231';
  @Input() showDot = false;
  @Input() showGradient = true;

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
    const that = this;
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.bottom - this.margin.top;

    const svg = this.initSvg();

    const xScale = d3.scaleTime()
      .domain(d3.extent(this.data, (d: any) => d.date))
      .range([this.margin.left, this.width - this.margin.right]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, (d: any) => d.value)).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSizeOuter(0))
      .call(axis => axis.select('.domain')
        .attr('stroke', 'rgba(0, 0, 0, 0.48)')
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
      .curve(d3.curveBasis)
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.value));

    const area = d3.area()
      .curve(d3.curveBasis)
      .x((d: any) => xScale(d.date))
      .y0(yScale(d3.min(this.data, (d: any) => d.value)))
      .y1((d: any) => yScale(d.value));

    // Define gradient
    svg.append('defs')
      .html(`
        <linearGradient id="dottedLineChartGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="rgba(219,44,5,0.7)"/>
          <stop offset="35%" stop-color="rgba(210,50,49,0.6)"/>
          <stop offset="95%" stop-color="transparent"/>
        </linearGradient>
      `);

    // Draw line
    if (this.showGradient) {
      svg.append('path')
        .datum(this.data)
        .attr('fill', 'url(#dottedLineChartGradient)')
        .attr('stroke-width', 2)
        .attr('d', area);
    }

    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', this.lineColor)
      .attr('stroke-width', 2)
      .attr('d', line);

    // Draw circle
    const circles = g => g
      .selectAll('circle')
      .data(this.data)
      .join('circle')
        .attr('fill', this.lineColor)
        .attr('stroke', 'none')
        .attr('cx', (d: any) => xScale(d.date))
        .attr('cy', (d: any) => yScale(d.value))
        .attr('r', 4);

    if (this.showDot) {
      svg.append('g').call(circles);
    }

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }

  drawTooltip(svg, xScale, yScale) {
    const that = this;
    svg.append('line').classed('hoverLine', true);
    const circle = svg.append('circle').classed('hoverPoint', true);
    const text = svg.append('text').classed('hoverText', true);

    // svg.on('mousemove', mouseMove);

    function mouseMove() {
      d3.event.preventDefault();
      const mouse = d3.mouse(d3.event.target);
      const [
        xCoord,
        yCoord,
      ] = mouse;

      const mouseDate = xScale.invert(xCoord);
      const mouseDateSnap = d3.timeDay.floor(mouseDate);

      if (xScale(mouseDateSnap) < that.margin.left ||
         xScale(mouseDateSnap) > that.width - that.margin.right) {
        console.log('hell');
        return;
      }

      const bisectDate = d3.bisector((d: any) => d.date).right;
      const xIndex = bisectDate(that.data, mouseDateSnap, 1);
      const mousePopulation = that.data[xIndex].value;

      svg.selectAll('.hoverLine')
        .attr('x1', xScale(mouseDateSnap))
        .attr('y1', that.margin.top)
        .attr('x2', xScale(mouseDateSnap))
        .attr('y2', that.height - that.margin.bottom)
        .attr('stroke', '#147F90')
        .attr('fill', '#A6E8F2')
      ;

      circle
        .attr('cx', xScale(mouseDateSnap))
        .attr('cy', yScale(mousePopulation))
        .attr('r', '7')
        .attr('fill', '#147F90')
      ;

      const isLessThanHalf = xIndex > that.data.length / 2;
      const hoverTextX = isLessThanHalf ? '-0.75em' : '0.75em';
      const hoverTextAnchor = isLessThanHalf ? 'end' : 'start';

      text
        .attr('x', xScale(mouseDateSnap))
        .attr('y', yScale(mousePopulation))
        .attr('dx', hoverTextX)
        .attr('dy', '-1.25em')
        .style('text-anchor', hoverTextAnchor)
        .text(d3.format('.5s')(mousePopulation));
    }
  }

}
