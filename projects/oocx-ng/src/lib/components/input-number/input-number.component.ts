import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

function parseDeInt(text: string): number {
  return Number.parseFloat(text.replace('.', '').replace(',', '.'));
}

@Component({
  selector: 'ox-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.less'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputNumberComponent, multi: true }
  ]
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input()
  public name: string;

  @Input()
  public value: string = null;

  @Input()
  public placeholder: string = null;

  @Output()
  public valueChange = new EventEmitter<number>();

  @Output()
  public blur = new EventEmitter();

  public writeValue(value: number): void {
    if (value) {
      this.value = value.toString().replace('.', ',');
    } else {
      this.value = null;
    }
  }
  public registerOnChange(fn: any): void {
    this.valueChange.subscribe(fn);
  }
  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(isDisabled: boolean): void {
  }

  constructor() { }

  public onchange(input: HTMLInputElement) {
    const number = parseDeInt(input.value);
    this.valueChange.emit(number);
  }

}
