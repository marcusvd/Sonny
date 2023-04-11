import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGetInfoComponent } from './contact-get-info.component';

describe('ContactGetInfoComponent', () => {
  let component: ContactGetInfoComponent;
  let fixture: ComponentFixture<ContactGetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactGetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactGetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
