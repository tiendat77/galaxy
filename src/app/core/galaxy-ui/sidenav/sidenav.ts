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
  @Output() closed: EventEmitter<void> = new EventEmitter();

  @ViewChild('overlay') overlayRef: ElementRef;

  constructor() { }

  ngOnChanges(changes) {
    if (changes.show) {
      this.toggle();
    }

    if (changes.pinned) {
      this.pin();
    }
  }

  ngAfterViewInit() {
    this.toggle();
    this.auto();
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
