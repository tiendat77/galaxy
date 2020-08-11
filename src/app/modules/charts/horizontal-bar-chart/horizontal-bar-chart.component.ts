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
  @Input() axisColor = 'rgba(250, 250, 250, 0.4)';
  @Input() axisLabelColor = 'rgba(255, 255, 255, 0.68)';
  @Input() fontSize = '1.3em';

  @Input() showXAxis = true;
  @Input() showYAxis = true;

  chartID = 'HORIZONTAL_BAR_CHART';
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
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

    // TODO: Delete it
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
    this.data = MOCK_DATA;
  }

  initSvg() {
    d3.select('#' + this.chartID)
      .selectAll('svg')
      .remove();

    if (this.chartContainer) {
      const element = this.chartContainer.nativeElement;

      this.width = element.offsetWidth;
      this.height = element.offsetHeight;

      // this.width = element.parentNode.clientWidth;
      // this.height = element.parentNode.clientHeight;
    }

    const svg = d3.select('#' + this.chartID)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    const defs = svg.append('defs');

    return svg;
  }

  draw() {
    if (!this.data.length) {
      return;
    }

    const svg = this.initSvg();

    const xScale = d3.scaleLinear()
      .domain(d3.extent(this.data, (d: any) => d.value))
      .range([this.margin.left, this.width - this.margin.right]);

    const yScale = d3.scaleBand()
      .domain(this.data.map(d => d.id))
      .rangeRound([this.margin.top, this.height - this.margin.bottom])
      .padding(0.1);

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
      );

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(d3.axisLeft(yScale))
      .call(axis => axis.select('.domain').remove())
      .call(axis => axis.selectAll('line').remove())
      .call(axis => axis.selectAll('text')
        .attr('fill', this.axisLabelColor)
        .attr('font-size', this.fontSize)
      );

    // Draw axises
    if (this.showXAxis) {
      svg.append('g').call(xAxis);
    }

    if (this.showYAxis) {
      svg.append('g').call(yAxis);
    }
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

    return fontSize;
  }

}
