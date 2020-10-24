import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { NotifyService } from '../../../core/services/notify.service';
import { LoaderService } from '../../../core/services/loader.service';

import { Report, ReportParam } from './interface';
import { REPORTS, PARAMS } from './mock';

import * as moment from 'moment';
import * as FileSaver from 'file-saver';

@Injectable()
export class GalaxyService {

  changeDetection$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  reports$: BehaviorSubject<Report[]> = new BehaviorSubject([]);
  selectedReport = { method: undefined, url: undefined, name: undefined };
  paramsDMY: ReportParam[] = [];
  params: ReportParam[] = [];

  auth = {
    apiUri: ''
  };

  constructor(
    private notify: NotifyService,
    private loader: LoaderService,
    private http: HttpClient,
  ) { }

  initReportsData() {
    const reportFunctions: any[] = REPORTS;

    const reports = reportFunctions.map(item => {
      const report: Report = {
        id: item.id,
        name: item.name ? item.name : item.id,
        apiDescription: item.apiDescription || '',
        href: item.href || '',
        permission: item.permission || ''
      };

      return report;
    });

    this.reports$.next(reports);
  }

  getReportParams(reportUrl: string) {
    return new Promise((resolve, reject) => {
      this.loader.start();

      this.params = [];
      this.paramsDMY = [];

      const paramsDMY: ReportParam[] = [];
      const params: ReportParam[] = [];

      const reportParams: ReportParam[] = PARAMS;
      for (const param of reportParams) {
        if (param.type === 'day_in_month' || param.type === 'month_in_year' || param.type === 'year') {
          paramsDMY.push(param);

        } else {
          params.push(param);
        }
      }

      this.params = params;
      this.paramsDMY = paramsDMY;
      this.selectedReport.url = 'http://api.leanwell.co/api/function_invocations/ole-csv-export?get_description=true';
      this.selectedReport.method = 'GET';

      setTimeout(() => {
        this.changeDetection$.next(true);
        this.loader.stop();
        resolve();
      }, 2000);
    });
  }

  export() {
    if (!this.validateParam()) {
      return;
    }

    this.loader.start();

    const raw: any[] = [...this.params, ...this.paramsDMY, this.getTimezoneParam()];
    const params: any[] = [];

    for (const item of raw) {
      if (!isNull(item.value)) {
        params.push({ id: item.id, value: item.value });
      }
    }

    const url = this.getRequestUrl(this.selectedReport.url, params);
    const method = this.selectedReport.method;
    const body = method === 'GET' ? {} : this.getRequestBody(params);

    this.http.request(method, url, {
      body,
      responseType: 'blob' as 'json',
      observe: 'response' as 'body'
    }).subscribe(
      (res: any) => {
        const filename = this.getFileName(res);
        const blob = new Blob([res.body], { type: 'blob' });

        FileSaver.saveAs(blob, filename);

        this.notify.pushSuccessTranslatedNotify('REPORTED.NOTIFY.EXPORT_SUCCESS');
        this.loader.stop();
      },
      (error: any) => {
        this.notify.pushTranslatedNotify('REPORTED.NOTIFY.EXPORT_FAIL');
        this.loader.stop();
        console.error(error);
      }
    );
  }

  private validateParam(): boolean {
    if (!this.selectedReport.url || !this.selectedReport.method) {
      this.notify.pushTranslatedNotify('REPORTED.NOTIFY.REPORT_INFO_ERROR');
      return false;
    }

    const params: any[] = [...this.params, ...this.paramsDMY];
    for (const item of params) {
      if (item.require && isNull(item.value)) {
        this.notify.pushTranslatedNotify('REPORTED.NOTIFY.INPUT_THE_FORM');
        return false;
      }
    }

    return true;
  }

  private getRequestUrl(url: string, params: any[]) {
    let apiUrl = this.auth.apiUri + url;

    if (params.length) {
      apiUrl += '?';
    }

    params.forEach((param, index) => {
      if (index !== 0) {
        apiUrl += '&';
      }

      apiUrl += `${param.id}=${param.value}`;
    });

    return apiUrl;
  }

  private getRequestBody(params: any[]) {
    const body = {};

    if (!params && !params.length) {
      return body;
    }

    params.forEach((param) => {
      body[param.id] = param.value;
    });

    return body;
  }

  private getTimezoneParam() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return { id: 'timezone', value: timezone };
  }

  private getFileName(response: any) {
    let filename: string;

    try {
      const contentDisposition: string = response.headers.get('Content-Disposition');
      const r = /filename=\"?([^;"]+)\"?;?/g;
      const filenameContent = r.exec(contentDisposition)[0];

      filename = filenameContent.split('filename=')[1];

    } catch (e) {
      console.error(e);
      filename = (this.selectedReport.name ? this.selectedReport.name : 'DULIEU') +
                 '-' + moment().format('DD-MM-YYYY') + '.csv';
    }

    return filename;
  }

  /////////////// UTILS ///////////////
  startLoading(timeout = 0) {
    setTimeout(() => {
      this.isLoading$.next(true);
    }, timeout);
  }

  stopLoading(timeout = 500) {
    setTimeout(() => {
      this.isLoading$.next(false);
    }, timeout);
  }

}

export function isNull(value) {
  return value === undefined || value === null || value.length === 0;
}
