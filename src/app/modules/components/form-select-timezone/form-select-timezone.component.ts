import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { TZ_CODES } from './tz-codes';
import { TZ_ZONES } from './tz-zones';
import { toUnsign } from '../../../shared/utils';
// import { toUnsign } from '../../../utils/utils';

import * as momentZone from 'moment-timezone';
import * as lodash from 'lodash';

export interface Zone {
  id: string;
  name: string;
  utc?: string;
  offset?: string;
  nOffset?: number;
  abbr?: string;
}

export interface ZoneGroup {
  name: string;
  zones: Zone[];
  disabled?: boolean;
}

@Component({
  selector: 'app-form-select-timezone',
  templateUrl: './form-select-timezone.component.html',
  styleUrls: ['./form-select-timezone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectTimezoneComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() label = 'Timezone';
  @Input() required = true;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  valueCtrl: FormControl = new FormControl();
  filterCtrl: FormControl = new FormControl();
  filteredZoneGroups$: Observable<ZoneGroup[]>;

  zoneGroups: ZoneGroup[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initTimezones();
    this.initFilterControl();
    this.selectUserTimezone();
  }

  initTimezones() {
    const zoneGroups: ZoneGroup[] = []; // the return value

    const zoneMap = {};
    TZ_ZONES.forEach(zone => {
      zoneMap[zone.name] = zone.cca2;
    });

    const codeMap = {};
    TZ_CODES.forEach((code) => {
      codeMap[code.cca2] = code.name;
    });

    // Group the timezones by their country code
    const countryMap = {};

    const tzNames = momentZone.tz.names();
    tzNames.forEach((zone: string) => {
      const timeZone: Zone = this.setZoneObject(zone);

      if (zoneMap[zone]) {
        const code = zoneMap[zone];

        if (!countryMap[code]) {
          countryMap[code] = [];
        }

        countryMap[code].push(timeZone);
      }
    });

    // Add the grouped countries to the zoneGroups array with their country name as the group option
    const countryCodes = Object.keys(countryMap);
    for (const cc of countryCodes) {
      const zoneGroup: ZoneGroup = {
        name: codeMap[cc],
        zones: countryMap[cc]
      };

      zoneGroups.push(zoneGroup);
    }

    // Sort by country name
    this.zoneGroups = lodash.sortBy(zoneGroups, 'name');
  }

  setZoneObject(zone: string): Zone {
    const tz = momentZone.tz(zone);
    const utc = tz.format('Z');
    const name = zone.replace(/_/g, ' ');

    return {
      id: zone,
      name: `${name} (${utc})`,
      offset: 'UTC' + utc,
      // utc: utc,
      // nOffset: tz.utcOffset(),
      // abbr: tz.zoneAbbr()
    };
  }

  initFilterControl() {
    this.filteredZoneGroups$ = this.filterCtrl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(value => this.filter(value))
    );
  }

  /////////////// EVENT HANDLERS ///////////////
  onOpenSelect(isOpen) {
    this.onClearSearch();
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
    this.valueChange.emit(event.value);
  }

  selectUserTimezone() {
    const zone = momentZone.tz.guess();
    this.valueCtrl.setValue(zone);
  }

  /////////////// UTILS ///////////////
  filter(search: string) {
    const value: string = search ? toUnsign(search).toLowerCase().trim() : '';

    if (!value) {
      return this.zoneGroups.slice();
    }

    const filteredGroups: ZoneGroup[] = this.zoneGroups.filter(d => {
      const name = d.name.toLowerCase().indexOf(value) !== -1;
      const children = d.zones.filter(z => z.name.toLowerCase().indexOf(value) !== -1).length > 0;

      return name || children;
    });

    return filteredGroups;
  }

}
