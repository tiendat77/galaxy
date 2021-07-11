import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SWITCH_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GalaxySwitch),
  multi: true
};

let nextUniqueId = 0;

@Component({
  selector: 'galaxy-switch',
  templateUrl: 'switch.html',
  styleUrls: ['switch.scss'],
  providers: [SWITCH_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalaxySwitch implements ControlValueAccessor {

  @Input('checked') _checked = false;
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
  }

  id;
  onChange: Function;
  onTouched: Function;

  constructor() {
    this.id = `galaxy-switch-${++nextUniqueId}`;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    this.checked = value;
  }

  toggle(value) {
    this._checked = value;

    if (this.onChange) {
      this.onChange(value);
    }
  }

}
