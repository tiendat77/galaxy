import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

export interface FlexLayoutStyles {
  align: string;
  justify: string;
  direction: string;
}

@Component({
  selector: 'app-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.scss']
})
export class FlexLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('flexDemo') flexDemoRef: ElementRef;

  flexStyles: string;
  flexForm: FormGroup;

  get flexDirection() {
    return this.flexForm?.get('direction').value;
  }

  constructor() { }

  ngOnInit() {
    this.initForm();
    this.initSubcription();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initView();
      this.styleChanged();
    }, 100);
  }

  private initForm() {
    this.flexForm = new FormGroup({
      align: new FormControl('flex-start'),
      justify: new FormControl('flex-start'),
      direction: new FormControl('row'),
    });
  }

  private initSubcription() {
    this.flexForm.valueChanges.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.flexChanged();
      this.styleChanged();
    });
  }

  private initView() {
    const element = this.flexDemoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    element.style.height = '100%';
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    element.style.boxSizing = 'border-box';
    element.style.alignItems = 'flex-start';
    element.style.alignContent = 'flex-start';
    element.style.justifyContent = 'flex-start';
  }

  private getFlexFormValue() {
    const styles = this.flexForm.value;

    return styles as FlexLayoutStyles;
  }

  private flexChanged() {
    const element = this.flexDemoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    const styles = this.getFlexFormValue();

    element.style.alignItems = styles.align;
    element.style.alignContent = styles.align;
    element.style.justifyContent = styles.justify;
    element.style.flexDirection = styles.direction;
  }

  private styleChanged() {
    const element = this.flexDemoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    const raw = element.getAttribute('style').toString();
    const _styles = raw.split(';').map(s => s?.trim()).join(';\n');
    this.flexStyles = _styles;
  }

  copy() {
    console.log(this.flexStyles);
  }

}
