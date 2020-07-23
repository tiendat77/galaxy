import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  data: any[] = [];
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
  }

  initData() {
    d3.csv('/assets/csv/dataset.csv').then((data: any) => {
      this.data = data;
      this.draw();
    });
  }

  draw() {
    const svg = this.initChart();

    this.axis.xAxis = svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(this.scale.xScale));

    this.axis.yAxis = svg.append('g');

    this.updateChart(20);
  }

  updateChart(num: number) {
    const histogram = d3.histogram()
      .value((d: any) => d.price)
      .domain(this.scale.xScale.domain())
      .thresholds(this.scale.xScale.ticks(num));

    const bins = histogram(this.data);
    console.log({bins});

    this.scale.yScale.domain([0, d3.max(bins, d => d.length)]);
    this.axis.yAxis
      .transition()
      .duration(1000)
      .call(d3.axisLeft(this.scale.yScale));

    const u  = d3.select(this.chartID)
      .select('svg')
      .selectAll('rect')
      .data(bins);

    u
      .enter()
      .append('rect')
      .transition()
      .duration(1000)
        .attr('x', 1)
        .attr('width', d => (this.scale.xScale(d.x1) - this.scale.xScale(d.x0) - 1))
        .attr('height', d => this.height - this.scale.yScale(d.length))
        .attr('transform', d => `translate(${this.margin.left + this.scale.xScale(d.x0)}, ${this.margin.top + this.scale.yScale(d.length)})`)
        .style('fill', '#69b3a2');

    u.exit().remove();
  }

  initChart() {
    const svg = d3.select(this.chartID)
      .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.scale.xScale = d3.scaleLinear()
    .domain([0, 1000])
    .range([0, this.width]);

    this.scale.yScale = d3.scaleLinear()
      .range([this.height, 0]);

    return svg;
  }

}
