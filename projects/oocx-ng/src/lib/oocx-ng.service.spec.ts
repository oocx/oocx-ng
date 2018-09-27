import { TestBed } from '@angular/core/testing';

import { OocxNgService } from './oocx-ng.service';

describe('OocxNgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OocxNgService = TestBed.get(OocxNgService);
    expect(service).toBeTruthy();
  });
});
