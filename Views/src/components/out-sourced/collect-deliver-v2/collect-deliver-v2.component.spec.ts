import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDeliverV2Component } from './collect-deliver-v2.component';

describe('CollectDeliverV2Component', () => {
  let component: CollectDeliverV2Component;
  let fixture: ComponentFixture<CollectDeliverV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectDeliverV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectDeliverV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
