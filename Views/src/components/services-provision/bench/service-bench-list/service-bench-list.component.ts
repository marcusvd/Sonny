import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../../dtos/service-budget-dto';
import { ServiceBenchListService } from '../services/service-bench-list.service';
import { ServiceBudgetToBenchListService } from '../services/service-budget-to-bench-list.service';


@Component({
  selector: 'service-bench-list',
  templateUrl: './service-bench-list.component.html',
  styleUrls: ['./service-bench-list.component.css'],
  providers: [ServiceBudgetToBenchListService]
})

export class ServiceBenchListComponent extends BaseForm implements OnInit {
  indexTabContentField: number = 0;
  // budgetId: number = 0;
  budgetSingleEntity: ServiceBudgetDto = new ServiceBudgetDto();
  // budgetSelectedEntity: ServiceBudgetDto;

  constructor(
    private _serviceBenchListService: ServiceBenchListService,
    private _serviceBudgetToBenchListService: ServiceBudgetToBenchListService,

  ) {
    super();
  }

  get dataSource() {
    return this._serviceBudgetToBenchListService.serviceBudgetFromDb
  }

  tabContentIndex($event) {
    this.indexTabContentField = $event;
  }

  // selectedSingleBudget($event){
  //   this.budgetId = $event;
  //   // console.log($event)
  // }

  selectedBudgetEntity($event){
    this.budgetSingleEntity = $event;
  }

  // budgetSelected(serviceBudgetDto: ServiceBudgetDto){
  //   this.budgetSelectedEntity = serviceBudgetDto;
  // }

  ngOnInit() {
    this._serviceBudgetToBenchListService.loadAllBudget()
  }

}
