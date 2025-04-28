import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGetInfoComponent } from './account-get-info.component';

describe('AccountGetInfoComponent', () => {
  let component: AccountGetInfoComponent;
  let fixture: ComponentFixture<AccountGetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountGetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountGetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
