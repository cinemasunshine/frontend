import { TestBed, inject } from '@angular/core/testing';

import { SasakiInquiryService } from './sasaki-inquiry.service';

describe('SasakiInquiryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SasakiInquiryService]
    });
  });

  it('should be created', inject([SasakiInquiryService], (service: SasakiInquiryService) => {
    expect(service).toBeTruthy();
  }));
});
