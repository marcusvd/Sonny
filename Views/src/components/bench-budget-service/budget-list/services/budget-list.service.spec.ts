/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BudgetListService } from './budget-list.service';

describe('Service: BudgetList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetListService]
    });
  });

  it('should ...', inject([BudgetListService], (service: BudgetListService) => {
    expect(service).toBeTruthy();
  }));
});
