import { TestBed } from '@angular/core/testing';

import { MasterItemsService } from './master-items.service';

describe('MasterItemsService', () => {
  let service: MasterItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
