import { TestBed } from '@angular/core/testing';

import { VenueDataService } from './venue-data.service';

describe('VenueDataService', () => {
  let service: VenueDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
