import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChartControllerService } from '../../services/chart-controller.service';
import { TranslateService } from '../../services/translate.service';

import { KPI_DATA } from './mock';

import { enDefaultLocale, ruDefaultLocale, viDefaultLocale } from './utils';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('lineChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() dataMultiple: any[][] = [];
  @Input() mode: 'single' | 'multiple' = 'single';

  // colors
  @Input() lineColor = ['#7cd177', '#ff4081'];
  @Input() tickColor = '#fff';

  // text
  @Input() xLabel = '';
  @Input() yLabel = 'hours';

  // options
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showXAxisTick = true;
  @Input() showYAxisTick = true;
  @Input() showXGrid = true;
  @Input() showYGrid = false;
  @Input() showGradient = true;
  @Input() showTooltip = true;
  @Input() showDot = false; // circle mark on line

  @Input() dashedLine = false;
  @Input() mark: Date = new Date(2020, 7, 25);

  chartID = 'LINE_CHART_';
  gradientColor = '#27283C';
  fontSize = '1.3em';

  margin = { top: 0, right: 0, bottom: 0, left: 0 };
  width = 800;
  height = 600;
  rotateXTicks = false;

  resizeSub: Subscription;
  translateSub: Subscription;

  constructor(
    private chartCtrl: ChartControllerService,
    private translate: TranslateService
  ) {
    this.chartID = this.generateID();
  }

  /////////////// INITIAL ///////////////
  ngOnInit(): void {
    this.translateWords();

    this.resizeSub = this.chartCtrl.onResizeRequest$.subscribe(() => {
      this.draw();
    });

    this.translateSub = this.translate.currentLanguage$.subscribe((lang) => {
      this.setTimeFormatDefaultLocale(lang);
    });

    this.test();
    this.getDataTest();
  }

  test() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data) {
      setTimeout(() => {
        this.draw();
      }, 200);
    }
  }

  ngOnDestroy() {
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }

    if (this.translateSub) {
      this.translateSub.unsubscribe();
    }
  }

  /////////////// DRAW CHART ///////////////
  draw() {
    const that = this;
    const chartID = '#' + this.chartID;

     // TODO dataMultiple
    if ((this.mode === 'single' && !this.data.length) || (this.mode === 'multiple' && !this.dataMultiple.length)) {
      return;
    }

    if (!this.chartContainer) {
      return;
    }

    this.clearChart(chartID);
    this.calcSvgSize();
    this.calcMargin();

    const svg = d3.select(chartID)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    const chartTooltip = d3.select(chartID)
      .append('div')
        .attr('class', 'line-chart-tooltip')
        .call(styleTooltip);

    const chartLegend = d3.select(chartID)
      .append('div')
        .attr('class', 'line-chart-legend')
        .call(styleLegend);

    const chartGridLine = svg.append('g')
      .attr('class', 'line-chart-grid');

    const chartXAxis = svg.append('g')
      .attr('class', 'line-chart-x-axis');

    const chartYAxis = svg.append('g')
      .attr('class', 'line-chart-y-axis');

    const chartGraphical = svg.append('g')
      .attr('class', 'line-chart-graphical');

    const chartYLabel = svg.append('g')
      .attr('class', 'line-chart-y-label');

    const chartXLabel = svg.append('g')
      .attr('class', 'line-chart-x-label');

    const chartMark = svg.append('g')
      .attr('class', 'line-chart-mark');

    const chartOverlay = svg.append('g')
      .attr('class', 'line-chart-overlay');

    const chartXCrossHairs = svg.append('rect')
      .attr('class', 'line-chart-x-crosshairs');

    const minDate = d3.min(this.data, (d: any) => d.date);
    const maxDate = d3.max(this.data, (d: any) => d.date);
    const minValue = d3.min(this.data, (d: any) => d.value);
    const maxValue = d3.max(this.data, (d: any) => d.value);
    const adjust = 0.05; // to avoid d3 curve touch the axis
    const bisect = d3.bisector((d: any) => d.date).left;
    const ticks = this.calcTicks(this.width);

    if (this.mode === 'single') {
      drawSingleLine();
      return;
    }

    if (this.mode === 'multiple') {
      drawMultipleLine();
      return;
    }

    /////////////// FUNCTIONS ///////////////
    function drawSingleLine() {
      const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([that.margin.left, that.width - that.margin.right]);

      const yMin = minValue - Math.max(minValue * adjust, maxValue * adjust);
      const yMax = maxValue + maxValue * adjust;

      const yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([that.height - that.margin.bottom, that.margin.top]);

      const line = d3.line() // create line chart
        .curve(d3.curveCatmullRom.alpha(0.5))
        .x((d: any) => xScale(d.date))
        .y((d: any) => yScale(d.value));

      const area = d3.area() // create gradient effect
        .curve(d3.curveCatmullRom.alpha(0.5))
        .x((d: any) => xScale(d.date))
        .y0(yScale(minValue))
        .y1((d: any) => yScale(d.value));

      chartGraphical.append('path')
        .datum(that.data)
        .call(styleLine)
        .attr('d', line);

      if (that.showGradient) {
        chartGraphical.append('defs') // SvgjsLinearGradient2410
          .html(`
            <linearGradient id="SvgjsLinearGradient2410" x1="0" y1="0" x2="0" y2="1">
              <stop id="SvgjsStop2411" stop-opacity="0.7" stop-color="${getColor(that.lineColor[0], 0.5)}" offset="0"></stop>
              <stop id="SvgjsStop2412" stop-opacity="0.9" stop-color="${getColor(that.gradientColor, 0.2)}" offset="0.9"></stop>
              <stop id="SvgjsStop2413" stop-opacity="0.9" stop-color="${getColor(that.gradientColor, 0.2)}" offset="1"></stop>
            </linearGradient>
          `);

        chartGraphical.append('path')
          .datum(that.data)
          .attr('fill', `url(#SvgjsLinearGradient2410)`)
          .attr('stroke-width', 1)
          .attr('d', area);
      }

      if (that.showDot) {
        chartGraphical.append('g')
          .attr('class', 'line-chart-dots')
          .selectAll('circle')
          .data(that.data)
          .join('circle')
            .attr('fill', that.lineColor[0])
            .attr('stroke', '#fff')
            .attr('stroke-width', '2')
            .attr('r', 6)
            .attr('cx', (d: any) => xScale(d.date))
            .attr('cy', (d: any) => yScale(d.value));
      }

      if (that.showXGrid) {
        const tickSize = -(that.height - that.margin.top - that.margin.bottom);

        chartGridLine.append('g')
          .attr('class', 'x-grid')
          .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
          .call(d3.axisBottom(xScale)
            .ticks(ticks)
            .tickSize(tickSize)
            .tickFormat(d => '')
          )
          .call(styleGridLine);
      }

      if (that.showYGrid) {
        const tickSize = -(that.width - that.margin.left - that.margin.right);

        chartGridLine.append('g')
          .attr('class', 'y-grid')
          .attr('transform', `translate(${that.margin.left}, 0)`)
          .call(d3.axisLeft(yScale)
            .ticks(ticks)
            .tickSize(tickSize)
            .tickFormat(d => '')
          )
          .call(styleGridLine);
      }

      if (that.showXAxis) {
        chartXAxis
          .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
          .call(d3.axisBottom(xScale)
            .ticks(ticks)
            .tickSizeOuter(0)
          )
          .call(styleXAxis);
      }

      if (that.showYAxis) {
        chartYAxis
          .attr('transform', `translate(${that.margin.left}, 0)`)
          .call(d3.axisLeft(yScale)
            .ticks(ticks)
            .tickSizeOuter(0)
          )
          .call(styleYAxis);
      }

      if (that.mark !== undefined) {
        const i = bisect(that.data, that.mark);
        const data = that.data[i];

        if (!data) { return; }

        const cx = xScale(data.date);
        const cy = yScale(data.value);
        const max = xScale(maxDate);

        if (cx > 0 && cx <= max) {
          chartMark.append('circle')
            .attr('fill', that.lineColor[0])
            .attr('stroke', '#fff')
            .attr('stroke-width', '2')
            .attr('r', 6)
            .attr('cx', cx)
            .attr('cy', cy);
        }
      }

      if (that.showTooltip) {
        chartOverlay.append('rect')
          .attr('class', 'line-chart-')
          .attr('width', that.width - that.margin.left - that.margin.right)
          .attr('height', that.height - that.margin.top - that.margin.bottom)
          .attr('x', that.margin.left)
          .attr('y', that.margin.top)
          .attr('fill', 'none')
          .style('pointer-events', 'all')
          .on('mouseover', onMouseOver)
          .on('mouseout', onMouseOut)
          .on('mousemove', onMouseMove);

        chartXCrossHairs
          .style('opacity', 0)
          .attr('fill', getColor(that.tickColor, 0.22))
          .attr('width', '2')
          .attr('height', that.height - that.margin.top - that.margin.bottom)
          .attr('x', 0)
          .attr('y', that.margin.top);
      }

      function onMouseMove() {
        const x = xScale.invert(d3.mouse(this)[0]);
        const i = bisect(that.data, x, 1);
        const data0 = that.data[i];
        const data1 = that.data[i - 1];

        // d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        // const data = x.getTime() - data0.date.getTime() > data1 - x ? data1 : data0;
        chartTooltip.html(`
          <span>Value: ${data0.value}</span>
        `);

        chartTooltip
          .style('left', (xScale(data0.date) - 34) + 'px')
          .style('top', (yScale(data0.value) - 30) + 'px');

        chartXCrossHairs
          .attr('x', xScale(data0.date));
      }
    }

    function drawMultipleLine() {}

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
        .style('line-height', '16px');
    }

    function styleLegend(selection: d3.Selection<HTMLElement, unknown, HTMLElement, any>) {
      selection
        .style('width', '100%');
    }

    function styleLine(selection: d3.Selection<SVGPathElement, unknown, HTMLElement, any>) {
      selection
        .attr('fill', 'none')
        .attr('stroke', that.lineColor[0])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', that.dashedLine ? 3 : 0);
    }

    function styleXAxis(selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>) {
      selection
        .call(g => g.select('.domain')
          .attr('stroke', getColor(that.tickColor, 0.4))
        )
        .call(g => g.selectAll('text')
          .attr('class', 'font-number')
          .attr('fill', getColor(that.tickColor, 0.68))
          .attr('font-size', that.fontSize)
          .attr('dx', that.rotateXTicks ? '-26px' : null)
          .style('transform', that.rotateXTicks ? 'rotate(-45deg)' : null)
        )
        .call(g => g.selectAll('line').remove());

      if (!that.showXAxisTick) {
        selection.call(g => g.selectAll('text').remove());
      }
    }

    function styleYAxis(selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>) {
      selection
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('line').remove())
        .call(g => g.selectAll('text')
          .attr('class', 'font-number')
          .attr('fill', getColor(that.tickColor, 0.68))
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

    function onMouseOver() {
      chartTooltip.style('display', 'block');
      chartXCrossHairs.style('opacity', 1);
    }

    function onMouseOut() {
      chartTooltip.style('display', 'none');
      chartXCrossHairs.style('opacity', 0);
    }

    function rand(): number {
      return Math.floor(1000 + (9999 - 1000) * Math.random());
    }

  }

  clearChart(chartID: string) { // clean up old chart
    d3.select(chartID)
      .selectAll('svg')
      .remove();

    d3.select(chartID)
      .selectAll('.line-chart-tooltip')
      .remove();

    d3.select(chartID)
      .selectAll('.line-chart-legend')
      .remove();
  }

  /////////////// UTILS ///////////////
  generateID(prefix = 'LINE_CHART_') {
    const rand = () => Math.floor(1000 + (9999 - 1000) * Math.random());

    return prefix + rand() + '_' + rand();
  }

  async translateWords() {
    this.setTimeFormatDefaultLocale(this.translate.currentLanguage$.value);
    this.yLabel = await this.translate.get('WORD.HOURS');
  }

  setTimeFormatDefaultLocale(lang: string) {
    switch (lang) {
      case 'vi': {
        d3.timeFormatDefaultLocale(viDefaultLocale);
        break;
      }

      case 'ru': {
        d3.timeFormatDefaultLocale(ruDefaultLocale);
        break;
      }

      default: {
        d3.timeFormatDefaultLocale(enDefaultLocale);
        break;
      }
    }
  }

  calcSvgSize() {
    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;

      // this.width = element.parentNode.clientWidth;
      // this.height = element.parentNode.clientHeight - 10;

      this.width = element.clientWidth;
      this.height = element.clientHeight - 10;
      return {width: this.width, height: this.height};
    }

    return {width: 400, height: 300};
  }

  calcMargin() {
    const margin = { top: 30, right: 16, bottom: 30, left: 40 };
    this.rotateXTicks = false;

    if (!(this.showXAxis && this.showYAxis)) {
      this.margin = { top: 10, right: 0, bottom: 10, left: 0 };
      return { top: 10, right: 0, bottom: 10, left: 0 };
    }

    const maxValue = d3.max(this.data, (d: any) => d.value);

    if (maxValue !== undefined) {
      // 1 digit = 10 space
      margin.left = Math.round(maxValue).toString().length * 10 + (maxValue > 1 ? 20 : 40);
    }

    if (this.width <= 340 || this.data.length > 15) {
      this.rotateXTicks = true;
      margin.bottom = 60;
    }

    this.margin = margin;
    return margin;
  }

  calcTicks(width: number) {
    let tick = 5;
    switch (true) {
      case (width <= 450):
        tick = 3;
        break;

      case (width < 281):
        tick = 2;
        break;
    }

    return tick;
  }

  getDataTest() {
    this.data = KPI_DATA.map((item: any) => ({date: new Date(item.date), value: item.value}));

    setTimeout(() => {
      this.draw();
    }, 900);
  }

}
