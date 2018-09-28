import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[oxHistoryBack]'
})
export class HistoryBackDirective {

  @HostListener('click')
  public goBack() {
    this.location.back();
  }

  constructor(private location: Location) { }

}
