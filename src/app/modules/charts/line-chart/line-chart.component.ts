import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  data;
  chartID = '#LINE_CHART';

  margin = {top: 10, right: 20, bottom: 30, left: 40};
  height = 600;
  width = 800;

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    d3.csv('/assets/csv/aapl.csv', ({date, close}) => ({date: new Date(date), value: +close})).then((data) => {
      this.data = data;
      this.draw();
    });
  }

  draw() {
    const svg = d3.select(this.chartID)
      .append('svg')
      .attr('height', this.height)
      .attr('width', this.width);

    const x = d3.scaleTime()
      .domain([new Date('2007-04-23'), new Date('2012-05-01')])
      .range([this.margin.left, this.width - this.margin.right]);

    const y = d3.scaleLinear()
      .domain([0, 660])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(x).ticks(this.width / 80).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(h => h.select('.domain').remove())
      .call(h => h.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('$ Close'));

    const line = d3.line()
      .defined((d: any) => !isNaN(d.value))
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.value));

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
      .attr('d', line);
  }

}
