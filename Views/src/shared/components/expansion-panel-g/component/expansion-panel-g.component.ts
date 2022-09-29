import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { TestComponent } from 'src/components/client/test/test.component';
import { ServiceBudgetDto } from 'src/components/services-provision/budget/dto/service-budget-dto';

@Component({
  selector: 'expansion-panel-g',
  templateUrl: './expansion-panel-g.component.html',
  styleUrls: ['./expansion-panel-g.component.css']
})
export class ExpansionPanelGComponent implements OnInit, OnChanges {

  public entities = [];

  @Input() panelTitle: string;

  // @Input() budgetId: number;
  // @Output() budgetIdEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Input() budgetEntity: ServiceBudgetDto;
  @Output() budgetEntityEventEmitter: EventEmitter<ServiceBudgetDto> = new EventEmitter<ServiceBudgetDto>();

  @Input() panelDescription: string;
  @Input() dataSourceInput = new Observable<any>();
  panelOpenState = false;

  constructor() { }

  // budgetIdEmit() {
  //   this.budgetIdEventEmitter.emit(this.budgetId)
  //   // console.log(this.budgetIdEventEmitter.emit(this.budgetId))
  //   //console.log(this.budgetId)
  // }
  budgetEntityEmit() {
    this.budgetEntityEventEmitter.emit(this.budgetEntity)
    // console.log(this.budgetIdEventEmitter.emit(this.budgetId))
    // console.log(this.budgetEntity)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.budgetId)
  }

  ngOnInit(): void {
    this.dataSourceInput.subscribe(
      toView => {
        this.entities = toView;
      }
    )






  }
}
