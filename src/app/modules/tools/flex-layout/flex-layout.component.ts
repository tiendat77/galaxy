import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.scss']
})
export class FlexLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('demo') demoRef: ElementRef;

  alignmentForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
    this.initSubcription();
  }

  ngAfterViewInit() {
    this.initView();
  }

  private initForm() {
    this.alignmentForm = new FormGroup({
      direction: new FormControl('row')
    });
  }

  private initSubcription() {
    this.alignmentForm.valueChanges.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.alignmentChanged();
    });
  }

  private initView() {
    const element = this.demoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    element.style.height = '100%';
    element.style.display = 'flex';
    element.style.flexDirection = 'row';
    element.style.boxSizing = 'border-box';
  }

  private getAlignmentFormValue() {
    const styles = this.alignmentForm.value;

    return {
      flexDirection: styles.direction
    };
  }

  private alignmentChanged() {
    const element = this.demoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    const styles = this.getAlignmentFormValue();

    element.style.flexDirection = styles.flexDirection;
  }

  copy() {
    const element = this.demoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    const styles = element.getAttribute('style').toString();
    console.log(styles.split(';'));
  }

}
