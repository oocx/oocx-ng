import { inject } from '@angular/core/testing';
import { LabelDirective } from './label.directive';

describe('LabelDirective', () => {
  it('should create an instance', (inject([LabelDirective], sut => {
    expect(sut).toBeTruthy();
  })));
});
