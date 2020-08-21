import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartControllerService } from '../../services/chart-controller.service';
import { TranslateService } from '../../services/translate.service';

import { MOCK_DATA } from './mock';

import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('lineChartContainer') chartContainer: ElementRef;

  @Input() data: any[];
  @Input() axisLabelColor = 'rgba(255, 255, 255, 0.68)';
  @Input() axisColor = 'rgba(250, 250, 250, 0.4)';
  @Input() gradientColors: string[][] = [
    ['rgba(124,209,119,0.5)', 'rgba(46,46,46,0.2)'],
    ['rgba(255,64,129,0.5)', 'rgba(46,46,46,0.2)']
  ];
  @Input() lineColor = ['#7cd177', '#ff4081'];
  @Input() numberOfLine = 1;
  @Input() yLabel = 'hours';
  @Input() markCurrent: Date;

  @Input() dashedLine = false;
  @Input() showYAxisLabel = true;
  @Input() showXAxisLabel = true;
  @Input() showDot = false;
  @Input() showGradient = true;
  @Input() showTooltip = false;
  @Input() showGridLine = true;
  @Input() showYGridLine = false;
  @Input() showMark = true;
  @Input() showAxis = true;
  @Input() showYLabel = true;

  chartID = 'LINE_CHART';
  margin = { top: 30, right: 16, bottom: 30, left: 40 };
  width = 800 - this.margin.left - this.margin.right;
  height = 600 - this.margin.top - this.margin.bottom;
  fontSize = '1.3em';

  resizeSub: Subscription;

  constructor(
    private chartCtrl: ChartControllerService,
    private translate: TranslateService
  ) {
    this.chartID = this.initID();
  }

  ngOnInit(): void {
    this.initData();

    this.resizeSub = this.chartCtrl.onResizeRequest$.subscribe(() => {
      this.draw();
    });
  }

  ngOnChanges(changes): void {
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
  }

  initID() {
    const rand = () => Math.floor(1000 + (9999 - 1000) * Math.random());

    return 'LINE_CHART_' + rand() + '_' + rand();
  }

  async initData() {
    this.yLabel = await this.translate.get('WORD.HOURS');
  }

  initSvg() {
    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;

      this.width = element.parentNode.clientWidth;
      this.height = element.parentNode.clientHeight - 10;
    }

    this.margin = this.calcMargin();

    const svg = d3.select('#' + this.chartID)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    // Define gradient
    svg.append('defs')
      .html(`
        <linearGradient id="dottedLineChartGradient0" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="${this.gradientColors[0][0]}"/>
          <stop offset="100%" stop-opacity="0" stop-color="${this.gradientColors[0][1]}"/>
        </linearGradient>
        <linearGradient id="dottedLineChartGradient1" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="${this.gradientColors[1][0]}"/>
          <stop offset="100%" stop-opacity="0" stop-color="${this.gradientColors[1][1]}"/>
        </linearGradient>
      `);

    return svg;
  }

  initTooltip() {
    d3.select('#' + this.chartID)
    .selectAll('.line-chart-tooltip')
    .remove();

    return d3.select('#' + this.chartID)
      .append('div')
      .attr('class', 'chart-tooltip')
      .style('display', 'none')
      .style('pointer-events', 'none')
      .style('position', 'absolute')
      .style('text-align', 'start')
      .style('border', 'none')
      .style('border-radius', '8px')
      .style('padding', '8px')
      .style('margin-top', '-30px')
      .style('color', 'white')
      .style('background', 'rgba(0,0,0,0.8)')
      .style('font-size', '12px')
      .style('line-height', '16px');
  }

  draw() {
    d3.select('#' + this.chartID)
      .selectAll('svg')
      .remove();

    if (!this.data.length) {
      return;
    }

    const that = this;
    const svg = this.initSvg();
    const tooltip = this.initTooltip();

    const tick = this.calcTicks(this.width);
    const adjust = 0.05;
    const minDate = d3.min(this.data, (d: any) => d.date);
    const maxDate = d3.max(this.data, (d: any) => d.date);
    const bisect = d3.bisector((d: any) => d.date).left;

    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([this.margin.left, this.width - this.margin.right]);

    const y1Domain = d3.extent(this.data, (d: any) => d.value);
    y1Domain[1] = y1Domain[1] + y1Domain[1] * adjust;
    y1Domain[0] = y1Domain[0] - Math.max(y1Domain[0] * adjust, y1Domain[1] * adjust);

    let y2Domain = y1Domain;

    if (this.numberOfLine !== 1) {
      y2Domain = d3.extent(this.data, (d: any) => d.value1);
      y2Domain[1] = y2Domain[1] + y2Domain[1] * adjust;
      y2Domain[0] = y2Domain[0] - Math.max(y2Domain[0] * adjust, y2Domain[1] * adjust);
    }

    const yScale = d3.scaleLinear()
      .domain([Math.min(y1Domain[0], y2Domain[0]), Math.max(y1Domain[1], y2Domain[1])])
      .range([this.height - this.margin.bottom, this.margin.top]);

    if (this.showGridLine && this.showAxis) {
      svg.append('g')
        .attr('class', 'chart-grid-lines')
        .call(drawGrid);
    }

    if (this.showYLabel && this.showAxis) {
      svg.append('text')
        .attr('x', this.margin.left)
        .attr('y', this.margin.top - 6)
        .attr('fill', this.axisLabelColor)
        .attr('font-size', '0.9em')
        .attr('text-anchor', 'middle')
        .text(this.yLabel);
    }

    drawLine();

    if (this.numberOfLine !== 1) {
      drawLine(1, 'value1')
    }

    if (this.showAxis) {
      svg.append('g').call(initXAxis);
      svg.append('g').call(initYAxis);
    }

    // Functions
    // TODO: clean this function
    function drawLine(index = 0, domain = 'value') {
      const line = d3.line()
        .curve(d3.curveCatmullRom.alpha(0.5))
        .x((d: any) => xScale(d.date))
        .y((d: any) => yScale(d[domain]));

      const area = d3.area()
        .curve(d3.curveCatmullRom.alpha(0.5))
        .x((d: any) => xScale(d.date))
        .y0(yScale(d3.min(that.data, (d: any) => d[domain])))
        .y1((d: any) => yScale(d[domain]));

      if (that.showGradient) {
        svg.append('path')
          .datum(that.data)
          .attr('fill', `url(#dottedLineChartGradient${index})`)
          .attr('stroke-width', 1)
          .attr('d', area);
      }

      svg.append('path')
        .datum(that.data)
        .attr('fill', 'none')
        .attr('stroke', that.lineColor[index])
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', that.dashedLine ? 3 : 0)
        .attr('d', line);

      // Draw circle
      if (that.showDot) {
        svg.append('g')
          .selectAll('circle')
          .data(that.data)
          .join('circle')
            .attr('fill', that.lineColor[index])
            .attr('stroke', 'none')
            .attr('cx', (d: any) => xScale(d.date))
            .attr('cy', (d: any) => yScale(d[domain]))
            .attr('r', 4);
      }

      if (that.showMark) {
        svg.append('g').call(drawMark);
      }
    }

    function initXAxis(selection) {
      selection
        .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(tick).tickSizeOuter(0))
        .call(axis => axis.select('.domain')
          .attr('stroke', that.axisColor)
        )
        .call(axis => axis.selectAll('line').remove())
        .call(axis => axis.selectAll('text')
          .attr('class', 'font-number')
          .attr('fill', that.axisLabelColor)
          .attr('font-size', that.fontSize)
        );

      if (!that.showXAxisLabel) {
        selection.call(axis => axis.selectAll('text').remove());
      }
    }

    function initYAxis(selection) {
      selection
        .attr('transform', `translate(${that.margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(tick))
        .call(axis => axis.select('.domain').remove())
        .call(axis => axis.selectAll('line').remove())
        .call(axis => axis.selectAll('text')
          .attr('class', 'font-number')
          .attr('fill', that.axisLabelColor)
          .attr('font-size', that.fontSize)
        );

      if (!that.showYAxisLabel) {
        selection.call(axis => axis.selectAll('text').remove());
      }
    }

    function drawGrid(selection) {
      selection.append('g')
        .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
        .call(d3.axisBottom(xScale)
            .ticks(tick)
            .tickSize(-(that.height - that.margin.top - that.margin.bottom))
            .tickFormat((d) => '')
        )
        .call(axis => axis.select('.domain').remove())
        .call(axis => axis.selectAll('line')
          .style('stroke', 'rgba(210, 210, 210, 0.12)')
          .style('stroke-opacity', '0.7')
          .style('shape-rendering', 'crispEdges')
        );

      if (that.showYGridLine) {
        selection.append('g')
          .attr('transform', `translate(${that.margin.left}, 0)`)
          .call(d3.axisLeft(yScale).ticks(tick)
            .tickSize(-(that.width - that.margin.left - that.margin.right))
            .tickFormat((d) => '')
          )
          .call(axis => axis.select('.domain').remove())
          .call(axis => axis.selectAll('line')
            .style('stroke', 'rgba(210, 210, 210, 0.12)')
            .style('stroke-opacity', '0.7')
            .style('shape-rendering', 'crispEdges')
          );
      }
    }

    function drawMark(selection) {
      if (!that.markCurrent) {
        return;
      }

      const i = bisect(that.data, that.markCurrent);
      const data = that.data[i];

      if (!data) {
        return;
      }

      const cx = xScale(data.date);
      const cy = yScale(data.value);
      const max = xScale(maxDate);

      if (cx > 0 && cx <= max) {
        selection.append('circle')
          .attr('fill', '#fff')
          .attr('stroke', that.lineColor[0])
          .attr('stroke-width', '2')
          .attr('r', 4)
          .attr('cx', cx)
          .attr('cy', cy);
      }
    }

  }

  clean() {
    return new Promise(resolve => {
      d3.select('#' + this.chartID)
          .selectAll('svg')
          .remove();

      setTimeout(() => {
        resolve(1);
      }, 0);
    });
  }

  calcTicks(width: number) {
    let tick = 5;
    switch(true) {
      case (width <= 450):
        tick = 3;
        break;

      case (width < 281):
        tick = 2;
        break;
    }

    return tick;
  }

  calcMargin() {
    const margin = { top: 30, right: 16, bottom: 30, left: 40 };

    if (!this.showAxis) {
      return { top: 10, right: 0, bottom: 10, left: 0 };
    }

    const maxValue = d3.max(this.data, (d: any) => d.value);
    if (maxValue !== undefined) {
      margin.left = Math.round(maxValue).toString().length * 10 + (maxValue > 1 ? 20 : 40);
    }

    return margin;
  }

}
