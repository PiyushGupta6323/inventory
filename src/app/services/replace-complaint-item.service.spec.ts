import { TestBed } from '@angular/core/testing';

import { ReplaceComplaintItemService } from './replace-complaint-item.service';

describe('ReplaceComplaintItemService', () => {
  let service: ReplaceComplaintItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplaceComplaintItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
