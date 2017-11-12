import { TestBed, inject } from '@angular/core/testing';

import { IpApiService } from './ip-api.service';

describe('IpApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpApiService]
    });
  });

  it('should be created', inject([IpApiService], (service: IpApiService) => {
    expect(service).toBeTruthy();
  }));
});
