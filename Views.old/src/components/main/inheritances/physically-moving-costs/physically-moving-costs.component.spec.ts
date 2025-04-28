import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicallyMovingCostsComponent } from './physically-moving-costs.component';

describe('PhysicallyMovingCostsComponent', () => {
  let component: PhysicallyMovingCostsComponent;
  let fixture: ComponentFixture<PhysicallyMovingCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicallyMovingCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicallyMovingCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
