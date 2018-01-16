import { TestBed, inject } from '@angular/core/testing';

import { SalseChackService } from './salse-chack.service';

describe('SalseChackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalseChackService]
    });
  });

  it('should be created', inject([SalseChackService], (service: SalseChackService) => {
    expect(service).toBeTruthy();
  }));
});
