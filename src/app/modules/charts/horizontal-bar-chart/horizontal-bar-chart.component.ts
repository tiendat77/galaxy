import { Component, OnInit, OnDestroy, OnChanges, ChangeDetectionStrategy, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartControllerService } from '../../services/chart-controller.service';

import { MOCK_DATA } from './mock';
import * as d3 from 'd3';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalBarChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('horizontalBarChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];
  @Input() barColor = '#3195f5';
  @Input() barHeight = 25;
  @Input() axisColor = 'rgba(250, 250, 250, 0.4)';
  @Input() axisLabelColor = 'rgba(255, 255, 255, 0.68)';
  @Input() fontSize = '1.3em';

  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showValueOnBar = false;
  @Input() showGradient = true;
  @Input() showTooltip = true;

  @Input() gradientColors = [
    'rgba(49,149,245,0.2)',
    'rgba(49,149,245,0.04)',
    'transparent'
  ];

  chartID = 'HORIZONTAL_BAR_CHART';
  margin = { top: 20, right: 20, bottom: 30, left: 100 };
  width = 500;
  height = 500;

  resizeSub: Subscription;

  constructor(private chartCtrl: ChartControllerService) {
    this.chartID = this.generateChartID();
  }

  ngOnInit(): void {
    this.resizeSub = this.resizeSub = this.chartCtrl.onResizeRequest$.subscribe(() => {
      this.draw();
    });

    this.initData();
  }

  ngOnChanges(changes: SimpleChanges) {
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

  generateChartID() {
    const rand = () => Math.floor(1000 + (9990 - 1000) * Math.random());

    return 'HORIZONTAL_BAR_CHART_' + rand() + '_' + rand();
  }

  initData() {
    // translate tooltip here

    this.data = MOCK_DATA.map(d => ({ id: d.id, value: d.total })).sort((a, b) => {
      if (a.value < b.value) { return 1; }

      if (a.value > b.value) { return -1; }

      return 0;
    });
  }

  initSvg() {
    d3.select('#' + this.chartID)
      .selectAll('svg')
      .remove();

    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;

      const width = element.offsetWidth;
      const height = element.offsetHeight;

      // this.width = element.parentNode.clientWidth;
      // this.height = element.parentNode.clientHeight;

      this.width = width - 10;
      this.height = Math.max(height, this.data.length * this.barHeight);
    }

    const svg = d3.select('#' + this.chartID)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    const defs = svg.append('defs');

    defs.html(`
      <filter id="barChartLighten">
        <feComponentTransfer>
          <feFuncR type="linear" slope="2" />
          <feFuncG type="linear" slope="2" />
          <feFuncB type="linear" slope="2" />
        </feComponentTransfer>
      </filter>
      <linearGradient id="barChartGradient" gradientTransform="rotate(180)">
        <stop offset="0%" stop-color="${this.gradientColors[0]}"/>
        <stop offset="45%" stop-color="${this.gradientColors[1]}"/>
        <stop offset="70%" stop-color="${this.gradientColors[2]}"/>
      </linearGradient>
    `);

    return svg;
  }

  initTooltip() {
    d3.select('#' + this.chartID)
      .selectAll('.chart-tooltip')
      .remove();

    const tooltip = d3.select('#' + this.chartID)
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
      .style('font', '10px sans-serif');

    return tooltip;
  }

  draw() {
    if (!this.data.length) {
      return;
    }

    const that = this;
    const svg = this.initSvg();
    const yTick = this.calcYTick(this.height);

    const minValue = d3.min(this.data, (d: any) => d.value);
    const maxValue = d3.max(this.data, (d: any) => d.value);

    const xScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([this.margin.left, this.width - this.margin.right]);

    const yScale = d3.scaleBand()
      .domain(this.data.map(d => d.id))
      .range([this.margin.top, this.height - this.margin.bottom])
      .padding(0.1);

    // Draw axises
    if (this.showXAxis) {
      svg.append('g').call(initXAxis);
    }

    if (this.showYAxis) {
      svg.append('g').call(initYAxis);
    }

    // Draw bar
    const rect = svg.append('g')
      .attr('fill', this.showGradient ? 'url(#barChartGradient)' : this.barColor)
      .selectAll('rect')
      .data(this.data)
      .join('rect')
        .attr('id', (d, i) => `rect_${i}`)
        .attr('x', xScale(0))
        .attr('y', (d: any) => yScale(d.id))
        .attr('width', (d: any) => xScale(d.value) - xScale(0))
        .attr('height', this.barHeight)
        .attr('stroke', this.barColor);

    // Draw title
    svg.append('g')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .selectAll('rect')
      .data(this.data)
      .join('rect')
        .attr('x', xScale(0))
        .attr('y', (d: any) => yScale(d.id))
        .attr('width', this.width - this.margin.left - this.margin.right)
        .attr('height', this.barHeight)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
      .append('title')
        .text((d: any) => `Place: ${d.id}\nTotal: ${d.value}`);

    if (this.showGradient) {
      rect.attr('stroke-width', 2)
      .style('stroke-dasharray', (d: any) => `${xScale(d.value) - xScale(0) + this.barHeight} 0 ${xScale(d.value) - xScale(0)} ${this.barHeight}`);
    }

    if (this.showValueOnBar) {
      svg.append('g')
        .attr('fill', this.axisColor)
        .attr('text-anchor', 'end')
        .attr('font-size', this.fontSize)
        .selectAll('text')
        .data(this.data)
        .join('text')
          .attr('x', (d: any) => xScale(d.value))
          .attr('y', (d: any) => yScale(d.id) + this.barHeight / 2)
          .text((d: any) => d.value);
    }

    const tooltip = this.initTooltip();

    if (this.showTooltip) {

    }

    // Functions
    function onMouseOver(d, i) {
      svg.select(`#rect_${i}`)
        .attr('filter', 'url(#barChartLighten)');

      tooltip.style('display', 'block');
    }

    function onMouseOut(d, i) {
      svg.select(`#rect_${i}`)
        .attr('filter', null);

      const data: any = d3.select(this).data()[0];

      tooltip.html(`
        <span>From: ${d.start}</span><br>
        <span>To: ${d.end}</span>
        <hr/>
        <span>Value: ${d.value}</span>
      `)
      .style('left', (d3.event.offsetX - 34) + 'px')
      .style('top', (d3.event.offsetY - 30) + 'px');
    }

    function initXAxis(selection) {
      selection
        .attr('transform', `translate(0, ${that.height - that.margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .call(axis => axis.select('.domain')
          .attr('stroke', that.axisColor)
        )
        .call(axis => axis.selectAll('line')
          .attr('stroke', that.axisColor)
        )
        .call(axis => axis.selectAll('text')
          .attr('fill', that.axisLabelColor)
          .attr('font-size', that.fontSize)
        );
    }

    function initYAxis(selection) {
      selection
        .attr('transform', `translate(${that.margin.left}, 0)`)
        .call(d3.axisLeft(yScale))
        .call(axis => axis.select('.domain')
          .attr('stroke', that.axisColor)
        )
        .call(axis => axis.selectAll('line')
          .attr('stroke', that.axisColor)
        )
        .call(axis => axis.selectAll('text')
          .attr('fill', that.axisLabelColor)
          .attr('font-size', that.fontSize)
          .append('title')
          .text((d, i) => that.data[i].id)
        );
    }
  }

  /////////////// UTILS ///////////////
  parseData() {
    const d3Format = d3.format('.2s');
    return this.data.map(d => {
      return {
        id: '',
        value: ''
      };
    });
  }

  calcFontSize(width: number) {
    let fontSize = 1.1;

    switch (true) {
      case (width > 600): {
        fontSize = 1;
        break;
      }

      case (width > 400): {
        fontSize = width * 0.9 / 600;
        break;
      }

      case (width < 400): {
        fontSize = 0.65;
        break;
      }
    }

    return fontSize + 'em';
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
