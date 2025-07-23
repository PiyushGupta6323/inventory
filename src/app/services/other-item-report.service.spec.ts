import { TestBed } from '@angular/core/testing';

import { OtherItemReportService } from './other-item-report.service';

describe('OtherItemReportService', () => {
  let service: OtherItemReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherItemReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
