import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

import { MOCK_DATA } from './mock';

import * as d3 from 'd3';

@Component({
  selector: 'app-dotted-line-chart',
  templateUrl: './dotted-line-chart.component.html',
  styleUrls: ['./dotted-line-chart.component.scss']
})
export class DottedLineChartComponent implements OnInit, AfterViewInit {
  @ViewChild('dottedLineChart') chartContainer: ElementRef;

  @Input() data: any[];
  @Input() title: string;
  @Input() subtitle: string;
  @Input() axisColor = 'rgba(0, 0, 0, 0.68)';

  chartID = '#DOTTED_LINE_CHART';
  margin = ({top: 20, right: 30, bottom: 30, left: 40});
  width = 800 - this.margin.left - this.margin.right;
  height = 600 - this.margin.top - this.margin.bottom;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  initData() {
    
  }

  initSvg() {
    d3.select(this.chartID)
      .select('svg')
      .remove();

    const svg = d3.select(this.chartID)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('viewBox', `0, 0, ${this.width}, ${this.height}`);

    return svg;
  }

  draw() {
    this.initData();

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.bottom - this.margin.top;



  }

}
