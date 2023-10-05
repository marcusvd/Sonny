import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListOptsComponent } from './grid-list-opts.component';

describe('GridListOptsComponent', () => {
  let component: GridListOptsComponent;
  let fixture: ComponentFixture<GridListOptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridListOptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridListOptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
