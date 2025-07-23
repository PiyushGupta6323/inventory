import { TestBed } from '@angular/core/testing';

import { CiscoItemReportService } from './cisco-item-report.service';

describe('CiscoItemReportService', () => {
  let service: CiscoItemReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiscoItemReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
