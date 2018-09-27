import { Component, Input, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ox-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {


  private static nextId = 0;

  public id = 'checkbox' + CheckboxComponent.nextId++;

  @Input()
  public value: string;

  @Input()
  public get checked() {
    return this._checked;
  }

  public set checked(value: boolean) {
    this._checked = !!value;
    if (this._onChange) {
      this._onChange(this._checked);
    }
  }

  private _checked = false;

  private _onChange: Function = null;

  public writeValue(obj: any): void {
    this.checked = !!obj;
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState?(isDisabled: boolean): void {
  }

}
