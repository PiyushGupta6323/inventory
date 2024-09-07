import { TestBed } from '@angular/core/testing';

import { ShqService } from './shq.service';

describe('ShqService', () => {
  let service: ShqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
