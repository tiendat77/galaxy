import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GalaxyRadioButton),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'galaxy-radio-button',
  templateUrl: 'radio-button.html',
  styleUrls: ['radio-button.scss'],
  providers: [RADIO_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxyRadioButton implements ControlValueAccessor {

  @Input() id = `galaxy-radio-${++nextId}-input`;
  @Input() name;
  @Input() label;
  @Input() required;
  @Input() value1;

  @Input('value') _value = false;

  private innerValue;
  get value() {
    return this.innerValue;
  }

  set value(val) {
    this.innerValue = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() { }

  onChange: Function;
  onTouched: Function;

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    this.innerValue = value;
  }

  onChecked(value) {
    this.value = value;
  }

}
