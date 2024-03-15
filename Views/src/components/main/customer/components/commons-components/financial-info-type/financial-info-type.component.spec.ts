import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInfoTypeComponent } from './financial-info-type.component';

describe('FinancialInfoTypeComponent', () => {
  let component: FinancialInfoTypeComponent;
  let fixture: ComponentFixture<FinancialInfoTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialInfoTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialInfoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
