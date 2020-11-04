import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { toUnsign } from '../../../shared/utils';
// import { toUnsign } from '../../../utils/utils';

import * as moment from 'moment-timezone';

export interface Zone {
  id: string;
  name: string;
  offset: string; // utc
  group: string;
}

@Component({
  selector: 'app-form-select-timezone',
  templateUrl: './form-select-timezone.component.html',
  styleUrls: ['./form-select-timezone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectTimezoneComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() required = true;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  valueCtrl: FormControl = new FormControl();
  filterCtrl: FormControl = new FormControl();
  filteredZones$: Observable<any[]>;

  zones: any[]; // full timezone list
  scrollHeight = '200px';

  constructor() { }

  ngOnInit(): void {
    this.initTimezones();
    this.initFilterControl();
    this.selectUserTimezone();
  }

  initTimezones() {
    const zones = [];

    const tzNames = moment.tz.names();
    tzNames.map((zone: string) => {
      zones.push(this.setZoneObject(zone));
    });

    this.zones = zones;
  }

  setZoneObject(zone: string): Zone {
    const tz = moment.tz(zone);

    return {
      id: zone,
      name: zone.replace(/_/g, ' '),
      offset: 'UTC' + tz.format('Z'),
      group: zone.split('/', 1)[0]
    };
  }

  initFilterControl() {
    this.filteredZones$ = this.filterCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  /////////////// EVENT HANDLERS ///////////////
  onOpenSelect(isOpen) {
    if (isOpen) {
      this.onClearSearch();

      // fix blank viewport
      this.viewport.scrollToOffset(10);
    }
  }

  onClearSearch() {
    this.filterCtrl.setValue('');

    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }

  onSelectionChange(event: MatSelectChange) {
    console.log(event.value);
  }

  selectUserTimezone() {
    const tz = moment.tz.guess();
    console.log(tz);
  }

  /////////////// UTILS ///////////////
  filter(search: string) {
    const value: string = search ? toUnsign(search).toLowerCase().trim() : '';

    const filteredOption: any[] = this.zones.filter(d => {
      const id = toUnsign(d.id).toLowerCase().indexOf(value) !== -1;
      const name = toUnsign(d.name).toLowerCase().indexOf(value) !== -1;
      return id || name;
    });

    this.updateScrollHeight(filteredOption.length);

    return filteredOption;
  }

  updateScrollHeight(len: number) {
    if (len < 4) {
      this.scrollHeight = (len * 42) + 'px';

    } else {
      this.scrollHeight = '200px';
    }
  }

}
