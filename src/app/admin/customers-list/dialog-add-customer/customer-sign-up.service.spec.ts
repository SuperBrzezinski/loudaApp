import { TestBed } from '@angular/core/testing';

import { CustomerSignUpService } from './customer-sign-up.service';

describe('SignUpService', () => {
  let service: CustomerSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
