import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import * as moment from 'moment';

interface ConvertedTime {
  gmt: string;
  local: string;
  relative: string;
  unix?: number;
  format?: string;
}

interface HumanTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

@Component({
  selector: 'app-unix-converter',
  templateUrl: './unix-converter.component.html',
  styleUrls: ['./unix-converter.component.scss']
})
export class UnixConverterComponent implements OnInit, OnDestroy {

  /**Models */
  currentUnix: number;
  convertedUnixTime: ConvertedTime;
  convertedHumanDate: ConvertedTime;

  /** Forms */
  humanTimeCtrl: FormGroup;
  unixTimestampCtrl: FormControl;

  private subscription$: Subscription;

  constructor() { }

  ngOnInit() {
    this.initModels();
    this.initFormValue();
    this.initClockInterval();
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  private initModels() {
    this.humanTimeCtrl = new FormGroup({
      year: new FormControl(),
      month: new FormControl(),
      day: new FormControl(),
      hour: new FormControl(),
      minute: new FormControl(),
      second: new FormControl(),
    });
    this.unixTimestampCtrl = new FormControl();
    this.subscription$ = new Subscription();
  }

  private initFormValue() {
    const now = moment();

    this.setHumanTimeForm({
      year: now.year(),
      month: now.month() + 1,
      day: now.date(),
      hour: now.hour(),
      minute: now.minute(),
      second: now.second()
    });

    this.unixTimestampCtrl.setValue(now.unix());
  }

  private initClockInterval() {
    const unixInterval = interval(1000).subscribe(() => {
      this.currentUnix = moment().unix();
    });

    this.subscription$.add(unixInterval);
  }

  unix2human() {
    const timestamp = this.unixTimestampCtrl.value;

    if (!timestamp) {
      this.convertedHumanDate = null;
      return;
    }

    const format = this.getTimestampFormat(timestamp);

    const _moment = moment.unix(timestamp/format.factor);

    if (!_moment.isValid()) {
      this.convertedHumanDate = null;
      this.unixTimestampCtrl.setErrors({invalid: true});
      return;
    }

    this.convertedHumanDate = {
      format: format.description,
      gmt: _moment.clone().utc().toString(),
      local: _moment.toLocaleString(),
      relative: _moment.fromNow(),
    };
  }

  private getTimestampFormat(timestamp: number) {
    const format = {
      format: '',
      factor: 1,
      description: 'Invalid'
    };

    const length = String(timestamp).length;

    if (length < 13) {
      format.format = 'seconds';
      format.description = 'Seconds';
      return format;
    }

    if (length < 16) {
      format.format = 'milliseconds';
      format.factor = 1000;
      format.description = 'Milliseconds (1/1,000 second)';
      return format;
    }

    if (length < 19) {
      format.format = 'microseconds';
      format.factor = 1000000;
      format.description = 'Microseconds (1/1,000,000 second)';
      return format;
    }

    if (length < 21) {
      format.format = 'nanoseconds';
      format.factor = 1000000000;
      format.description = 'Nanoseconds (1 billionth of a second)';
      return format;
    }

    return format;
  }

  human2unix() {
    if (!this.validateHumanTimeForm()) {
      this.humanTimeCtrl.setErrors({invalid: true});
      this.convertedUnixTime = {
        gmt: 'Invalid date',
        local: 'Invalid date',
        relative: 'Invalid date'
      };
      return;
    }

    const humanDate = this.getHumanTimeForm();

    const _moment = moment().set({
      year: humanDate.year,
      month: humanDate.month - 1,
      date: humanDate.day,
      hour: humanDate.hour,
      minute: humanDate.minute,
      second: humanDate.second,
    });

    this.convertedUnixTime = {
      gmt: _moment.clone().utc().toString(),
      local: _moment.toLocaleString(),
      relative: _moment.fromNow(),
      unix: _moment.unix(),
    };
  }

  jump2NextInput(event, nextInput?) {
    const keycode = event.keyCode || event.which;

    // 32: Space
    // 13: Enter
    // 9:  Tab
    if (keycode === 32 || keycode == 13 || keycode == 9) {
      event.preventDefault();
      event.stopPropagation();
      nextInput?.focus();
      return;
    }
  }

  private getHumanTimeForm() {
    return this.humanTimeCtrl.value as HumanTime;
  }

  private setHumanTimeForm(humanTime: HumanTime) {
    this.humanTimeCtrl.setValue(humanTime);
  }

  private validateHumanTimeForm() {
    const humanTime = this.getHumanTimeForm();

    if (!humanTime.year) {
      return false;
    }

    if (humanTime.month > 12 || humanTime.month < 1) {
      return false;
    }

    if (humanTime.day > 31 || humanTime.day < 1) {
      return false;
    }

    if (humanTime.hour > 24 || humanTime.hour < 0) {
      return false;
    }

    if (humanTime.minute > 59 || humanTime.minute < 0) {
      return false;
    }

    if (humanTime.second > 59 || humanTime.second < 0) {
      return false;
    }

    return true;
  }

}
