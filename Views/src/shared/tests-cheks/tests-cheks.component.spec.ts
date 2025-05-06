import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsCheksComponent } from './tests-cheks.component';

describe('TestsCheksComponent', () => {
  let component: TestsCheksComponent;
  let fixture: ComponentFixture<TestsCheksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestsCheksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestsCheksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
