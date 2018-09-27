import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { LabelDirective } from '../../directives/label.directive';
import { LabelIdGeneratorService } from '../../services/label-id-generator.service';
@Component({
  selector: 'ox-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.less']
})
export class LabelComponent implements AfterContentInit {

  @Input()
  public label: string;

  @Input()
  public forId: string;

  @Input()
  @HostBinding('class')
  public class: string;

  constructor(private element: ElementRef, private idGenerator: LabelIdGeneratorService) { }

  public ngAfterContentInit() {

    const input = (<HTMLElement>this.element.nativeElement).querySelector('input');
    if (!input) { return; }

    if (!input.id) {
      input.id = this.idGenerator.getNextId();
    }
    this.forId = input.id;
  }

}
