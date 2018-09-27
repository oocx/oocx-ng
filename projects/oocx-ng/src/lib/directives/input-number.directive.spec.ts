import { ElementRef } from '@angular/core';
import { InputNumberDirective } from './input-number.directive';

describe('InputNumberDirective', () => {

  let sut: InputNumberDirective;

  beforeEach(() => {
    const element = document.createElement('input');
    const elementRef = new ElementRef(element);
    sut = new InputNumberDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(sut).toBeTruthy();
  });
});
