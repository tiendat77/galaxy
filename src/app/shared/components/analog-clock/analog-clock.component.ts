import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import * as d3 from 'd3';

interface Clock {
  clock: d3.Selection<SVGGElement, any, any, any>;
  move: (hour: number, minute: number, second: number) => void;
  update: () => void;
}

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnDestroy, AfterViewInit {

  @Input('radius') radius: number;

  hourTickLength = 18;
  hourLabelOffset = 36;
  secondTickLength = 10;

  private RADIANS = Math.PI / 180;

  private clock: Clock;
  private subscription: Subscription;

  @ViewChild('container')
  private containerRef: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initialize() {
    this.clock = this.draw();
    this.subscription = new Subscription();

    if (!this.clock) {
      return;
    }

    const subscriber = interval(1000).subscribe(() => {
      this.clock.update();
    });
    this.subscription.add(subscriber);
  }

  private draw(): Clock {
    const element: HTMLElement = this.containerRef?.nativeElement;

    if (!element) {
      return;
    }

    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const diameter = Math.min(width, height);
    const radius = this.radius ? this.radius : Math.round(diameter / 2);

    const that = this;

    const hourScale = d3
    .scaleLinear()
    .range([0, 360])
    .domain([0, 12]);

    const minuteScale = d3
      .scaleLinear()
      .range([0, 360])
      .domain([0, 60]);

    const secondScale = d3
      .scaleLinear()
      .range([0, 360])
      .domain([0, 60]);

    const clock = drawSVG();
    const face = drawClockFace();
    const hands = drawClockHands();
    const point = drawClocCenterPoint();

    updateTime();

    function drawSVG() {
      const svg = d3.select(element)
        .append('svg')
        .attr('viewBox', `0 0 ${radius * 2} ${radius * 2}`);

      return svg.append('g')
        .attr('transform', `translate(${radius}, ${radius})`);
    }

    function drawClockFace() {
      const clockFace = clock.append('g')
        .attr('class', 'clock-face');

      // Marks for seconds
      const seconds = clockFace.append('g')
        .attr('class', 'seconds');

      seconds.selectAll('.second-tick')
        .data(d3.range(0, 60))
        .enter()
        .append('line')
        .attr('class', 'second-tick')
        .style('stroke', '#ccc')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', radius)
        .attr('y2', radius - that.secondTickLength)
        .attr('transform', d => `rotate(${secondScale(d)})`);

      // Marks for hours
      const hours = clockFace.append('g')
        .attr('class', 'hours');

      hours.selectAll('.hour-tick')
        .data(d3.range(0, 12))
        .enter()
        .append('line')
        .attr('class', 'hour-tick')
        .style('stroke-width', 4)
        .style('stroke', '#419600')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', radius)
        .attr('y2', radius - that.hourTickLength)
        .attr('transform', d => `rotate(${hourScale(d)})`);

      // Hour labels
      function calcHourLabelX(d: number) {
        return (radius - that.hourLabelOffset) * Math.sin(hourScale(d) * that.RADIANS);
      }

      function calcHourLabelY(d: number) {
        return - (radius - that.hourLabelOffset)
               * Math.cos(hourScale(d) * that.RADIANS)
               + 8;
      }

      hours.selectAll('.hour-label')
        .data(d3.range(1, 13))
        .enter()
        .append('text')
        .attr('class', 'hour-label')
        .style('fill', '#ccc')
        .style('font-size', '1rem')
        .attr('text-anchor', 'middle')
        .attr('x', calcHourLabelX)
        .attr('y', calcHourLabelY)
        .text(d => d);

      return clockFace;
    }

    function drawClocCenterPoint() {
      const center = clock.append('g')
        .attr('class', 'hands-root');

      // Hands root
      center.append('circle')
        .attr('class', 'hands-cover')
        .style('stroke', '#ccc')
        .style('fill', '#154829')
        .attr('x', 0)
        .attr('y', 0)
        .attr('r', radius / 20);

      return center;
    }

    function drawClockHands() {
      const clockHands = clock.append('g')
        .attr('class', 'clock-hands');

      const hourHand = clockHands.append('line')
        .attr('class', 'hour-hand')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -(2 / 3) * radius)
        .style('stroke-width', 7)
        .style('stroke', '#3ba95d')
        .style('stroke-linecap', 'round');

      const minuteHand = clockHands.append('line')
        .attr('class', 'minute-hand')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -radius + 12)
        .style('stroke-width', 5)
        .style('stroke', '#3ba95d')
        .style('stroke-linecap', 'round');


      const secondHand = clockHands.append('line')
        .attr('class', 'second-hand')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -radius + 20)
        .style('stroke-width', 3)
        .style('stroke', '#248041')
        .style('stroke-linecap', 'round');

      return { hourHand, minuteHand, secondHand };
    }


    function moveHands(hour: number, minute: number, second: number) {
      const _hour = (hour % 12) + (minute / 60);

      hands.hourHand
        .transition()
        .attr('transform', `rotate(${hourScale(_hour)})`);

      hands.minuteHand
        .transition()
        .attr('transform', `rotate(${minuteScale(minute)})`);

      hands.secondHand
        .transition()
        .attr('transform', `rotate(${secondScale(second)})`);
    }

    function updateTime() {
      const time = new Date();
      const hour = time.getHours();
      const minute = time.getMinutes();
      const second = time.getSeconds();

      moveHands(hour, minute, second);
    }

    return {
      clock,
      move: moveHands,
      update: updateTime,
    };
  }

}
