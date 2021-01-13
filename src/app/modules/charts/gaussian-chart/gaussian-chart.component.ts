import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';

// import { TranslateService } from '../../../../core/services/translate.service';

import * as jstat from 'jstat';
import * as d3 from 'd3';
import { debounceTime } from 'rxjs/operators';

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
  @Input() interval = 0.05;

  // colors
  @Input() lineColor = '#ff8383';
  @Input() tickColor = '#464646';
  @Input() barFillColor = '#2dacd1';
  @Input() barStrokeColor = '#209e91';

  // text
  @Input() xLabel;
  @Input() yLabel;

  // options
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showXAxisTick = true;
  @Input() showYAxisTick = false;
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

  constructor(
    // private translate: TranslateService
  ) {
    this.chartID = this.generateID();
  }

  ngOnInit(): void {
    this.resizeSub = fromEvent(window, 'resize').pipe(debounceTime(100)).subscribe(() => {
      this.draw();
    });

    setTimeout(() => {
      console.log('init');
      this.stdev = 14.4;
      this.mean = 25.6;
      this.sample = 7650;
      this.draw();
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) { return; }

    if (!changes.stdev) {
      return this.isNoData$.next(true);
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
    if (!this.stdev || this.stdev < 1) {
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
    const dataset = this.generateDataset(this.mean, this.stdev, this.interval, this.sample);
    const histogram = []; // TODO
    console.log({ mean: this.mean, stdev: this.stdev, sample: dataset.length });

    drawGaussianCurve();
    drawHistogram();

    function drawGaussianCurve() {
      const tickValues = [-3, -2, -1, 0, 1, 2, 3].map(sigma => {
        return that.mean + sigma * that.stdev;
      });

      const xScale = d3.scaleLinear()
        .domain([d3.min(dataset, (d) => d.x), d3.max(dataset, (d) => d.x)])
        .range([that.margin.left, that.width - that.margin.right]);

      const yScale = d3.scaleLinear()
        .domain([d3.min(dataset, (d) => d.y), d3.max(dataset, (d) => d.y)])
        .range([that.height - that.margin.bottom, that.margin.top]);

      // TODO: remove
      tickValues.forEach(element => {
        histogram.push({ x: element, y: yScale(10) });
      });

      const line = d3.line() // create line chart
        .x((d: any) => xScale(d.x))
        .y((d: any) => yScale(d.y));

      chartXAxisTop
        .attr('transform', `translate(0, 0)`)
        .call(d3.axisBottom(xScale)
          .tickValues(tickValues)
          .tickFormat((d: any, i) => formatAxisTop(i))
        )
        .call(styleXAxisTop);

      chartXAxisBottom
        .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
        .call(d3.axisBottom(xScale)
          .tickValues(tickValues)
          .tickFormat((d: any, i) => formatAxisBottom(d, i))
        )
        .call(styleXAxisBottom);

      chartYAxis
        .attr('transform', `translate(${that.margin.left}, 0)`)
        .call(d3.axisLeft(yScale)
          .tickSizeOuter(0)
        )
        .call(styleYAxis);

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
      const xScale = d3.scaleBand()
        .domain(histogram.map(d => d.x))
        .rangeRound([that.margin.left, that.width - that.margin.right])
        .padding(0);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(histogram, (d: any) => d.y)])
        .nice()
        .range([that.height - that.margin.bottom, that.margin.top]);

      chartHistogram
        .attr('fill', that.barFillColor)
        .selectAll('rect')
        .data(histogram)
        .join('rect')
          .attr('id', (d, i) => `rect_${i}`)
          .attr('x', (d: any) => xScale(d.x))
          .attr('y', (d: any) => yScale(d.y))
          .attr('width', xScale.bandwidth())
          .attr('height', (d: any) => yScale(0) - yScale(d.y))
          .attr('stroke', that.barStrokeColor)
          .attr('stroke-width', 2);

      chartHistogramOverlay
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .selectAll('rect')
        .data(histogram)
        .join('rect')
          .attr('x', (d: any) => xScale(d.x))
          .attr('y', 0)
          .attr('width', xScale.bandwidth())
          .attr('height', that.height)
        .on('mouseover', onMouseOver)
        .on('mousemove', onMouseMove)
        .on('mouseout', onMouseOut);

      function onMouseOver(d, i) {
        svg.select('#rect_' + i)
          .attr('filter', 'url(#barChartLighten)');
  
        chartTooltip.style('display', 'block');
      }
  
      function onMouseMove(d, i) {
        const isLeft = i < histogram.length / 2;
        chartTooltip.html(`
          <div style="position: absolute;
            top: 50%;
            right: ${ isLeft? '100%' : 'unset'};
            left: ${isLeft ? 'unset' : '100%'};
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: ${isLeft ? 'transparent rgba(0,0,0,0.8) transparent transparent' : 'transparent transparent transparent rgba(0,0,0,0.8)'};">
          </div>
          <div>
            <span>${formatValue(d.y)}</span>
          </div>
        `);
  
        const tooltipBox = chartTooltip.node().getBoundingClientRect();
  
        const x =  xScale(d.x) + xScale.bandwidth() / 2 - (isLeft ? 0 : tooltipBox.width);
        const y = yScale(d.y);
  
        chartTooltip
          .style('left', (x) + 'px')
          .style('top', (y > 0 ? y + 12 : y - 12) + 'px');
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
        .style('display', 'none')
        .style('pointer-events', 'none')
        .style('background', 'rgba(0,0,0,0.8)')
        .style('border', 'none')
        .style('color', 'white')
        .style('text-align', 'start')
        .style('border-radius', '8px')
        .style('padding', '8px')
        .style('margin-top', '-30px')
        .style('font-size', '12px')
        .style('line-height', '16px')
        .style('white-space', 'nowrap')
        .style('box-sizing', 'border-box')
        .style('transition', 'left 0.5s');
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
        .call(g => g.selectAll('line').remove())
        .call(g => g.selectAll('text').remove());
        // .call(g => g.selectAll('text')
          // .attr('class', 'font-number')
          // .attr('fill', textColor)
          // .attr('font-size', that.fontSize)
        // );

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
      // const transform = d3.event.transform;

      // svg.attr('transform', transform);
    }

    function scale(ratio: number) {
      svg.call(zoom.scaleTo, ratio);
    }

    function center() {
      const groupBox = svg.node().getBBox();
      const translateX = (that.width - groupBox.width) / 2;
      const translateY = (that.height - groupBox.height) / 2;

      if (Number.isNaN(translateX) || Number.isNaN(translateY)) {
        return;
      }

      svg.call(
        zoom.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(1)
      );
    }

    return this.chartControl = Object.assign(svg.node(), {
      zoomIn: () => svg.transition().call(zoom.scaleBy, 2),
      zoomOut: () => svg.transition().call(zoom.scaleBy, 0.5),
      zoomReset: center,
      zoomScale: scale,
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
  generateDataset(mean: number, stdev: number, interval: number, sample: number) {
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

}
