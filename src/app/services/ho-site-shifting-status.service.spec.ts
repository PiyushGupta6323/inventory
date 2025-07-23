import { TestBed } from '@angular/core/testing';

import { HoSiteShiftingStatusService } from './ho-site-shifting-status.service';

describe('HoSiteShiftingStatusService', () => {
  let service: HoSiteShiftingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoSiteShiftingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
