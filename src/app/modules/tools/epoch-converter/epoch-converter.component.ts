import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NotifyService } from '../../services/notify.service';

import * as moment from 'moment';

@Component({
  selector: 'app-epoch-converter',
  templateUrl: './epoch-converter.component.html',
  styleUrls: ['./epoch-converter.component.scss']
})
export class EpochConverterComponent implements OnInit {

  // ecclock
  ecclock = moment().unix();

  // timestamp to human date
  intervalClock;
  timestampCtrl: FormControl = new FormControl();
  parsedHumanDate = {
    utc: undefined,
    local: undefined,
    error: undefined
  };

  // human date to timestamp
  humanDateForm: FormGroup;
  parsedTimestamp = {
    timestamp: undefined,
    dateUtc: undefined,
    dateLocal: undefined,
    error: undefined
  };

  constructor(
    private formbuilder: FormBuilder,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.initEcClock();
    this.initTimestamp2HumanDate();
    this.initHumanDate2TimestampForm();
  }

  initEcClock() {
    this.intervalClock = setInterval(() => {
      this.ecclock = moment().unix();
    }, 1000);
  }

  initTimestamp2HumanDate() {
    const now = moment().unix();
    this.timestampCtrl.setValue(now);
  }

  initHumanDate2TimestampForm() {
    const now = moment();

    this.humanDateForm = this.formbuilder.group({
      year: [now.year(), [Validators.required, Validators.min(1970)]],
      month: [now.month() + 1, []],
      date: [now.date()],
      hour: [now.hour()],
      minute: [now.minute()],
      second: [now.second()],
      meridiem: ['AM'], // 'AM' || 'PM'
      timezone: ['gmt'], // 'gmt' || 'local'
    });
  }

  /////////////// ECCLOCK ///////////////
  onClockHover() {
    if (this.intervalClock) {
      clearInterval(this.intervalClock);
    }
  }

  copyClock() {

  }

  /////////////// TIMESTAMP TO HUMAN DATE ///////////////
  epoch2human() {
    const format = 'dddd, MMMM DD, YYYY HH:mm:ss A';
    let humanDateUtc = '';
    let humanDateLocal = '';
    let errorMessage;

    try {
      const unixTimestamp = Number.parseInt(this.timestampCtrl.value, 10);

      if (Number.isNaN(unixTimestamp)) {
        throw Error('Sorry, this timestamp is not valid');
      }

      const momentObj = moment.unix(unixTimestamp);

      if (!momentObj.isValid()) {
        throw Error('Sorry, this timestamp is not valid');
      }

      humanDateUtc = momentObj.utc().format(format);
      humanDateLocal = momentObj.local().format(format + ' (Z)');

    } catch (error) {
      console.error(error);
      errorMessage = error;
    }

    this.parsedHumanDate.utc = humanDateUtc;
    this.parsedHumanDate.local = humanDateLocal;
    this.parsedHumanDate.error = errorMessage;
  }

  /////////////// HUMAN DATE TO TIMESTAMP ///////////////
  human2epoch() {
    const form = this.humanDateForm.value;

    const invalidForm = this.validateHumanDateForm();
    if (invalidForm) {
      this.parsedTimestamp.error = invalidForm;
      this.parsedTimestamp.timestamp = undefined;
      this.parsedTimestamp.dateUtc = undefined;
      this.parsedTimestamp.dateLocal = undefined;
      return;
    }

    const momentObj = moment();

    if (form.timezone === 'local') {
      momentObj.local();
    } else {
      momentObj.utc();
    }

    momentObj.set({
      year: form.year,
      month: form.month - 1,
      date: form.date,
      hour: form.hour,
      minute: form.minute,
      second: form.second,
    });

    this.parsedTimestamp.timestamp = momentObj.unix();
    this.parsedTimestamp.dateUtc = momentObj.utc().format('dddd, MMMM M, YYYY HH:mm:ss A');
    this.parsedTimestamp.dateLocal = momentObj.local().format('dddd, MMMM M, YYYY HH:mm:ss A (Z)');
  }

  validateHumanDateForm() {
    const form = this.humanDateForm.value;

    const isNull = (value) => {
      return value === undefined || value === null;
    };

    if (isNull(form.year) || form.year < 1970) {
      return 'Invalid year';
    }

    if (isNull(form.month) || form.month < 1 || form.month > 12) {
      return 'Invalid month';
    }

    if (isNull(form.date) || form.date < 1 || form.date > 31) {
      return 'Invalid date';
    }

    if (isNull(form.hour) || form.hour < 0 || form.hour > 23) {
      return 'Invalid hour';
    }

    if (isNull(form.minute) || form.minute < 0 || form.minute > 59) {
      return 'Invalid minute';
    }

    if (isNull(form.second) || form.second < 0 || form.second > 59) {
      return 'Invalid second';
    }
  }

}
