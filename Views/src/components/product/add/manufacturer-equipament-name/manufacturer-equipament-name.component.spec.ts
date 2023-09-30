import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerEquipamentNameComponent } from './manufacturer-equipament-name.component';

describe('ManufacturerEquipamentNameComponent', () => {
  let component: ManufacturerEquipamentNameComponent;
  let fixture: ComponentFixture<ManufacturerEquipamentNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturerEquipamentNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerEquipamentNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
