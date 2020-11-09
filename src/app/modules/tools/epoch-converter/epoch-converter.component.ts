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
  parsedEpochTimestamp: string;

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
      month: [now.month(), []],
      date: [now.date()],
      hour: [now.hour()],
      minute: [now.minute()],
      second: [now.second()],
      meridiem: ['AM'],
      timezone: ['']
    });
  }

  // ecclock
  onClockHover() {
    if (this.intervalClock) {
      clearInterval(this.intervalClock);
    }
  }

  epoch2human() {
    const format = 'dddd, MMMM M, YYYY HH:mm:ss A';
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

  human2epoch() {
    const options = this.humanDateForm.value;
    for (const key of Object.keys(options)) {
      const option = options[key];
      if (option === undefined || option === null || option.length === 0) {
        this.parsedEpochTimestamp = 'Invalid form';
        return;
      }
    }

    const momentObj = moment().set({
      year: options.year,
      month: options.month,
      date: options.date,
      hour: options.hour,
      minute: options.minute,
      second: options.second,
    });
  }

}
