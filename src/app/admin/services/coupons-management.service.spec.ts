import { TestBed } from '@angular/core/testing';

import { CouponsManagementService } from './coupons-management.service';

describe('CouponsManagementService', () => {
  let service: CouponsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
