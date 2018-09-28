import { Directive, ElementRef, HostListener } from '@angular/core';


const legalKeys = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
  'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'
];

@Directive({
  selector: '[oxInputDate]'
})
export class InputDateDirective {

  @HostListener('keydown', ['$event'])
  public onkeydown(e: KeyboardEvent) {
    if (!legalKeys.includes(e.key)) {
      e.preventDefault();
    }
  }

}
