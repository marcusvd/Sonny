import { TestBed } from '@angular/core/testing';

import { AccountEditService } from './account-edit.service';

describe('AccountEditService', () => {
  let service: AccountEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
