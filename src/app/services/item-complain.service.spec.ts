import { TestBed } from '@angular/core/testing';

import { ItemComplainService } from './item-complain.service';

describe('ItemComplainService', () => {
  let service: ItemComplainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemComplainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
