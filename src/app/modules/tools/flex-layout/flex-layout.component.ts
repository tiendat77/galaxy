import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

interface FlexLayoutStyles {
  align: string;
  justify: string;
  direction: string;
}

interface FillLayoutStyles {
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

  @ViewChild('fillDemo') fillDemoRef: ElementRef;

  fillStyles: string;
  fillForm: FormGroup;

  get fillDirection() {
    return this.fillForm?.get('direction').value;
  }

  constructor() { }

  ngOnInit() {
    this.initForm();
    this.initSubcription();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initFlexView();
      this.flexStylesChanged();

      this.initFillView();
      this.fillStylesChanged();
    }, 100);
  }

  private initForm() {
    this.flexForm = new FormGroup({
      align: new FormControl('flex-start'),
      justify: new FormControl('flex-start'),
      direction: new FormControl('row'),
    });

    this.fillForm = new FormGroup({
      direction: new FormControl('row')
    });
  }

  private initSubcription() {
    this.flexForm.valueChanges.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.flexChanged();
      this.flexStylesChanged();
    });

    this.fillForm.valueChanges.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.fillChanged();
      this.fillStylesChanged();
    });
  }

  private initFlexView() {
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

  /////////////// FLEX LAYOUT ///////////////
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

  private flexStylesChanged() {
    const element = this.flexDemoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    this.flexStyles = this.getStyles(element);
  }

  /////////////// FILL PARENT ///////////////
  private initFillView() {
    const element = this.fillDemoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    element.style.flexDirection = 'row';

    const child1 = element.children[0] as HTMLElement;
    const child2 = element.children[1] as HTMLElement;
    const child3 = element.children[2] as HTMLElement;

    child1.style.flex = '1 1 100%';
    child1.style.maxWidth = '60%';
    child1.style.boxSizing = 'border-box';
    child2.style.flex = '1 1 100%';
    child2.style.maxWidth = '20%';
    child2.style.boxSizing = 'border-box';
    child3.style.flex = '1 1 0%';
    child3.style.boxSizing = 'border-box';
  }

  private getFillFormValue() {
    const styles = this.fillForm.value;
    return styles as FillLayoutStyles;
  }

  private fillChanged() {
    const element = this.fillDemoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    const { direction } = this.getFillFormValue();

    element.style.flexDirection = direction;

    const child1 = element.children[0] as HTMLElement;
    const child2 = element.children[1] as HTMLElement;
    const child3 = element.children[2] as HTMLElement;

    if (direction === 'row') {
      child1.style.maxHeight = null;
      child1.style.maxWidth = '60%';
      child2.style.maxHeight = null;
      child2.style.maxWidth = '20%';
      child3.style.flex = '1 1 0%';
    } else {
      child1.style.maxHeight = '60%';
      child1.style.maxWidth = null;
      child2.style.maxHeight = '20%';
      child2.style.maxWidth = null;
      child3.style.flex = '1 1 1e-09px';
    }
  }

  private fillStylesChanged() {
    const element = this.fillDemoRef?.nativeElement as HTMLElement;

    if (!element) { return; }

    const child1 = element.children[0] as HTMLElement;
    const child2 = element.children[1] as HTMLElement;
    const child3 = element.children[2] as HTMLElement;

    const styles = [];
    styles.push('.flex-60  {\n' + this.getStyles(child1, '  ') + '\n}\n');
    styles.push('.flex-20  {\n' + this.getStyles(child2, '  ') + '\n}\n');
    styles.push('.flex  {\n' + this.getStyles(child3, '  ') + '\n}');

    this.fillStyles = styles.join('\n');
  }

  private getStyles(element: HTMLElement, spaces = '') {
    const raw = element.getAttribute('style').toString();
    const styles = raw
      .split(';')
      .filter(s => s !== '')
      .map(s => (spaces + s?.trim()))
      .join(';\n');

    return styles + ';';
  }

}
