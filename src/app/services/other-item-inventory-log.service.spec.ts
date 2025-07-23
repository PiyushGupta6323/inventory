import { TestBed } from '@angular/core/testing';

import { OtherItemInventoryLogService } from './other-item-inventory-log.service';

describe('OtherItemInventoryLogService', () => {
  let service: OtherItemInventoryLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherItemInventoryLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
