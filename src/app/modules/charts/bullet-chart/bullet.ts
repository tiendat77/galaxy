// tslint:disable
export function createBulletChart(d3) {

  // Chart design based on the recommendations of Stephen Few. Implementation
  // based on the work of Clint Ivy, Jamie Love, and Jason Davies.
  // http://projects.instantcognition.com/protovis/bulletchart/
  d3.bullet = function() {
    let orient = 'left';
    let reverse = false;
    let duration = 0;
    let ranges = bulletRanges;
    let markers = bulletMarkers;
    let measures = bulletMeasures;
    let width = 380;
    let height = 30;
    let tickFormat = d3.format(',.1f');
    let axisColor = '#rgba(0, 0, 0, 0.68)';
    let rangeTitles = ['Range 0', 'Range 1', 'Range 2'];
    let measureTitles = ['Measure 1', 'Measure 2', 'Measure 3'];
    let markerTitles = ['Marker'];

    // For each small multiple…
    function bullet(g) {
      g.each(function(d, i) {
        var rangez = ranges.call(this, d, i).slice().sort(d3.descending);
        var markerz = markers.call(this, d, i).slice().sort(d3.descending);
        var measurez = measures.call(this, d, i).slice().sort(d3.descending);
        var g = d3.select(this);

        // Compute the new x-scale.
        var x1 = d3.scaleLinear()
          .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
          .range(reverse ? [width, 0] : [0, width]);

        // Retrieve the old x-scale, if this is an update.
        var x0 = this.__chart__ || d3.scaleLinear()
          .domain([0, Infinity])
          .range(x1.range());

        // Stash the new scale.
        this.__chart__ = x1;

        // Derive width-scales from the x-scales.
        var w0 = bulletWidth(x0),
          w1 = bulletWidth(x1);

        // Update the range rects.
        var chart = g.append('g');

        var range = chart.selectAll('rect.range')
          .data(rangez);

        const rectRange = range.enter().append('rect')

        rectRange.attr('class', function(d, i) { return 'range s' + i; }) // color range 0
          .attr('width', w0)
          .attr('height', height)
          .attr('x', reverse ? x0 : 0)
          .transition()
          .duration(duration)
          .attr('width', w1)
          .attr('x', reverse ? x1 : 0);

        rectRange.append('title')
          .text((d, i) => rangeTitles[i]);

        range.transition()
          .duration(duration)
          .attr('x', reverse ? x1 : 0)
          .attr('width', w1)
          .attr('height', height);

        // Update the measure rects.
        var measure = chart.selectAll('rect.measure')
          .data(measurez);

        var rectMeasure = measure.enter().append('rect');

        rectMeasure.attr('class', function(d, i) { return 'measure s' + i; })
          .attr('width', w0)
          .attr('height', height / 3)
          .attr('x', reverse ? x0 : 0)
          .attr('y', height / 3)
          .transition()
          .duration(duration)
          .attr('width', w1)
          .attr('x', reverse ? x1 : 0);

        rectMeasure.append('title')
          .text((d, i) => measureTitles[i]);

        measure.transition()
          .duration(duration)
          .attr('width', w1)
          .attr('height', height / 3)
          .attr('x', reverse ? x1 : 0)
          .attr('y', height / 3);

        // Update the marker lines.
        var marker = chart.selectAll('line.marker')
          .data(markerz);

        const lineMarker = marker.enter().append('line');

        lineMarker.attr('class', 'marker')
          .attr('x1', x0)
          .attr('x2', x0)
          .attr('y1', height / 6)
          .attr('y2', height * 5 / 6)
          .transition()
          .duration(duration)
          .attr('x1', x1)
          .attr('x2', x1);

        lineMarker.append('title')
          .text((d, i) => markerTitles[i]);

        marker.transition()
          .duration(duration)
          .attr('x1', x1)
          .attr('x2', x1)
          .attr('y1', height / 6)
          .attr('y2', height * 5 / 6);

        chart.style('cursor', 'pointer')
          .on('mouseover', onMouseOver)
          .on('mouseout', onMouseOut);

        function onMouseOver(d, i) {
          const self = d3.select(this);
          self.style('filter', 'url(#bulletFilter)');
        }

        function onMouseOut(d, i) {
          const self = d3.select(this);
          self.style('filter', 'none');
        }

        // Compute the tick format.
        var format = tickFormat || x1.tickFormat(6);

        var axis = g.append('g')
          .attr('fill', axisColor);

        // Update the tick groups.
        var tick = axis.selectAll('g.tick')
          .data(x1.ticks(6), function(d) {
            return this.textContent || format(d);
          });

        // Initialize the ticks with the old scale, x0.
        var tickEnter = tick.enter().append('g')
          .attr('class', 'tick')
          .attr('transform', bulletTranslate(x0))
          .style('opacity', 1e-6);

        tickEnter.append('line')
          .attr('y1', height)
          .attr('y2', height * 7 / 6)
          .attr('stroke', axisColor)
          .attr('stroke-width', '0.5px');

        tickEnter.append('text')
          .attr('text-anchor', 'middle')
          .attr('fill', axisColor)
          .attr('dy', '1em')
          .attr('y', height * 7 / 6)
          .text(format);

        // Transition the entering ticks to the new scale, x1.
        tickEnter.transition()
          .duration(duration)
          .attr('transform', bulletTranslate(x1))
          .style('opacity', 1);

        // Transition the updating ticks to the new scale, x1.
        var tickUpdate = tick.transition()
          .duration(duration)
          .attr('transform', bulletTranslate(x1))
          .style('opacity', 1);

        tickUpdate.select('line')
          .attr('y1', height)
          .attr('y2', height * 7 / 6);

        tickUpdate.select('text')
          .attr('y', height * 7 / 6);

        // Transition the exiting ticks to the new scale, x1.
        tick.exit().transition()
          .duration(duration)
          .attr('transform', bulletTranslate(x1))
          .style('opacity', 1e-6)
          .remove();
      });
      //d3.timer.flush();
    }

    // left, right, top, bottom
    bullet.orient = function(x) {
      if (!arguments.length) return orient;
      orient = x;
      reverse = orient == 'right' || orient == 'bottom';
      return bullet;
    };

    // ranges (bad, satisfactory, good)
    bullet.ranges = function(x) {
      if (!arguments.length) return ranges;
      ranges = x;
      return bullet;
    };

    // markers (previous, goal)
    bullet.markers = function(x) {
      if (!arguments.length) return markers;
      markers = x;
      return bullet;
    };

    // measures (actual, forecast)
    bullet.measures = function(x) {
      if (!arguments.length) return measures;
      measures = x;
      return bullet;
    };

    bullet.width = function(x) {
      if (!arguments.length) return width;
      width = x;
      return bullet;
    };

    bullet.height = function(x) {
      if (!arguments.length) return height;
      height = x;
      return bullet;
    };

    bullet.tickFormat = function(x) {
      if (!arguments.length) return tickFormat;
      tickFormat = x;
      return bullet;
    };

    bullet.duration = function(x) {
      if (!arguments.length) return duration;
      duration = x;
      return bullet;
    };

    bullet.axisColor = function(x) {
      if (!arguments.length) return axisColor;
      axisColor = x;
      return bullet;
    }

    bullet.rangeTitles = function(x) {
      if (!arguments.length) return rangeTitles;
      rangeTitles = x;
      return bullet;
    }

    bullet.measureTitles = function(x) {
      if (!arguments.length) return measureTitles;
      measureTitles = x;
      return bullet;
    }

    bullet.markerTitles = function(x) {
      if (!arguments.length) return markerTitles;
      markerTitles = x;
      return bullet;
    }

    return bullet;
  };

  function bulletRanges(d) {
    return d.ranges;
  }

  function bulletMarkers(d) {
    return d.markers;
  }

  function bulletMeasures(d) {
    return d.measures;
  }

  function bulletTranslate(x) {
    return function(d) {
      return 'translate(' + x(d) + ',0)';
    };
  }

  function bulletWidth(x) {
    var x0 = x(0);
    return function(d) {
      return Math.abs(x(d) - x0);
    };
  }

  return d3;
}
