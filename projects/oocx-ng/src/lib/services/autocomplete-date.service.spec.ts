import { TestBed } from '@angular/core/testing';

import { AutocompleteDateService } from './autocomplete-date.service';

describe('AutocompleteDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutocompleteDateService = TestBed.get(AutocompleteDateService);
    expect(service).toBeTruthy();
  });
});
