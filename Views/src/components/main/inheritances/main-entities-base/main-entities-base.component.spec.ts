import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEntitiesBaseComponent } from './main-entities-base.component';

describe('MainEntitiesBaseComponent', () => {
  let component: MainEntitiesBaseComponent;
  let fixture: ComponentFixture<MainEntitiesBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEntitiesBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEntitiesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
