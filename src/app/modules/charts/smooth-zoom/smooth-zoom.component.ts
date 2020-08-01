import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-smooth-zoom',
  templateUrl: './smooth-zoom.component.html',
  styleUrls: ['./smooth-zoom.component.scss']
})
export class SmoothZoomComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  chartID = '#ZOOM_CHART';

  height = 500;
  width = 500;

  radius = 6;
  step = this.radius * 2;
  theta = Math.PI * (3 - Math.sqrt(5));

  currentTransform: [number, number, number] = [this.width / 2, this.height / 2, this.height];
  data = [];

  constructor() { }

  ngAfterViewInit() {
    this.initData();
    this.draw();
  }

  onResize(event) {
    this.draw();
  }

  initData() {
    this.data = Array.from({length: 2000}, (_, i) => {
      const r = this.step * Math.sqrt(i += 0.5);
      const a = this.theta * i;

      return [
        this.width / 2 + r * Math.cos(a),
        this.height / 2 + r * Math.sin(a)
      ];
    });
  }

  initViewSize() {
    const element = this.chartContainer.nativeElement;

    this.width = element.offsetWidth - 100;
  }

  draw() {
    this.initViewSize();
    const that = this;

    d3.select(this.chartID).select('svg').remove();

    const svg = d3.select(this.chartID)
      .append('svg')
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`)
      .attr('width', this.width)
      .attr('height', this.height)
      .style('min-width', '500px');

    const g = svg.append('g');

    g.selectAll('circle')
      .data(this.data)
      .join('circle')
        .attr('cx', ([x]) => x)
        .attr('cy', ([, y]) => y)
        .attr('r', this.radius)
        .attr('fill', (d, i) => d3.interpolateRainbow(i / 360));

    svg.call(transition);

    function transition() {
      const d: [number, number] = that.data[Math.floor(Math.random() * that.data.length)];
      const zoomViewA: [number, number, number] = that.currentTransform;
      const zoomViewB: [number, number, number] = [d[0], d[1], that.radius * 2 + 1];
      const i = d3.interpolateZoom(zoomViewA, zoomViewB);

      g.transition()
          .delay(250)
          .duration(i.duration)
          .attrTween('transform', () => t => that.transform(that.currentTransform = i(t)))
          .on('end', transition);
    }
  }

  transform([x, y, r]) {
    return `
      translate(${this.width / 2}, ${this.height / 2})
      scale(${this.height / r})
      translate(${-x}, ${-y})
    `;
  }

}
