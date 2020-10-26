import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDatepicker } from '@angular/material/datepicker';

import { NotifyService } from '../../services/notify.service';

import * as moment from 'moment';

@Component({
  selector: 'app-form-date-time',
  templateUrl: './form-date-time.component.html',
  styleUrls: ['./form-date-time.component.scss']
})
export class FormDateTimeComponent implements OnInit, OnChanges {
  @ViewChild('timeMenuTrigger') timeMenuTrigger: MatMenuTrigger;

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

  /**
   * allow keys for time input
   * arrows key, backspace, delete
   */
  allowedKeys: number[] = [ 37, 38, 39, 40, 8, 46 ];

  constructor(
    private notify: NotifyService
  ) { }

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
  }

  initDefault() {
    const now = new Date();

    this.valueCtrl = moment(now);
    this.dateCtrl.setValue(now);
    this.hourCtrl.setValue(now.getHours());
    this.minuteCtrl.setValue(now.getMinutes());
  }

  /////////////// VALUE CHANGE ///////////////
  onDateChange() {
    const selectedDate: Date = this.dateCtrl.value;

    if (!this.isValidDate(selectedDate)) {
      this.notify.notify('Ngay khong hop le');
      return;
    }

    this.valueCtrl = moment(this.valueCtrl).set({
      date: selectedDate.getDate(),
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });

    this.onValueChange();
  }

  onTimeChange() {
    const hour = this.hourCtrl.value;
    const minute = this.minuteCtrl.value;
    const second = this.secondCtrl.value;

    if (!this.isValidTime(hour, minute, second)) {
      this.notify.notify('Thoi gian khong hop le');
      return;
    }

    this.valueCtrl = moment(this.valueCtrl).set({ hour, minute, second });
    this.onValueChange();
    this.timeMenuTrigger.closeMenu();
  }

  onValueChange() {
    if (this.valueCtrl.isValid()) {
      this.valueChange.emit(this.valueCtrl.unix());
    }
  }

  /////////////// EVENT HANDLERS ///////////////
  openDatePicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

  incrementHour() {
    const hour = this.hourCtrl.value;

    if (hour === 23) {
      this.hourCtrl.setValue(0);
      return;
    }

    if (hour > 23) {
      this.hourCtrl.setValue(23);
      return;
    }

    this.hourCtrl.setValue(hour + 1);
  }

  decrementHour() {
    const hour = this.hourCtrl.value;

    if (hour === 0) {
      this.hourCtrl.setValue(23);
      return;
    }

    if (hour < 0) {
      this.hourCtrl.setValue(0);
      return;
    }

    this.hourCtrl.setValue(hour - 1);
  }

  incrementMinute() {
    const minute = this.minuteCtrl.value;

    if (minute === 59) {
      this.minuteCtrl.setValue(0);
      return;
    }

    if (minute > 59) {
      this.minuteCtrl.setValue(59);
      return;
    }

    this.minuteCtrl.setValue(minute + 1);
  }

  decrementMinute() {
    const minute = this.minuteCtrl.value;

    if (minute === 0) {
      this.minuteCtrl.setValue(59);
      return;
    }

    if (minute < 0) {
      this.minuteCtrl.setValue(0);
      return;
    }

    this.minuteCtrl.setValue(minute - 1);
  }

  incrementSecond() {
    const second = this.secondCtrl.value;

    if (second === 59) {
      this.secondCtrl.setValue(0);
      return;
    }

    if (second > 59) {
      this.secondCtrl.setValue(59);
      return;
    }

    this.secondCtrl.setValue(second + 1);
  }

  decrementSecond() {
    const second = this.secondCtrl.value;

    if (second === 0) {
      this.secondCtrl.setValue(59);
      return;
    }

    if (second < 0) {
      this.secondCtrl.setValue(0);
      return;
    }

    this.secondCtrl.setValue(second - 1);
  }

  isValidDate(date: Date) {
    return moment(date).isValid();
  }

  isValidTime(hour: number, minute: number, second: number) {
    if (hour < 0 || hour > 23) {
      return false;
    }

    if (minute < 0 || minute > 59) {
      return false;
    }

    if (second < 0 || second > 59) {
      return false;
    }

    return true;
  }

  preventKeysForTime(event) {
    const chr = String.fromCharCode(event.which);
    const keyCode = event.keyCode;

    if (this.allowedKeys.indexOf(keyCode) !== -1) {
      return true;
    }

    if (`0123456789`.indexOf(chr) === -1) {
      return false;
    }
  }

}
