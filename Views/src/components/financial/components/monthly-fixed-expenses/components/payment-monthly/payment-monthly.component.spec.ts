import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMonthlyComponent } from './payment-monthly.component';

describe('PaymentMonthlyComponent', () => {
  let component: PaymentMonthlyComponent;
  let fixture: ComponentFixture<PaymentMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMonthlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
