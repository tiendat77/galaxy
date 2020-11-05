import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// Rxjs
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Service
import { GalaxyService } from './galaxy.service';
import { NotifyService } from '../../../core/services/notify.service';
import { LoaderService } from '../../../core/services/loader.service';

// Utils
import { toUnsign, isNull } from './utils';

import * as lodash from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyComponent implements OnInit {


  constructor(
    public service: GalaxyService,
    private loader: LoaderService,
    private notify: NotifyService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  test() {
  }

}
