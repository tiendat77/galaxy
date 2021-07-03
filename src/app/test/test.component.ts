import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../core/services/translate.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}
