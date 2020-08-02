import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MOCK_DATA } from './mock';
import * as d3 from 'd3';

@Component({
  selector: '[kpiPieChart]',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pieChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() axisCorlor = 'rgba(255, 255, 255, 0.68)';
  @Input() textColor = 'rgba(255, 255, 255, 0.78)';
  @Input() valueColor = '#05F6FF';
  @Input() colors = ['#4285F4', '#EA4335', '#34A853', '#FBBC04', '#FA7B17', '#F53BA0', '#A142F4', '#9B82FA', '#BB00FF', '#5719F8' ];
  @Input() arcPadding = 0.05;
  @Input() conerRadius = 0;
  @Input() innerRadius = 0;
  @Input() labelHeight = 15;
  @Input() fontSize = '1.3em';
  @Input() valueUom = 'pcs';
  @Input() showValueOnChart = false;

  chartId = 'PIE_CHART';
  width = 500;
  height = 500;
  margin = { top: 40, bottom: 0, left: 30, right: 20 };
  colorScale;

  isPieHover = false;

  resizeSub: Subscription;

  constructor() {
    this.chartId = this.initID();
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
    const rand = () => Math.floor(1000 + (9999 - 1000) * Math.random());

    return 'PIE_CHART_' + rand() + '_' + rand();
  }

  initData() {
    this.data = MOCK_DATA.slice();
    this.colorScale = this.initColorScale();
  }

  initColorScale() {
    return d3.scaleOrdinal(this.colors)
      .domain(this.data.map(d => d.id));
  }

  initSvg() {
    d3.select('#' + this.chartId)
      .selectAll('svg')
      .remove();

    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;
      this.width = element.parentNode.clientWidth;
      this.height = element.parentNode.clientHeight;

      // this.width = element.clientWidth;
      // this.height = element.clientHeight;

      this.fontSize = this.width * 0.9 / (600) + 'em';
    }

    const svg = d3.select('#' + this.chartId)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    svg.append('defs')
      .html(`<filter id="pieChartDropshadow" x="-1" y="-3" width="120" height="185" > <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4" /> <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.88 0 0 0 0 0 0.85 0 0 0 0 0 0.85 0 0 0 0 0 0.36 0" /> <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="8" /> <feBlend in="SourceGraphic" in2="blurOut" mode="normal" /> </filter>`);

    return svg;
  }

  draw() {
    const that = this;
    const svg = this.initSvg();

    const isHorizontal = getHorizontalDirection();
    const width = calcWidth(isHorizontal);
    const height = calcHeight(isHorizontal);
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
    const translateX = isHorizontal ? (this.width / 4) : (width / 2 + this.margin.left);
    const translateY = isHorizontal ? (this.height / 2) : (height / 2);

    svg.append('g')
        .attr('transform', `translate(${translateX}, ${translateY})`)
      .selectAll('path')
      .data(pieArcs)
      .join('path')
        .style('fill', (d: any) => this.colorScale(d.data.id))
        .attr('class', 'arc')
        .attr('d', arc)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut);

    // Draw value
    if (this.showValueOnChart) {
      const text = svg.append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
        .selectAll('text')
        .data(pieArcs)
        .join('text')
          .style('fill', this.textColor)
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
          .style('font-size', this.fontSize)
          .style('font-weight', (d, i) => i ? undefined : 'bold')
          .style('fill', '#222')
          .attr('dy', (d, i) => i ? '1.2em' : 0)
          .text(d => d);
    }

    // Draw seperator line
    if (false) {
      svg.append('line')
      .attr('x1', isHorizontal ? width : this.labelHeight)
      .attr('x2', isHorizontal ? width : Math.abs(this.width - this.labelHeight))
      .attr('y1', isHorizontal ? this.labelHeight : height)
      .attr('y2', isHorizontal ? Math.abs(this.height - this.labelHeight) : height)
      .style('stroke', '#474B52')
      .style('stroke-width', 1);
    }

    // Draw legend
    const legendPadding = 1.8;
    const legendTextWidth = width * 0.35;

    const legendGroup = svg.append('g');

    const legend = legendGroup.selectAll('g')
      .data(pieArcs)
      .join('g')
      .attr('id', (d, i) => `legend${i}`)
      .attr('class', 'legend');

    legend.append('rect')
        .attr('x', 0)
        .attr('y', (d: any) => this.labelHeight * d.index * legendPadding)
        .attr('width', this.labelHeight)
        .attr('height', this.labelHeight)
        .attr('fill', (d: any) => this.colorScale(d.data.id))
        .attr('stroke', 'grey')
        .attr('strole-width', '1px');

    legend.append('text')
      .attr('x', this.labelHeight * legendPadding)
      .attr('y', (d: any) => this.labelHeight * d.index * legendPadding + this.labelHeight)
      .attr('text-anchor', 'start')
      .style('fill', this.textColor)
      .style('font-size', this.fontSize)
      .text((d: any) => d.data.id)
      .each(wrap)
      .append('title')
        .text((d: any) => `${d.data.id}: ${d.data.value} ${this.valueUom}`);

    legend.append('text')
      .attr('x', width - this.margin.right)
      .attr('y', (d: any) => this.labelHeight * d.index * legendPadding + this.labelHeight)
      .attr('text-anchor', 'end')
      .style('color', this.textColor)
      .style('font-size', this.fontSize)
      .style('fill', this.valueColor)
      .text((d: any) => d.data.value + ' ' + this.valueUom);

    legendGroup.call(g => {
      const legendHeight = g.node().getBBox().height;
      const legendX = isHorizontal ? (width + that.margin.left) : (that.margin.left);
      const legendY = isHorizontal ? ((that.height - legendHeight) / 2) : (height + (height - legendHeight) / 2);
      g.attr('transform', `translate(${legendX}, ${legendY})`);
    });

    function getHorizontalDirection(): boolean {
      if (that.width < 550) {
        return false;

      } else {
        return true;
      }
    }

    function calcWidth(horizontal?: boolean): number {
      if (!horizontal) {
        return (that.width - that.margin.left - that.margin.right);
      }

      return (that.width - that.margin.left - that.margin.right) / 2;
    }

    function calcHeight(horizontal?: boolean): number {
      if (!horizontal) {
        return (that.height - that.margin.top - that.margin.bottom) / 2;
      }

      return (that.height - that.margin.top - that.margin.bottom);
    }

    function onMouseOver(d, i) {
      that.isPieHover = true;
      const self = d3.select(this);
      self.style('filter', 'url("#pieChartDropshadow")');

      svg.selectAll('.arc').style('opacity', 0.1);
      svg.selectAll('.legend').style('opacity', 0.1);

      svg.select(`#legend${i}`).style('opacity', 1);
      self.style('opacity', 1);
    }

    function onMouseOut() {
      const self = d3.select(this);
      self.style('filter', 'none');
      that.isPieHover = false;


      setTimeout(() => {
        if (!that.isPieHover) {
          svg.selectAll('.arc').style('opacity', 1);
          svg.selectAll('.legend').style('opacity', 1);
        }
      }, 500);
    }

    function wrap() {
      const self = d3.select(this);
      let textLength = self.node().getComputedTextLength();
      let text = self.text();

      while (textLength > (legendTextWidth) && text.length > 0) {
          text = text.slice(0, -1);
          self.text(text + '...');
          textLength = self.node().getComputedTextLength();
      }
    }
  }
}
