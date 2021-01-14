import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as jstat from 'jstat';
import * as d3 from 'd3';

import MOCK from './mock';

@Component({
  selector: 'app-gaussian-chart',
  templateUrl: './gaussian-chart.component.html',
  styleUrls: ['./gaussian-chart.component.scss']
})
export class GaussianChartComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('gaussianChartContainer') chartContainer: ElementRef;

  @Input() min: number;
  @Input() max: number;
  @Input() mean: number;
  @Input() stdev: number;
  @Input() sample: number;
  @Input() histogram: any[] = [];
  @Input() interval = 0.05;

  // colors
  @Input() lineColor = '#fd372e';
  @Input() tickColor = '#464646';
  @Input() barFillColor = '#4db1ff';
  @Input() barStrokeColor = '#2186d4';

  // text
  @Input() xLabel = 's';
  @Input() yLabel;

  // options
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showXAxisTick = true;
  @Input() showYAxisTick = true;
  @Input() showXGrid = true;
  @Input() showYGrid = false;
  @Input() showTooltip = false;

  chartID = 'GAUSSIAN_CHART_';
  chartControl;
  fontSize = '1.3em';

  margin = { top: 30, right: 30, bottom: 30, left: 60 };
  width = 800;
  height = 600;

  resizeSub: Subscription;

  isNoData$ = new BehaviorSubject(false);

  constructor( ) {
    this.chartID = this.generateID();
  }

  ngOnInit(): void {
    this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
      this.draw();
    });

    // TODO: remove
    this.mock();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) { return; }

    if (changes.stdev) {
      if (this.stdev === null || this.stdev === undefined) {
        return this.isNoData$.next(true);
      }
    }

    setTimeout(() => this.draw(), 500);
  }

  ngOnDestroy(): void {
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
  }

  generateID(prefix = 'GAUSSIAN_CHART_') {
    const rand = () => Math.floor(1000 + (9999 - 1000) * Math.random());

    return prefix + rand() + '_' + rand();
  }

  /////////////// DRAW CHART ///////////////
  draw() {
    if (this.stdev === null || this.stdev === undefined) {
      return this.isNoData$.next(true);
    }

    if (!this.chartContainer) {
      return;
    }

    this.isNoData$.next(false);

    const that = this;
    const chartID = '#' + this.chartID;

    this.clear(); // remove old chart before draw new one
    this.calcSvgSize(); // calc with-height assign to global varriables

    const svg = d3.select(chartID)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', zoomed);

    const defs = svg.append('defs')
      .html(`
        <filter id="barChartLighten">
          <feComponentTransfer>
            <feFuncR type="linear" slope="2" />
            <feFuncG type="linear" slope="2" />
            <feFuncB type="linear" slope="2" />
          </feComponentTransfer>
        </filter>
      `);

    const chartTooltip = d3.select(chartID)
        .append('div')
          .attr('class', 'gaussian-chart-tooltip')
          .call(styleTooltip);

    const chartGridLine = svg.append('g')
      .attr('class', 'gaussian-chart-grid');

    const chartXAxisTop = svg.append('g')
      .attr('class', 'gaussian-chart-x-axis-top');

    const chartXAxisBottom = svg.append('g')
      .attr('class', 'gaussian-chart-x-axis-bottom');

    const chartYAxis = svg.append('g')
      .attr('class', 'gaussian-chart-y-axis');

    const chartHistogram = svg.append('g')
      .attr('class', 'gaussian-chart-histogram');

    const chartGraphical = svg.append('g')
      .attr('class', 'gaussian-chart-graphical');

    const chartHistogramOverlay = svg.append('g')
      .attr('class', 'gaussian-chart-histogram-overlay');

    const chartYLabel = svg.append('g')
      .attr('class', 'gaussian-chart-y-label');

    const chartXLabel = svg.append('g')
      .attr('class', 'gaussian-chart-x-label');

    const formatValue = d3.format('.2f');

    const dataset = this.generateDataset(this.mean, this.stdev, this.interval);
    const histogram = this.histogram

    const domain = histogram.map(d => d.x0);
    const min = this.min ? this.min : d3.min(histogram, (d) => d.x0);
    const max = this.max ? this.max : d3.max(histogram, (d) => d.x1);

    console.log({ mean: this.mean, stdev: this.stdev, sample: dataset.length, histogram, domain });

    drawGaussianCurve();
    drawHistogram();

    chartXLabel.append('text')
      .attr('x', that.width - that.margin.right + 10)
      .attr('y', that.height - that.margin.bottom)
      .attr('text-anchor', 'start')
      .attr('fill', getColor(that.tickColor, 0.68))
      .text(that.xLabel);

    function drawGaussianCurve() {
      const tickValues = [-3, -2, -1, 0, 1, 2, 3].map(sigma => {
        return that.mean + sigma * that.stdev;
      });

      const xScale = d3.scaleLinear()
        .domain([min, max])
        .range([that.margin.left, that.width - that.margin.right]);

      const yScale = d3.scaleLinear()
        .domain([d3.min(dataset, (d) => d.y), d3.max(dataset, (d) => d.y)])
        .range([that.height - that.margin.bottom, that.margin.top]);

      const line = d3.line() // create line chart
        .curve(d3.curveMonotoneX)
        .x((d: any) => xScale(d.x))
        .y((d: any) => yScale(d.y));

      chartXAxisTop
        .attr('transform', `translate(0, 0)`)
        .call(d3.axisBottom(xScale)
          .tickValues(tickValues)
          .tickFormat((d: any, i) => formatAxisTop(i))
        )
        .call(styleXAxisTop);

      chartGraphical.append('path')
        .datum(dataset)
        .call(styleLine)
        .attr('d', line);

      if (that.showXGrid) {
        const tickSize = -(that.height - that.margin.top - that.margin.bottom);

        chartGridLine.append('g')
          .attr('class', 'x-grid')
          .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
          .call(d3.axisBottom(xScale)
            .tickSize(tickSize)
            .tickValues(tickValues)
            .tickFormat(d => '')
          )
          .call(styleGridLine);
      }
    }

    function drawHistogram() {
      const barPadding = 1;

      const xScale = d3.scaleLinear()
        .domain([min, max])
        .range([that.margin.left, that.width - that.margin.right]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(histogram, (d: any) => d.length)])
        .range([that.height - that.margin.bottom, that.margin.top])
        .nice();

      const accessor = d => d.length;

      chartHistogram
        .attr('fill', that.barFillColor)
        .selectAll('rect')
        .data(histogram)
        .join('rect')
          .attr('id', (d, i) => `rect_${i}`)
          .attr('x', (d: any) => xScale(d.x0) + barPadding / 2)
          .attr('y', (d: any) => yScale(accessor(d)))
          .attr('width', (d: any) => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
          .attr('height', (d: any) => yScale(0) - yScale(accessor(d)))
        .attr('stroke', that.barStrokeColor)
        .attr('stroke-width', 2);

      chartHistogramOverlay
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .selectAll('rect')
        .data(histogram)
        .join('rect')
          .attr('x', (d: any) => xScale(d.x0) + barPadding / 2)
          .attr('y', (d: any) => yScale(accessor(d)))
          .attr('width', (d: any) => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
          .attr('height', (d: any) => yScale(0) - yScale(accessor(d)))
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut);

      chartXAxisBottom
        .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
        .call(d3.axisBottom(xScale)
          .tickValues(domain)
        )
        .call(styleXAxisBottom);

      chartYAxis
        .attr('transform', `translate(${that.margin.left}, 0)`)
        .call(d3.axisLeft(yScale)
          .tickSizeOuter(0)
        )
        .call(styleYAxis);

      function onMouseOver(d, i) {
        svg.select('#rect_' + i)
          .attr('filter', 'url(#barChartLighten)');

        chartTooltip.html(`
          <div style="position: absolute;
            bottom: -12px;
            right: unset;
            left: calc(50% - 6px);
            border-width: 6px;
            border-style: solid;
            border-color: rgba(0,0,0,0.8) transparent transparent transparent;">
          </div>
          <table>
            <tr>
              <td style="padding: 0;">Range:</td>
              <td style="padding: 0 0 0 4px; text-align: right;">
                ${formatValue(d.x0)} - ${formatValue(d.x1)} (s)
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; padding: 0;">
                ${formatValue(d.length)}
              </td>
            </tr>
          </table>
        `);

        const x =  xScale(d.x0) +  Math.max(0, xScale(d.x1) - xScale(d.x0)) / 2;
        const y = yScale(accessor(d));

        chartTooltip
          .style('transform', `translate(calc( -50% + ${x}px), calc(-100% + ${y}px))`)
          .style('display', 'block');
      }

      function onMouseOut(d, i) {
        svg.select('#rect_' + i)
          .attr('filter', null);

        chartTooltip.style('display', 'none');
      }
    }

    // Util functions
    function styleTooltip(selection: d3.Selection<HTMLElement, unknown, HTMLElement, any>) {
      selection
        .style('position', 'absolute')
        .style('top', '-12px')
        .style('left', '0')
        .style('display', 'none')
        .style('pointer-events', 'none')
        .style('background', 'rgba(0,0,0,0.8)')
        .style('border', 'none')
        .style('color', 'white')
        .style('text-align', 'start')
        .style('border-radius', '8px')
        .style('padding', '8px')
        .style('font-size', '12px')
        .style('line-height', '16px')
        .style('white-space', 'nowrap')
        .style('box-sizing', 'border-box')
        .style('transition', 'transform 0.25s');
    }

    function styleLegend(selection: d3.Selection<HTMLElement, unknown, HTMLElement, any>) {
      selection
        .style('width', '100%');
    }

    function styleLine(selection: d3.Selection<SVGPathElement, unknown, HTMLElement, any>) {
      selection
        .attr('fill', 'none')
        .attr('stroke', that.lineColor)
        .attr('stroke-width', 2);
    }

    function styleXAxisTop(selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>) {
      const textColor = getColor(that.tickColor, 0.68);

      selection
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('line').remove())
        .call(g => g.selectAll('text')
          .attr('class', 'font-number')
          .attr('fill', textColor)
          .attr('font-size', that.fontSize)
        );

      if (!that.showXAxisTick) {
        selection.call(g => g.selectAll('text').remove());
      }
    }

    function styleXAxisBottom(selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>) {
      const domainColor = getColor(that.tickColor, 0.4);
      const textColor = getColor(that.tickColor, 0.68);

      selection
        .call(g => g.select('.domain')
          .attr('stroke', domainColor)
        )
        .call(g => g.selectAll('text')
          .attr('class', 'font-number')
          .attr('fill', textColor)
          .attr('font-size', that.fontSize)
        )
        .call(g => g.selectAll('line').remove());

      if (!that.showXAxisTick) {
        selection.call(g => g.selectAll('text').remove());
      }
    }

    function styleYAxis(selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>) {
      const domainColor = getColor(that.tickColor, 0.4);
      const textColor = getColor(that.tickColor, 0.68);

      selection
        .call(g => g.select('.domain')
          .attr('stroke', domainColor)
        )
        .call(g => g.selectAll('line')
          .attr('stroke', domainColor)
        )
        // .call(g => g.selectAll('text').remove());
        .call(g => g.selectAll('text')
          .attr('class', 'font-number')
          .attr('fill', textColor)
          .attr('font-size', that.fontSize)
        );

      if (!that.showYAxisTick) {
        selection.call(g => g.selectAll('text').remove());
      }
    }

    function styleGridLine(selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>) {
      selection
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('line')
          .style('stroke', getColor(that.tickColor, 0.12))
          .style('stroke-opacity', '0.7')
          .style('shape-rendering', 'crispEdges')
        );
    }

    function getColor(hex: string, opacity: number): string {
      const color = d3.color(hex);
      color.opacity = opacity;

      return color.toString();
    }

    function formatAxisTop(index: number) { // Six Sigma
      if (index === 3) {
        return 'μ';
      }

      return (index - 3) + ' σ';
    }

    function formatAxisBottom(value: any, index: number) {
      return formatValue(value);
    }

    function zoomed(event) {
      const transform = d3.event.transform;
      svg.attr('transform', transform);
    }

    return this.chartControl = Object.assign(svg.node(), {
      zoomIn: () => svg.transition().call(zoom.scaleBy, 2),
      zoomOut: () => svg.transition().call(zoom.scaleBy, 0.5)
    });
  }

  clear() {
    const chartID = '#' + this.chartID;

    d3.select(chartID)
      .selectAll('svg')
      .remove();

    d3.select(chartID)
      .selectAll('.gaussian-chart-tooltip')
      .remove();

    d3.select(chartID)
      .selectAll('.gaussian-chart-legend')
      .remove();
  }

  /////////////// UTILS ///////////////
  generateDataset(mean: number, stdev: number, interval: number) {
    const dataset: {x: number, y: number}[] = [];
    const upperBound = mean + 3 * stdev;
    const lowerBound = mean - 3 * stdev;

    const n = Math.ceil((upperBound - lowerBound) / interval);

    let position = lowerBound;
    for (let i = 0; i < n; i++) {
      dataset.push({
        x: position,
        y: jstat.normal.pdf(position, mean, stdev),
      });

      position += interval;
    }

    return dataset;
  }

  generateBins(dataset: any[], accessor: any, domain: any[]) {
    const generator = d3
      .histogram()
      .domain(domain)
      .value(accessor)
      .thresholds(12);
  }

  calcSvgSize() {
    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;

      this.width = element.clientWidth;
      this.height = element.clientHeight;

      // this.width = element.parentNode.clientWidth;
      // this.height = element.parentNode.clientHeight;

      return {width: this.width, height: this.height};
    }

    return {width: 400, height: 300};
  }

  STDEV(dataset: number[]) {
    const n = dataset.length;
    const sum = dataset.reduce((accumulator, current) => accumulator + current);
    const mean = sum / n;

    let variance = 0.0;
    let v1 = 0.0;
    let v2 = 0.0;
    let stdev;

    if (n != 1) {
      for (let i = 0; i < n; i++) {
        v1 = v1 + (dataset[i] - mean) * (dataset[i] - mean);
        v2 = v2 + (dataset[i] - mean);
      }

      v2 = v2 * v2 / n;
      variance = (v1 - v2) / (n-1);

      if (variance < 0) { variance = 0; }

      stdev = Math.sqrt(variance);
    }

    return Math.round(stdev * 100) / 100;
  };

  mock() {
    console.log('mock');
    const dataset = MOCK.generate();

    const accessor = d => d;
    const generator = d3
      .histogram()
      .domain(d3.extent(dataset, accessor))
      .value(accessor)
      .thresholds(12);

    const mean = d3.mean(dataset, accessor);
    const stdev = this.STDEV(dataset);
    const bins: any[] = generator(dataset);

    console.log({bins, mean, stdev});

    this.mean = mean;
    this.stdev = stdev;
    this.sample = dataset.length;
    this.min = d3.min(dataset, accessor);
    this.max = d3.max(dataset, accessor);
    this.histogram = bins;

    return setTimeout(() => this.draw(), 1500);
  }

}
