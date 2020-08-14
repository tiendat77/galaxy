import { Component, ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartControllerService } from '../../services/chart-controller.service';

import { MOCK_OLE } from './mock';
import * as moment from 'moment';
import * as d3 from 'd3';

@Component({
  selector: '[kpiBarChart]',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('barChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() showValueOnBar = true;
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showXLabel = true;
  @Input() showYLabel = false;
  @Input() showGradient = true;
  @Input() showYUOM = true;

  @Input() yLabel = 'hours';
  @Input() valueUom = '';
  @Input() axisLabelColor = 'rgba(255, 255, 255, 0.68)';
  @Input() axisColor = 'rgba(250, 250, 250, 0.4)';
  @Input() barColor = '#3195f5';
  @Input() gradientColors = [
    'rgba(49,149,245,0.2)',
    'rgba(49,149,245,0.04)',
    'transparent'
  ];

  chartID = 'BAR_CHART';
  margin = { top: 30, right: 20, bottom: 30, left: 50 };
  width = 460;
  height = 400;
  fontSize = '1.3em';

  resizeSub: Subscription;

  constructor(
    private chartCtrl: ChartControllerService,
    // private translate: TranslateService
  ) {
    this.chartID = this.initID();
  }

  ngOnInit(): void {
    this.initData();

    this.resizeSub = this.resizeSub = this.chartCtrl.onResizeRequest$.subscribe(() => {
      this.draw();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data){
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
    const rand = () => Math.floor(1000 + (9990 - 1000) * Math.random());

    return 'BAR_CHART_' + rand() + '_' + rand();
  }

  async initData() {
    // this.yLabel = await this.translate.get('WORD.HOURS');
  }

  parseData() {
    const format = d3.format('.2s');

    return this.data.map(d => {
      return {
        date: moment(d.date).format('DD-MM'),
        value: this.round(d.value),
        shortValue: format(d.value)
      };
    });
  }

  initSvg() {
    d3.select('#' + this.chartID)
      .selectAll('svg')
      .remove();

    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;

      this.width = element.parentNode.clientWidth;
      this.height = element.parentNode.clientHeight;

      this.margin = this.calcMargin();
    }

    const svg = d3.select('#' + this.chartID)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    svg.append('defs')
      .html(`
        <linearGradient id="barChartGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="${this.gradientColors[0]}"/>
          <stop offset="45%" stop-color="${this.gradientColors[1]}"/>
          <stop offset="70%" stop-color="${this.gradientColors[2]}"/>
        </linearGradient>
        <filter id="barChartLighten">
          <feComponentTransfer>
            <feFuncR type="linear" slope="2" />
            <feFuncG type="linear" slope="2" />
            <feFuncB type="linear" slope="2" />
          </feComponentTransfer>
        </filter>
      `);

    return svg;
  }

  draw() {
    const data = this.parseData();
    const svg = this.initSvg();

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date))
      .rangeRound([this.margin.left + 10, this.width - this.margin.right])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.value)]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .call(axis => axis.select('.domain')
        .attr('stroke', this.axisColor)
      )
      .call(axis => axis.selectAll('line')
        .attr('stroke', this.axisColor)
      )
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisLabelColor)
        .attr('font-size', this.fontSize)
        .attr('dx', data.length > 5 ? '-26px' : null)
        .style('transform', data.length > 5 ? `rotate(-45deg)` : null)
      );

    const yTick = this.calcYTick(this.height);

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(yScale).ticks(yTick).tickSizeOuter(0))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.selectAll('line').remove())
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisLabelColor)
        .attr('font-size', this.fontSize)
      );

    // Draw bar
    svg.append('g')
        .attr('fill', this.showGradient ? 'url(#barChartGradient)' : this.barColor)
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('id', (d, i) => `rect_${i}`)
        .attr('x', (d: any) => xScale(d.date))
        .attr('y', (d: any) => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d: any) => yScale(0) - yScale(d.value))
        .attr('stroke', this.barColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', (d: any) => `${yScale(0) - yScale(d.value) + xScale.bandwidth()} 0 0 ${xScale.bandwidth()}`);

    // Draw title
    svg.append('g')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
      .selectAll('rect')
      .data(data)
      .join('rect')
        .attr('x', (d: any) => xScale(d.date))
        .attr('y', 0)
        .attr('width', xScale.bandwidth())
        .attr('height', this.height)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
      .append('title')
        .text((d: any) => d.value);

    // Draw value on top of bar
    if (this.showValueOnBar) {
      svg.append('g')
          .attr('fill', this.axisLabelColor)
          .attr('text-anchor', 'middle')
        .selectAll('text')
        .data(data)
        .join('text')
          .attr('font-size', '0.9em')
          .attr('x', (d: any) => xScale(d.date))
          .attr('y', (d: any) => yScale(d.value))
          .attr('dx', xScale.bandwidth() / 2)
          .attr('dy', -8)
          .text((d: any) => d.shortValue + this.valueUom);
    }

    // Draw axises
    if (this.showXAxis) {
      svg.append('g').call(xAxis);
    }

    if (this.showYAxis) {
      svg.append('g').call(yAxis);
    }

    if (this.showYAxis && this.showYUOM) {
      svg.append('text')
        .attr('x', this.margin.left - 5)
        .attr('y', 25)
        .attr('fill', this.axisLabelColor)
        // .attr('font-size', '1em')
        .attr('text-anchor', 'end')
        .text(this.yLabel);
    }

    function onMouseOver(d, i) {
      svg.select('#rect_' + i)
        .attr('filter', 'url(#barChartLighten)');
    }

    function onMouseOut(d, i) {
      svg.select('#rect_' + i)
        .attr('filter', null);
    }
  }

  calcFontSize(width: number): string {
    let fontSize = 1.3;

    switch (true) {
      case (width > 600): {
        fontSize = 1.3;
        break;
      }

      case (width > 550): {
        fontSize = width * 1.3 / 600;
        break;
      }

      case (width < 400): {
        fontSize = 1.3;
        break;
      }
    }

    return fontSize + 'em';
  }

  calcMargin() {
    const margin = { top: 40, right: 20, bottom: 30, left: 50 };

    if (this.data.length > 5) {
      margin.bottom = 60;
    }

    const maxValue = d3.max(this.data, (d: any) => d.value);
    if (maxValue) {
      margin.left = Math.round(maxValue).toString().length * 10 + 20;
    }

    return margin;
  }

  calcYTick(height: number) {
    let tick = 6;

    switch (true) {
      case (height > 400): {
        tick = 5;
        break;
      }

      case (height < 300): {
        tick = 4;
        break;
      }
    }

    return tick;
  }

  round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
