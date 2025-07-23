import { TestBed } from '@angular/core/testing';

import { ShowSiteShiftedService } from './show-site-shifted.service';

describe('ShowSiteShiftedService', () => {
  let service: ShowSiteShiftedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSiteShiftedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
