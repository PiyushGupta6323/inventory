import { TestBed } from '@angular/core/testing';

import { SpareMgmtService } from './spare-mgmt.service';

describe('SpareMgmtService', () => {
  let service: SpareMgmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpareMgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
