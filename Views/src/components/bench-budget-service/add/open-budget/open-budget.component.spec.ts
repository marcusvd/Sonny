import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBudgetComponent } from './open-budget.component';

describe('OpenBudgetComponent', () => {
  let component: OpenBudgetComponent;
  let fixture: ComponentFixture<OpenBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
