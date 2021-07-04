import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'galaxy-sidenav',
  templateUrl: 'sidenav.html',
  styleUrls: ['sidenav.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxySidenav implements OnChanges, AfterViewInit {

  @Input() show = false;
  @Input() pinned = false;
  @Input() autoHide = false;
  @Input() align: 'left' | 'right'  = 'left';
  @Output() closed: EventEmitter<void> = new EventEmitter();

  @ViewChild('overlay') overlayRef: ElementRef;

  constructor() { }

  ngOnChanges(changes) {
    if (changes.show) {
      this.visibility();
    }

    if (changes.pinned) {
      this.pin();
    }

    if (changes.align) {
      this.position();
    }
  }

  ngAfterViewInit() {
    this.auto();
    this.position();
    this.visibility();
  }

  private auto() {
    const element = this.overlayRef?.nativeElement as HTMLElement;
    if (!element) { return; }

    if (this.autoHide) {
      element.classList.add('auto');
      element.classList.remove('show');

    } else {
      element.classList.remove('auto');
    }
  }

  private visibility() {
    if (this.show) {
      return this.open();
    }

    return this.close();
  }

  private position() {
    const element = this.overlayRef?.nativeElement as HTMLElement;
    if (!element) { return; }

    if (this.align === 'left') {
      element.classList.add('align-left');
      element.classList.remove('align-right');

    } else {
      element.classList.add('align-right');
      element.classList.remove('align-left');
    }
  }

  public toggle() {
    if (!this.show) {
      return this.open();
    }

    return this.close();
  }

  public pin() {
    if (!this.pinned) {
      return this.tack();
    }

    return this.untack();
  }

  public tack() {
    const element = this.overlayRef?.nativeElement as HTMLElement;
    if (!element) { return; }

    this.pinned = true;
    element.classList.add('pinned');
  }

  public untack() {
    const element = this.overlayRef?.nativeElement as HTMLElement;
    if (!element) { return; }

    this.pinned = false;
    element.classList.remove('pinned');
  }

  public open() {
    const element = this.overlayRef?.nativeElement as HTMLElement;
    if (!element) { return; }

    this.show = true;
    element.classList.add('show');
  }

  public close() {
    const element = this.overlayRef?.nativeElement as HTMLElement;
    if (!element) { return; }

    this.show = false;
    element.classList.remove('show');
  }

  public prevent(event: Event) {
    event.stopPropagation();
  }

  public dismiss() {
    const element = this.overlayRef?.nativeElement as HTMLElement;
    if (!element) { return; }

    this.show = false;
    element.classList.remove('show');
  }

}
