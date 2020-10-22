import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as lodash from 'lodash';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit, OnChanges {
  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() source: any[] = [];
  @Input() label: string;
  @Input() multiple = false;
  @Input() required = true;
  @Input() enableSearch = false;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  valueCtrl: FormControl = new FormControl();
  filterCtrl: FormControl = new FormControl();
  filteredOptions$: Observable<any[]>;

  selected: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.valueCtrl.setValue(this.value ? this.value : undefined);
    }
  }

  init() {

    this.filteredOptions$ = this.filterCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  filter(value: string) {
    const search: string = value ? value.toLowerCase().trim() : '';

    return this.source.filter(d => {
      const id = d.id ? d.id.toLowerCase().indexOf(search) !== -1 : false;
      const name = d.name ? d.name.toLowerCase().indexOf(search) !== -1 : false;

      return id || name;
    });
  }

  onOpenSelect(event) {
    this.onClearSearch();
  }

  onSelectionChange(event: MatSelectChange) {
    this.selected = event.value;
    this.valueChange.emit(event.value);
  }

  onClearSearch() {
    this.filterCtrl.setValue('');

    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }

}
