import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
// import { ServiceBenchListService } from '../services/service-bench-list.service_NOTUSED';
import { ServiceBudgetListService,} from '../services/service-budget-list.service';
import { ServicesBudgetUpdate } from '../services/services-budget-update.service';
@Component({
  selector: 'service-budget-list',
  templateUrl: './service-budget-list.component.html',
  styleUrls: ['./service-budget-list.component.css'],
  providers: [
    ServiceBudgetListService,
    ServicesBudgetUpdate
  ]
})

export class ServiceBudgetListComponent extends BaseForm implements OnInit {

  indexTabContentField: number = 0;
  budgetSingleEntity: ServiceBudgetDto = new ServiceBudgetDto();

  constructor(
    private _serviceBudgetListService: ServiceBudgetListService,
  ) {
    super();
  }

  get dataSource() {
    return this._serviceBudgetListService.serviceBudgetFromDb
  }

  tabContentIndex($event) {
    this.indexTabContentField = $event;
  }

  selectedBudgetEntity($event){
    this.budgetSingleEntity = $event;
  }

  ngOnInit() {
    this._serviceBudgetListService.loadAllBudget()
  }

}
