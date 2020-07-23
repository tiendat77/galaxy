import { Component, OnInit } from '@angular/core';

import {Delaunay} from 'd3-delaunay';
import * as d3 from 'd3';

@Component({
  selector: 'app-zoom-xy',
  templateUrl: './zoom-xy.component.html',
  styleUrls: ['./zoom-xy.component.scss']
})
export class ZoomXYComponent implements OnInit {

  chartID = '#ZOOM_CHART';

  data = [];

  width = 500;
  height = 500;

  constructor() { }

  ngOnInit(): void {
    this.initData();
    this.draw();
  }

  initData() {
    this.data = Array.from({length: 100}, () => [100 * Math.random(), Math.random()]);
  }

  draw() {
    const that = this;
    const svg = d3.select(this.chartID).append('svg')
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`)
      .style('min-width', '500px');

    const xScale = d3.scaleLinear()
      .domain(d3.extent(this.data, d => d[0]))
      .range([30, this.width - 10])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, d => d[0]))
      .range([this.height - 20, 10])
      .nice();

    const xAxis = (g, scale) => g
      .attr('transform', `translate(0, ${yScale(0)})`)
      .call(d3.axisBottom(scale).ticks(12));

    const yAxis = (g, scale) => g
      .attr('transform', `translate(${xScale(0)}, 0)`)
      .call(d3.axisLeft(scale).ticks(12 * (this.height / this.width)))
      .call(gg => gg.select('.domain').attr('display', 'none'));

    const vo = svg.append('path');
    const gx = svg.append('g');
    const gy = svg.append('g');

    const dots = svg.append('g')
      .selectAll('ellipse')
      .data(this.data)
      .join('ellipse')
        // tslint:disable-next-line: no-bitwise
        .attr('fill', () => d3.schemeOranges[9][Math.random() * 9 | 0]);

    // z holds a copy of the previous transform, so we can track its changes
    let z = d3.zoomIdentity;

    const zoomX = d3.zoom().scaleExtent([0.1, 10]);
    const zoomY = d3.zoom().scaleExtent([0.2, 5]);
    const tx = () => d3.zoomTransform(gx.node());
    const ty = () => d3.zoomTransform(gy.node());

    gx.call(zoomX).attr('pointer-events', 'none');
    gy.call(zoomY).attr('pointer-events', 'none');

    const zoom = d3.zoom().on('zoom', onZoom);

    svg
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity.scale(0.8));

    function onZoom() {
      const e = d3.event;
      const t = e.transform;
      const k = t.k / z.k;
      const point = e.sourceEvent ? d3.mouse(this) : [that.width / 2, that.height / 2];

      // is it on an axis? is the shift key pressed?
      const doX = point[0] > xScale.range()[0];
      const doY = point[1] < yScale.range()[0];
      const shift = e.sourceEvent && e.sourceEvent.shiftKey;

      if (k === 1) {
        // pure translation?
        doX && gx.call(zoomX.translateBy, (t.x - z.x) / tx().k, 0);
        doY && gy.call(zoomY.translateBy, 0, (t.y - z.y) / ty().k);
      } else {
        // if not, we're zooming on a fixed point
        doX && gx.call(zoomX.scaleBy, shift ? 1 / k : k, point);
        doY && gy.call(zoomY.scaleBy, k, point);
      }

      z = t;

      redraw();
    }

    function redraw() {
      const xr = tx().rescaleX(xScale);
      const yr = ty().rescaleY(yScale);

      gx.call(xAxis, xr);
      gy.call(yAxis, yr);

      dots
        .attr('cx', d => xr(d[0]))
        .attr('cy', d => yr(d[1]))
        .attr('rx', 6 * Math.sqrt(tx().k))
        .attr('ry', 6 * Math.sqrt(ty().k));

      vo.attr(
        'd',
        Delaunay.from(that.data.map(d => [xr(d[0]), yr(d[1])]))
          .voronoi([35, 0, that.width, that.height - 25])
          .render()
      )
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 0.5);
    }
  }

}
