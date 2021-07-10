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
  @Input() label;
  @Input() required;
  @Input() name;
  @Input() value;

  model;
  checked;
  onChange: Function;
  onTouched: Function;

  constructor() {}

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    this.model = value;
    this.checked = this.model === this.value;
  }

  select(event) {
    this.model = this.value;
    this.onChange(this.model);
  }

}
