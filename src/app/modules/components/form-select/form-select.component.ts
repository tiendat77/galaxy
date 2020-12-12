import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { MatOptionSelectionChange } from '@angular/material/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, filter, startWith } from 'rxjs/operators';

import * as lodash from 'lodash';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() label = 'Select';
  @Input() searchLabel = 'Search';
  @Input() searchBy: string[] = ['id'];
  @Input() appearance: 'legacy' | 'standard' | 'outline' = 'outline';
  @Input() multiple = false;
  @Input() required = true;
  @Input() enableSearch = false;

  @Input() value: any;
  @Input() options: any[] = [];
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  valueCtrl: FormControl = new FormControl();
  filterCtrl: FormControl = new FormControl();

  filteredOptions$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  filterSubscription: Subscription;
  scrollSubscription: Subscription;

  oldValue;
  text = '';
  tooltip: string;
  virtualScrollHeight = 192;

  constructor(
    private cdr: ChangeDetectorRef,
    readonly sd: ScrollDispatcher
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onClearSearch();

    if (changes.value) {
      this.fake();
      this.valueCtrl.setValue(this.value);
    }
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }

    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  private initialize() {
    // init search subscription
    this.filterSubscription = this.filterCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
    ).subscribe((value) => {
      const filtered: any[] = this.filter(value);

      this.filteredOptions$.next(filtered);
      this.virtualScrollHeight = filtered.length < 5 ? filtered.length * 48 : 192;

      // scroll to top of view port
      this.resetVirtualScroll();
    });

    // init view port scroll subscription
    this.scrollSubscription = this.sd.scrolled().pipe(
      debounceTime(500),
      filter((scrollable) => this.viewport === scrollable),
    ).subscribe(() => {
      this.viewport.checkViewportSize();
      // this.cdr.detectChanges();
    });
  }

  private filter(search: string) {
    const value: string = search ? search.toLowerCase().trim() : '';

    if (!value) {
      return this.options.slice();
    }

    return this.options.filter(d => {
      const result = [];

      this.searchBy.forEach(field => {
        result.push(d[field] && d[field].toLowerCase().indexOf(value) !== -1);
      });

      // return true if match one of various field
      return result.reduce((accumulator, current) => accumulator || current);
    });
  }

  private compare(): boolean {
    return lodash.isEqual(lodash.sortBy(this.oldValue), lodash.sortBy(this.value));
  }

  private fake() {
    if (this.multiple) {
      this.text = this.value.join(',');
      this.tooltip = this.value.join('\n');

    } else {
      this.text = this.value;
      this.tooltip = '';
    }
  }

  resetVirtualScroll() {
    setTimeout(() => {
      // fix blank viewport on virtual scroll
      if (this.viewport) {
        this.viewport.scrollToOffset(10);
        this.viewport.scrollToOffset(0);
      }
    }, 100);
  }

  onOpenedChange(isOpen) {
    if (isOpen) {
      this.oldValue = lodash.cloneDeep(this.value);
      this.onClearSearch();
      this.focusSearchInput();
      return;
    }

    // on mat-select panel closed
    this.fake();

    const isEqual = this.compare();
    if (!isEqual) {
      this.valueChange.emit(this.value);
    }
  }

  onSelectionChange(event: MatOptionSelectionChange) {
    if (!event.isUserInput) {
      return;
    }

    const value = event.source.value;

    if (!this.multiple) {
      this.value = value;
      this.valueCtrl.setValue(value);
      return;
    }

    const idx = this.value.indexOf(value);

    if (idx > -1) {
      this.value.splice(idx, 1);

    } else {
      this.value.push(value);
    }

    this.valueCtrl.patchValue(this.value);
  }

  onClearSearch() {
    this.filterCtrl.setValue('');
    this.blurSearchInput();
  }

  focusSearchInput() {
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }

  blurSearchInput() {
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.blur();
      }
    }, 50);
  }

  clear(event) {
    event.stopPropagation();

    this.value = [];
    this.valueChange.emit(this.value);
  }

  prevent(event) {
    event.stopPropagation();
  }

  trackByFn(index, item) {
    return item.id || index;
  }

}
