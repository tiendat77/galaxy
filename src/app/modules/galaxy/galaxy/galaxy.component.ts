import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// Rxjs
import { Observable } from 'rxjs';
import { map, skip, startWith } from 'rxjs/operators';

// Service
import { GalaxyService } from './galaxy.service';
import { NotifyService } from '../../../core/services/notify.service';
import { LoaderService } from '../../../core/services/loader.service';

// Utils
import { Report } from './interface';
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

  reportCtrl: FormControl = new FormControl();
  filteredReports$: Observable<Report[]>;

  reportID: string;

  constructor(
    public service: GalaxyService,
    private loader: LoaderService,
    private notify: NotifyService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.service.initReportsData();
    this.initUrlParams();
    this.initSubscription();
  }

  /////////////// INITIALIZE ///////////////
  initUrlParams() {
    const reportID = this.activatedRoute.snapshot.queryParamMap.get('reportID');

    if (reportID) {
      const exist = this.service.reports$.value.find(d => d.id === reportID);

      if (exist) {
        this.reportID = reportID;
        this.onSelectReport(exist);
        return;
      }

      // if couldn't find report with reportID then clear url param;
      this.updateUrlParams();
    }
  }

  initSubscription() {
    this.service.changeDetection$.subscribe(() => {
      this.cdr.detectChanges();
    });

    this.service.reports$.subscribe(value => {
      this.initAutocomplete();
      this.cdr.detectChanges();
    });
  }

  initAutocomplete() {
    this.filteredReports$ = this.reportCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterReport(value))
    );
  }

  /////////////// EVENT HANDLERS ///////////////
  refresh() {
    if (this.reportID) {
      const report = this.service.reports$.value.find(d => d.id === this.reportID);

      if (report) {
        this.service.getReportParams(report.apiDescription);
      }
    }
  }

  onClearSearch() {
    this.reportCtrl.setValue('');
  }

  onClearForm() {
    for (const param of [...this.service.params, ...this.service.paramsDMY]) {
      param.value = undefined;
    }
  }

  export() {
    this.service.export();
  }

  onSelectReport(report) {
    if (!report || !report.id || !report.apiDescription) {
      return;
    }

    this.reportID = report.id;
    this.updateUrlParams();

    this.service.selectedReport = {
      name: report.name,
      url: undefined,
      method: undefined
    };
    this.service.getReportParams(report.apiDescription);
  }

  /////////////// UTILS ///////////////
  filterReport(value: string) {
    const search: string = value ? value.toLowerCase().trim() : '';

    return this.service.reports$.value.filter(d => {
      const id = d.id ? d.id.indexOf(search) !== -1 : false;
      const name = d.name ? d.name.indexOf(search) !== -1 : false;

      return id || name;
    });
  }

  updateUrlParams() {
    const routerParameter = { reportID: undefined };

    if (this.reportID) {
      routerParameter.reportID = this.reportID;
    }

    // this.router.navigate(['/reported'], { queryParams: routerParameter });
    this.router.navigate(['/galaxy'], { queryParams: routerParameter });
  }

  test() {
    // console.log('reports', this.service.reports$.value);
    console.log('params: ', this.service.params);
    console.log('params DMY: ', this.service.paramsDMY);
  }

}
