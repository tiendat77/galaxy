import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AAPL, MOCK_DATA } from './mock';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashed-line-chart',
  templateUrl: './dashed-line-chart.component.html',
  styleUrls: ['./dashed-line-chart.component.scss']
})
export class DashedLineChartComponent implements OnInit, AfterViewInit {
  @ViewChild('dashedLineChart') chartContainer: ElementRef;

  @Input() data: any[];
  @Input() title: string;
  @Input() subtitle: string;
  @Input() axisColor = 'rgba(0, 0, 0, 0.68)';

  chartID = '#DASHED_LINE';

  margin = {top: 20, right: 30, bottom: 30, left: 40};
  tooltip = {width: 4, height: 4, x: 10, y: -30};
  width = 800 - this.margin.left - this.margin.right;
  height = 600 - this.margin.top - this.margin.bottom;

  constructor() { }

  ngOnInit(): void {
    this.initData();

    fromEvent(window, 'resize').pipe(
      debounceTime(600)
    ).subscribe((event) => {
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.draw();
  }

  initData() {
    this.data = MOCK_DATA.map(({date, value}) => ({ date: new Date(date), value: +value }));
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
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    const xScale = d3.scaleTime()
      .domain(d3.extent(this.data, (d: any) => d.date))
      .range([this.margin.left, this.width - this.margin.right]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, (d: any) => d.value))
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(
        d3.axisBottom(xScale)
          .tickSizeOuter(0)
      )
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
      );

    const line = d3.line()
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.value));
      // .curve(d3.curveBasis);

    const zoom = d3.zoom()
      .extent([[0, 0], [this.width, this.height]])
      .scaleExtent([1, 8])
      .on('zoom', onZoom);

    const bisector = d3.bisector((d: any) => d.date).left;

    const svg = this.initSvg();

    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke-dasharray', 3)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);

    const tooltip = svg.append('g')
      .style('display', 'none');

    tooltip.append('circle')
      .attr('r', this.tooltip.height);

    tooltip.append('text')
      .attr('x', 15)
      .attr('dy', '1em');

    // svg.append('rect')
    //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    //   .attr('width', this.width)
    //   .attr('height', this.height)
    //   .attr('fill', 'none')
    //   .attr('pointer-events', 'all')
    //   .on('mouseover', () => { tooltip.style('display', ''); })
    //   .on('mouseout', () => { tooltip.style('display', 'none'); })
    //   .on('mousemove', onMouseMove);

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    function onZoom() {
      svg.attr('transform', d3.event.transform);
    }

    function onMouseMove() {
      const mouse = d3.mouse(this);
      const xm = xScale.invert(mouse[0]);
      const ym = yScale.invert(mouse[1]);
      const i1 = bisector(that.data, xm, 1);
      const i0 = i1 - 1;
      tooltip.attr('transform', `translate(${xScale(xm)}, ${yScale(ym)})`);
      tooltip.select('text').text(that.data[i1].value);
    }
  }

}
