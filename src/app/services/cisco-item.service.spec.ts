import { TestBed } from '@angular/core/testing';

import { CiscoItemService } from './cisco-item.service';

describe('CiscoItemService', () => {
  let service: CiscoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiscoItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
