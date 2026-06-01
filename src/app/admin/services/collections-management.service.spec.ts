import { TestBed } from '@angular/core/testing';

import { CollectionsManagementService } from './collections-management.service';

describe('CollectionsManagementService', () => {
  let service: CollectionsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
