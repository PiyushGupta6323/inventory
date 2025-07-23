import { TestBed } from '@angular/core/testing';

import { ItemReportService } from './item-report.service';

describe('ItemReportService', () => {
  let service: ItemReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
