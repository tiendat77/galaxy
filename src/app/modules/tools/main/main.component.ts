import { Component, OnInit } from '@angular/core';

import { TOOL_CHILDRENDS } from '../../../../environments/menu';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  components = TOOL_CHILDRENDS;

  constructor() { }

  ngOnInit(): void {
  }

}
