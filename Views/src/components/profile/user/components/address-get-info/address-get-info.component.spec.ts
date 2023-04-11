import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressGetInfoComponent } from './address-get-info.component';

describe('AddressGetInfoComponent', () => {
  let component: AddressGetInfoComponent;
  let fixture: ComponentFixture<AddressGetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressGetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressGetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
