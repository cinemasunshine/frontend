import { TestBed, inject } from '@angular/core/testing';

import { SasakiMasterService } from './sasaki-master.service';

describe('SasakiMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SasakiMasterService]
    });
  });

  it('should be created', inject([SasakiMasterService], (service: SasakiMasterService) => {
    expect(service).toBeTruthy();
  }));
});
