import { Directive, ElementRef, HostListener } from '@angular/core';

const legalKeys = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',',
  'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'
]

@Directive({
  selector: '[acInputNumber]'
})
export class InputNumberDirective {

  constructor(private element: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  public onkeydown(e: KeyboardEvent) {
    if (!legalKeys.includes(e.key)) {
      e.preventDefault();
    }
  }

}
