import { TestBed } from '@angular/core/testing';

import { CiscoItemInventoryLogService } from './cisco-item-inventory-log.service';

describe('CiscoItemInventoryLogService', () => {
  let service: CiscoItemInventoryLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiscoItemInventoryLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
