import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { WORK_MASTER } from './mock';

import * as d3 from 'd3';
// import * as dagreD3 from 'dagre-d3';
import * as lodash from 'lodash';

interface NodeLink {
  from: string;
  to: string;
  label: string;
}

interface NodeData {
  states: string[];
  nodes: NodeLink[];
}

@Component({
  selector: 'app-state-chart',
  templateUrl: './state-chart.component.html',
  styleUrls: ['./state-chart.component.scss']
})
export class StateChartComponent implements OnInit, AfterViewInit {
  @ViewChild('stateChartContainer') chartContainer: ElementRef;

  @Input() data: any[] = [];

  chartID = 'STATE_CHART_';

  constructor() {
    this.chartID = this.generateID();
  }

  ngOnInit(): void {
    this.initData();
  }

  ngAfterViewInit(): void {
    this.draw(this.data);
  }

  generateID(prefix = 'STATE_CHART_') {
    const rand = () => Math.floor(1000 + (9999 - 1000) * Math.random());

    return prefix + rand() + '_' + rand();
  }

  /////////////// INITIALIZE ///////////////
  initData() {
    this.data = WORK_MASTER;
  }

  /////////////// EVENT HANDLER ///////////////
  close() {

  }

  /////////////// DRAW ///////////////
  getNodeData(list: any[]): NodeData {
    const workMasters = this.sortWorkMaster(list);

    const nodeData: NodeData = {
      states: [],
      nodes: []
    };

    for (const item of workMasters) {
      if (item && item.work) {
        nodeData.states.push(item.work);
      }

      if (item && item.nextWorks) {
        for (const work of item.nextWorks) {
          nodeData.nodes.push({
            from: item.work,
            to: work.nextWork,
            label: work.nextStatus
          });
        }
      }
    }

    return nodeData;
  }

  sortWorkMaster(list: any[]): any[] {
    const workMasters: any[] = lodash.cloneDeep(list);

    workMasters.map((w, i) => {
      w.to = [];
      w.nextWorks = [];
    });

    workMasters.unshift({
      id: 'none',
      work: 'none',
      materialSpecs: [],
      to: [],
      nextWorks: []
    });

    for (const item of workMasters) {
      if (item.materialSpecs && item.materialSpecs.length > 0) {
        for (const spec of item.materialSpecs) {
          const index = workMasters.findIndex(d => d.id === spec.lastWork);

          if (index !== undefined && index !== -1) {
            workMasters[index].to.push(item.id);
            workMasters[index].nextWorks.push({ nextWork: item.work, nextStatus: spec.lastStatus });
          }
        }
      }
    }

    return workMasters;
  }

  draw(data: any[]): void {
    // TODO
    const nodeData = this.getNodeData(this.data);
    console.log({chartID: this.chartID, nodeData});
  }

}
