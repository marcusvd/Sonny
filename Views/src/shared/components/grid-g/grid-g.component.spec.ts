import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGComponent } from './grid-g.component';

describe('GridGComponent', () => {
  let component: GridGComponent;
  let fixture: ComponentFixture<GridGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
