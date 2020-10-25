import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-form-date-time',
  templateUrl: './form-date-time.component.html',
  styleUrls: ['./form-date-time.component.scss']
})
export class FormDateTimeComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() required = true;
  @Input() showMinutes = true;
  @Input() showSeconds = true;
  @Input() showSpinners = true;

  /* value is unix timestamp */
  @Input() value: number;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  valueCtrl: moment.Moment;
  dateCtrl: FormControl = new FormControl();
  hourCtrl: FormControl = new FormControl(0, [Validators.required, Validators.max(23), Validators.min(0)]);
  minuteCtrl: FormControl = new FormControl(0, [Validators.max(59), Validators.min(0)]);
  secondCtrl: FormControl = new FormControl(0, [Validators.max(59), Validators.min(0)]);

  isTimeMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
    if (this.value) {
      this.initValueInput();
    } else {
      this.initDefault();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.initValueInput();
    }
  }

  initValueInput() {
    const value = moment.unix(this.value);
    this.valueCtrl = value;
    this.dateCtrl.setValue(value.toDate());
    this.hourCtrl.setValue(value.hours());
    this.minuteCtrl.setValue(value.minutes());
    this.secondCtrl.setValue(value.seconds());
  }

  initDefault() {
    const now = new Date();

    this.valueCtrl = moment(now);
    this.dateCtrl.setValue(now);
    this.hourCtrl.setValue(now.getHours());
    this.minuteCtrl.setValue(now.getMinutes());
    this.secondCtrl.setValue(now.getSeconds());
  }

  /////////////// VALUE CHANGE ///////////////
  onDateChange() {
    const selectedDate: Date = this.dateCtrl.value;

    this.valueCtrl = moment(this.valueCtrl).set({
      date: selectedDate.getDate(),
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });

    this.onValueChange();
  }

  onTimeChange() {
    this.isTimeMenuOpen = false;
    console.log('time change');
  }

  onValueChange() {
    if (this.valueCtrl.isValid()) {
      this.valueChange.emit(this.valueCtrl.unix());
    }
  }

  /////////////// EVENT HANDLERS ///////////////
  onOpenTimeMenu() {
    this.isTimeMenuOpen = true;
  }

  incrementHour() {
    let hour = this.hourCtrl.value;

    if (hour === 23) {
      hour = 0;
    } else if (hour > 23) {
      hour = 23;
    } else {
      hour = hour + 1;
    }

    this.hourCtrl.setValue(hour);
  }

  decrementHour() {
    let hour = this.hourCtrl.value;

    if (hour === 0) {
      hour = 23;
    } else if (hour < 0) {
      hour = 0;
    } else {
      hour = hour - 1;
    }

    this.hourCtrl.setValue(hour);
  }

}
