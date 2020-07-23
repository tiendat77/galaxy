import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  chartID = '#CLOCK';

  clockRadius = 200;
  margin = 50;
  w = (this.clockRadius + this.margin) * 2;
  h = (this.clockRadius + this.margin) * 2;

  hourHandLength = (2 * this.clockRadius) / 3;
  minuteHandLength = this.clockRadius;
  secondHandLength = this.clockRadius - 12;

  secondHandBalance = 30;
  secondTickStart = this.clockRadius;
  secondTickLength = -10;
  hourTickStart = this.clockRadius;
  hourTickLength = -18;
  secondLabelRadius = this.clockRadius + 16;
  secondLabelYOffset = 5;
  hourLabelRadius = this.clockRadius - 40;
  hourLabelYOffset = 7;
  radians = Math.PI / 180;

  twelve = d3
    .scaleLinear()
    .range([0, 360])
    .domain([0, 12]);

  sixty = d3
    .scaleLinear()
    .range([0, 360])
    .domain([0, 60]);

  handData = [
    {
      type: 'hour',
      value: 0,
      length: -this.hourHandLength,
      scale: this.twelve
    },
    {
      type: 'minute',
      value: 0,
      length: -this.minuteHandLength,
      scale: this.sixty
    },
    {
      type: 'second',
      value: 0,
      length: -this.secondHandLength,
      scale: this.sixty,
      balance: this.secondHandBalance
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.drawClock();

    const interval = setInterval(() => {
      this.updateData();
      this.moveHands();
    }, 1000);
  }

  drawClock() {
    // create all the clock elements
    this.updateData(); // draw them in the correct starting position

    const svg = d3.select(this.chartID)
      .append('svg')
      .attr('id', 'clock')
      .attr('viewBox', '0, 0, 500, 500')
      .style('min-width', '500px');

    const face = svg
      .append('g')
      .attr('id', 'clock-face')
      .attr('transform', `translate(${[this.w / 2, this.h / 2]})`);

    // add marks for seconds
    face
      .selectAll('.second-tick')
      .data(d3.range(0, 60))
      .enter()
      .append('line')
      .attr('class', 'second-tick')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', this.secondTickStart)
      .attr('y2', this.secondTickStart + this.secondTickLength)
      .attr('transform', d => `rotate(${this.sixty(d)})`);

    // and labels...
    face
      .selectAll('.second-label')
      .data(d3.range(5, 61, 5))
      .enter()
      .append('text')
      .attr('class', 'second-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => this.secondLabelRadius * Math.sin(this.sixty(d) * this.radians))
      .attr(
        'y',
        d =>
          -this.secondLabelRadius * Math.cos(this.sixty(d) * this.radians) + this.secondLabelYOffset
      )
      .text(d => d);

    // ... and hours
    face
      .selectAll('.hour-tick')
      .data(d3.range(0, 12))
      .enter()
      .append('line')
      .attr('class', 'hour-tick')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', this.hourTickStart)
      .attr('y2', this.hourTickStart + this.hourTickLength)
      .attr('transform', d => `rotate(${this.twelve(d)})`);

    face
      .selectAll('.hour-label')
      .data(d3.range(3, 13, 3))
      .enter()
      .append('text')
      .attr('class', 'hour-label')
      .attr('text-anchor', 'middle')
      .attr('x', d => this.hourLabelRadius * Math.sin(this.twelve(d) * this.radians))
      .attr(
        'y',
        d => -this.hourLabelRadius * Math.cos(this.twelve(d) * this.radians) + this.hourLabelYOffset
      )
      .text(d => d);

    const hands = face.append('g').attr('id', 'clock-hands');

    hands
      .selectAll('line')
      .data(this.handData)
      .enter()
      .append('line')
      .attr('class', d => d.type + '-hand')
      .attr('x1', 0)
      .attr('y1', d => d.balance || 0)
      .attr('x2', 0)
      .attr('y2', d => d.length)
      .attr('transform', d => `rotate(${d.scale(d.value)})`);

    face
      .append('g')
      .attr('id', 'face-overlay')
      .append('circle')
      .attr('class', 'hands-cover')
      .attr('x', 0)
      .attr('y', 0)
      .attr('r', this.clockRadius / 20);
  }

  updateData() {
    const t = new Date();
    this.handData[0].value = (t.getHours() % 12) + t.getMinutes() / 60;
    this.handData[1].value = t.getMinutes();
    this.handData[2].value = t.getSeconds();
  }

  moveHands() {
    d3.select('#clock-hands')
      .selectAll('line')
      .data(this.handData)
      .transition()
      .ease(d3.easeElastic.period(0.5))
      .attr('transform', d => `rotate(${d.scale(d.value)})`);
  }

}
