import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-line-bar-chart',
  templateUrl: './line-bar-chart.component.html',
  styleUrls: ['./line-bar-chart.component.scss']
})
export class LineBarChartComponent implements OnInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  chartID = '#LINE_BAR_CHART';
  margin = { top: 20, right: 30, bottom: 30, left: 40 };
  width = 500;
  height = 500;

  constructor() { }

  ngOnInit(): void {
    this.initData().then((data) => {
      this.drawBarLine(data);
    });
  }

  initData() {
    return new Promise(resolve => {
      d3.csv('/assets/csv/new-passenger-cars.csv', ({year, efficiency, sales}) => ({
        year: +year,
        efficiency: +efficiency,
        sales: +sales
      })).then(data => {
        const result = Object.assign(data, { y1: '↑ New cars sold', y2: 'Avg. fuel efficiency (mpg) ↑' });
        resolve(result);
      });
    });
  }

  initSvg() {
    const element = this.chartContainer.nativeElement;

    this.width = element.offsetWidth - 100;

    d3.select(this.chartID).selectAll('svg').remove();

    const svg = d3.select(this.chartID)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    return svg;
  }

  drawBarLine(data) {
    const svg = this.initSvg().append('g');

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.year))
      .rangeRound([this.margin.left, this.width - this.margin.right])
      .padding(0.1);

    const yLeftScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d: any) => Number(d.sales))])
      .rangeRound(([this.height - this.margin.bottom, this.margin.top]));

    const yRightScale = d3.scaleLinear()
      .domain(d3.extent(data, (d: any) => Number(d.efficiency)))
      .rangeRound([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(this.width / 40) // TODO
          .tickSizeOuter(0)
      );

    const yLeftAxis = g => g
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .style('color', 'steelblue')
      .call(d3.axisLeft(yLeftScale).ticks(null, 's'))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.append('text')
        .attr('x', -this.margin.left)
        .attr('y', 10)
        .attr('fill', 'black')
        .attr('text-anchor', 'start')
        .text(data.y1)
      );

    const yRightAxis = g => g
      .attr('transform', `translate(${this.width - this.margin.right}, 0)`)
      .call(d3.axisRight(yRightScale))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.append('text')
        .attr('x', this.margin.right)
        .attr('y', 10)
        .attr('fill', 'black')
        .attr('text-anchor', 'end')
        .text(data.y2)
      );

    const line = d3.line()
        .x((d: any) => xScale(d.year) + xScale.bandwidth() / 2)
        .y((d: any) => yRightScale(d.efficiency));

    const zoom = d3.zoom()
      .extent([[0, 0], [this.width, this.height]])
      .scaleExtent([1, 8])
      .on('zoom', onZoom);

    const rects = svg.append('g')
        .attr('fill', 'steelblue')
        .attr('fill-opacity', '0.8')
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('x', (d: any) => xScale(d.year))
        .attr('y', (d: any) => yLeftScale(d.sales))
        .attr('width', xScale.bandwidth())
        .attr('height', (d: any) => yLeftScale(0) - yLeftScale(d.sales));


    svg.append('path')
      .transition()
      .duration(2000)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .attr('d', line(data));

    svg.append('g')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('x', (d: any) => xScale(d.year))
        .attr('y', 0)
        .attr('width', xScale.bandwidth())
        .attr('height', this.height)
      .append('title')
        .text((d: any) => `${d.year}\n${d.sales} new cars sold\n${d.efficiency} mpg average fuel efficiency`);

    svg.append('g').call(xAxis);
    svg.append('g').call(yLeftAxis);
    svg.append('g').call(yRightAxis);
    svg.call(zoom);

    function onZoom() {
      svg.attr('transform', d3.event.transform);
    }
  }

  onResize(event) {

  }

}
