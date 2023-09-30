import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetServiceComponent } from './budget-service.component';

describe('BudgetServiceComponent', () => {
  let component: BudgetServiceComponent;
  let fixture: ComponentFixture<BudgetServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
