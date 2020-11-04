import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import * as moment from 'moment';
import { MOCK } from './mock';

@Component({
  selector: 'app-form-date-month-year',
  templateUrl: './form-date-month-year.component.html',
  styleUrls: ['./form-date-month-year.component.scss']
})
export class FormDateMonthYearComponent implements OnInit {
  @Input() data: any[] = MOCK;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  dayCtrl: FormControl = new FormControl();
  monthCtrl: FormControl = new FormControl();
  yearCtrl: FormControl = new FormControl();

  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  showDay = false;
  showMonth = false;
  showYear = false;

  constructor() { }

  ngOnInit(): void {
    this.initData();
    this.initModel();
  }

  initData() {
    for (const item of this.data) {
      if (item.type === 'day_in_month') {
        this.dayCtrl.setValue(item.value);
        this.showDay = true;
      }

      if (item.type === 'month_in_year') {
        this.monthCtrl.setValue(item.value);
        this.showMonth = true;
      }

      if (item.type === 'year') {
        this.yearCtrl.setValue(item.value);
        this.showYear = true;
      }
    }
  }

  initModel() {
    const now = moment();

    if (this.dayCtrl.value) {
      now.set({ date: this.dayCtrl.value });
    }

    if (this.monthCtrl.value) {
      now.set({ month: this.monthCtrl.value - 1 });
    }

    if (this.yearCtrl.value) {
      now.set({ year: this.yearCtrl.value });
    }

    const days: number[] = [];
    const months: number[] = [];
    const years: number[] = [];

    for (let i = now.year() - 10; i <= now.year() + 10; i++) {
      years.push(i);
    }

    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }

    for (let i = 1; i <= now.daysInMonth(); i++) {
      days.push(i);
    }

    this.days = days;
    this.months = months;
    this.years = years;
  }

  /////////////// EVENT HANDLERS ///////////////
  onSelectDay(event: MatSelectChange) {
    this.onValueChange();
  }

  onSelectMonth(event: MatSelectChange) {
    this.onValueChange();

    const selected = moment().set({
      month: event.value - 1,
      year: this.yearCtrl.value
    });

    const days: number[] = [];
    const daysInMonth = selected.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    if (this.dayCtrl.value > daysInMonth) {
      this.dayCtrl.setValue(daysInMonth);
    }

    this.days = days;
  }

  onSelectYear(event: MatSelectChange) {
    this.onValueChange();

    const selected = moment().set({
      month: this.monthCtrl.value - 1,
      year: event.value
    });

    const days: number[] = [];
    const daysInMonth = selected.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    if (this.dayCtrl.value > daysInMonth) {
      this.dayCtrl.setValue(daysInMonth);
    }

    this.days = days;
  }

  onValueChange() {
    for (const item of this.data) {
      if (item.type === 'day_in_month') {
        item.value = this.dayCtrl.value;
      }

      if (item.type === 'month_in_year') {
        item.value = this.monthCtrl.value;
      }

      if (item.type === 'year') {
        item.value = this.yearCtrl.value;
      }
    }

    this.dataChange.emit(this.data);
  }

}
