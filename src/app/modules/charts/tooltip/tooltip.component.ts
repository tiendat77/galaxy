import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  chartID = '#TOOLTIP';
  height = 500;
  width = 500;

  radius = 6;
  step = this.radius * 2;
  theta = Math.PI * (3 - Math.sqrt(5));

  constructor() { }

  ngAfterViewInit(): void {
    this.drawCicles();
  }

  drawCircle() {
    this.initTooltip();
    const svg = this.initSvg();

    svg.append('g')
      .append('circle')
      .attr('id', 'circle')
      .attr('r', 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      .style('fill', '#1565c0');
  }

  drawCicles() {
    const that = this;
    this.initStyle();
    const data = this.initData(1000);
    const svg = this.initSvg();
    const tooltip = this.initTooltip();

    const circles = svg.append('g')
      .attr('class', 'circles');

    circles.selectAll('circle')
      .data(data)
      .join('circle')
        .attr('cx', ([x]) => x)
        .attr('cy', ([, y]) => y)
        .attr('r', this.radius)
        .attr('fill', (d, i) => d3.interpolateRainbow(i / 360))
        .on('mousedown', onMouseDown)
        .on('mouseover', showTooltip)
        .on('mousemove', onMouseMove)
        .on('mouseout', hideTooltip);

    circles.exit().remove();

    function onMouseDown() {
      d3.select(this)
        .transition()
          .attr('fill', 'black')
          .attr('r', that.radius * 2)
        .transition()
          .attr('fill', (d, i) => d3.interpolateRainbow(i / 360))
          .attr('r', that.radius);
    }

    function onMouseMove() {
      return tooltip
        .style('top', (d3.event.pageY - 10) + 'px')
        .style('left', (d3.event.pageX + 16) + 'px');
    }

    function showTooltip(d, i) {
      return tooltip
        .style('visibility', 'visible')
        .text(`I'm circle ${i}`);
    }

    function hideTooltip() {
      return tooltip.style('visibility', 'hidden');
    }

    const zoom = d3.zoom()
      .extent([[0, 0], [this.width, this.height]])
      .scaleExtent([1, 8])
      .on('zoom', onZoom);

    function onZoom() {
      circles.attr('transform', d3.event.transform);
    }

    svg.call(zoom);
  }

  initTooltip() {
    d3.select('#chartTooltip').remove();

    const tooltip = d3.select('body')
      .append('div')
      .attr('id', 'chartTooltip')
      .attr('class', 'chart-tooltip')
      .style('visibility', 'hidden');

    return tooltip;
  }

  initSvg() {
    d3.select(this.chartID)
      .select('svg')
      .remove();

    const element = this.chartContainer.nativeElement;

    this.width = element.offsetWidth - 100;
    this.height = element.offsetHeight - 100;

    const svg = d3.select(this.chartID)
      .append('svg')
      .attr('height', this.height)
      .attr('width', this.width)
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    return svg;
  }

  initStyle() {
    const svg = d3.select(this.chartID)
      .select('svg')
      .append('style')
      .text(`
        .circles {
          stroke: transparent;
          stroke-width: 1.5px;
        }
        .circles circle:hover {
          stroke: black;
        }
      `);
  }

  initData(length: number): number[][] {
    const data = Array.from({length}, (_, i) => {
      const radius = this.step * Math.sqrt(i += 0.5);
      const a = this.theta * i;

      return [
        this.width / 2 + radius * Math.cos(a),
        this.height / 2 + radius * Math.sin(a)
      ];
    });

    return data;
  }

  onResize(event) {
    this.drawCicles();
  }

  updateSvg() {
    const element = this.chartContainer.nativeElement;

    this.width = element.offsetWidth - 100;
    this.height = element.offsetHeight - 100;

    d3.select(this.chartID)
      .select('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

}
