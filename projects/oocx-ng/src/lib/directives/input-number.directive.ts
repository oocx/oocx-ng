import { Directive, ElementRef, HostListener } from '@angular/core';

const legalKeys = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',',
  'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'
];

@Directive({
  selector: '[oxInputNumber]'
})
export class InputNumberDirective {

  private input: HTMLInputElement;

  constructor(private element: ElementRef) {
    this.input = element.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  public onkeydown(e: KeyboardEvent) {
    if (!legalKeys.includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === ',' && this.input.value && this.input.value.indexOf(',') > -1) {
      e.preventDefault();
    }
  }

}
