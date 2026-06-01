import { TestBed } from '@angular/core/testing';

import { TrackOrderApiService } from './track-order-api.service';

describe('TrackOrderApiService', () => {
  let service: TrackOrderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackOrderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
