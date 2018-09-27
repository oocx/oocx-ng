import { TestBed, inject } from '@angular/core/testing';

import { DomHelperService } from './dom-helper.service';

describe('DomHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomHelperService]
    });
  });

  it('should be created', inject([DomHelperService], (service: DomHelperService) => {
    expect(service).toBeTruthy();
  }));
});
