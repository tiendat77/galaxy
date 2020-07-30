import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MOCK_DATA } from './mock';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() title: string;
  @Input() subtitle: string;
  @Input() axisCorlor = 'rgba(0, 0, 0, 0.68)';
  @Input() textColor = 'rgba(0, 0, 0, 0.78)';
  @Input() arcPadding = 0;
  @Input() conerRadius = 0;
  @Input() innerRadius = 0;
  @Input() showValueOnChart = false;
  @Input() labelHeight = 38;
  @Input() uom = 'pcs';

  chartId = '#PIE_CHART';
  width = 500;
  height = 500;
  margin = { top: 40, bottom: 0, left: 30, right: 30 };
  colors = ['#9B82FA', '#BB00FF', '#5719F8', '#4285F4', '#EA4335', '#34A853', '#FBBC04', '#FA7B17', '#F53BA0', '#A142F4', '#24C1E0' ];

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
    this.data = MOCK_DATA.slice();
  }

  initColorScale() {
    return d3.scaleOrdinal(this.colors)
      .domain(this.data.map(d => d.id));
  }

  initSvg() {
    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;
      this.width = element.offsetWidth - this.margin.right - this.margin.left;
      this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    }

    d3.select(this.chartId)
      .selectAll('svg')
      .remove();

    const svg = d3.select(this.chartId)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    return svg;
  }

  draw() {
    const svg = this.initSvg();

    const colorScale = this.initColorScale();

    const width = (this.width - this.margin.left - this.margin.right) / 2;
    const height = (this.height - this.margin.top - this.margin.bottom);
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc()
      .innerRadius( 0.5 * radius)
      .outerRadius( 0.85 * radius)
      .cornerRadius(this.conerRadius);

    const pie = d3.pie()
      .padAngle(this.arcPadding)
      .value((d: any) => d.value);

    const labelArcs = d3.arc()
      .innerRadius( 0.95 * radius)
      .outerRadius( 0.95 * radius);

    const pieArcs: any = pie(this.data);

    // Draw pie
    svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('path')
      .data(pieArcs)
      .join('path')
        .style('fill', (d: any) => colorScale(d.data.id))
        .attr('d', arc);

    // Draw value
    if (this.showValueOnChart) {
      const text = svg.append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
        .selectAll('text')
        .data(pieArcs)
        .join('text')
          .style('color', this.textColor)
          .attr('transform', (d: any) => `translate(${labelArcs.centroid(d)})`)
          .attr('text-anchor', 'middle');

      text.selectAll('tspan')
        .data((d: any) => [
          d.data.id,
          d.data.value.toFixed(1)
        ])
        .join('tspan')
          .attr('x', 0)
          .style('font-family', 'sans-serif')
          .style('font-size', 12)
          .style('font-weight', (d, i) => i ? undefined : 'bold')
          .style('fill', '#222')
          .attr('dy', (d, i) => i ? '1.2em' : 0)
          .text(d => d);
    }

    // Draw seperator line
    svg.append('line')
      .attr('x1', width)
      .attr('x2', width)
      .attr('y1', 10)
      .attr('y2', height - 10)
      .style('stroke', 'rgba(0, 0, 0, 0.38)')
      .style('stroke-width', 1);

    // Draw legend
    const legendPadding = 1.8;
    const legendHeight = this.data.length * (this.labelHeight * legendPadding);
    const legendTextWidth = width * 0.5;

    const legend = svg.append('g')
      .attr('transform', `translate(${width + this.margin.left + this.margin.right}, ${(height - legendHeight) / 2 + this.margin.top})`);

    legend.append('g')
      .selectAll('rect')
      .data(pieArcs)
      .join('rect')
        .attr('x', 0)
        .attr('y', (d: any) => this.labelHeight * d.index * legendPadding)
        .attr('width', this.labelHeight)
        .attr('height', this.labelHeight)
        .attr('fill', (d: any) => colorScale(d.data.id))
        .attr('stroke', 'grey')
        .attr('strole-width', '1px');

    legend.append('g')
      .selectAll('text')
      .data(pieArcs)
      .join('text')
        .attr('x', this.labelHeight * legendPadding)
        .attr('y', (d: any) => this.labelHeight * d.index * legendPadding + this.labelHeight)
        .attr('text-anchor', 'start')
        // .attr('alignment-baseline', 'middle')
        .style('fill', this.textColor)
        .style('font-size', `${this.labelHeight}px`)
        .text((d: any) => truncateText(d.data.id))
        .append('title')
          .text((d: any) => `${d.data.id}: ${d.data.value} ${this.uom}`);

    legend.append('g')
      .selectAll('text')
      .data(pieArcs)
      .join('text')
        .attr('x', width - this.margin.right)
        .attr('y', (d: any) => this.labelHeight * d.index * legendPadding + this.labelHeight)
        .attr('text-anchor', 'end')
        .style('color', this.textColor)
        .style('font-size', `${this.labelHeight}px`)
        .style('fill', '#1E7A82')
        .text((d: any) => d.data.value + ' ' + this.uom);

    function truncateText(text: string) {
      
      return '';
    }
  }

}
