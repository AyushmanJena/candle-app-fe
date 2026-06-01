import { TestBed } from '@angular/core/testing';

import { HomepageManagementService } from './homepage-management.service';

describe('HomepageManagementService', () => {
  let service: HomepageManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomepageManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
