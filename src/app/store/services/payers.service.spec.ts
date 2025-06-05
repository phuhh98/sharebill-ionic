import { TestBed } from '@angular/core/testing';

import { PayersService } from './payers.service';

describe('PayersService', () => {
  let service: PayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
