import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../../budget/dto/service-budget-dto';
import { ServicesBudgetUpdate } from '../../budget/services/services-budget-update.service';
import { ServiceBudgetToBenchListService } from '../services/service-budget-to-bench-list.service';
@Component({
  selector: 'service-bench-budget-list',
  templateUrl: './service-bench-budget-list.component.html',
  styleUrls: ['./service-bench-budget-list.component.css'],
  providers: [ServicesBudgetUpdate,ServiceBudgetToBenchListService]
})

export class ServiceBenchBudgetListComponent extends BaseForm implements OnInit {

  indexTabContentField: number = 0;
  // budgetSingleEntity: ServiceBudgetDto = new ServiceBudgetDto();

  constructor(
    private _serviceBudgetToBenchListService: ServiceBudgetToBenchListService,
  ) {
    super();
  }

  get dataSource() {
    return this._serviceBudgetToBenchListService.serviceBudgetFromDb;
  }

  tabContentIndex($event) {
    this.indexTabContentField = $event;
  }


  ngOnInit() {
    this._serviceBudgetToBenchListService.loadAllBudget()
  }

}
