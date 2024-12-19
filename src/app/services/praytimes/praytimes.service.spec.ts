import { TestBed } from '@angular/core/testing';

import { PraytimesService } from './praytimes.service';

describe('PraytimesService', () => {
  let service: PraytimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PraytimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
