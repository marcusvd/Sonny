import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
import { ServiceBudgetDto } from '../../budget/dto/service-budget-dto';
import { ServicesBudgetUpdate } from '../../budget/services/services-budget-update.service';
import { ServiceBudgetToBenchListService } from '../services/service-budget-to-bench-list.service';
@Component({
  selector: 'service-bench-budget-list',
  templateUrl: './service-bench-budget-list.component.html',
  styleUrls: ['./service-bench-budget-list.component.css'],
  providers: [ServicesBudgetUpdate, ServiceBudgetToBenchListService]
})

export class ServiceBenchBudgetListComponent extends BaseForm implements OnInit {

  indexTabContentField: number = 0;

  title: string = 'Orçamentos';
  subTitle: string = 'Técnico';
  // budgetSingleEntity: ServiceBudgetDto = new ServiceBudgetDto();

  constructor(
    private _serviceBudgetToBenchListService: ServiceBudgetToBenchListService,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }

  get dataSource() {
    return this._serviceBudgetToBenchListService.serviceBudgetFromDb.filter(x => x.authorized == false);
  }

  tabContentIndex($event) {
    this.indexTabContentField = $event;
  }


  ngOnInit() {
    this._serviceBudgetToBenchListService.loadAllBudget()
  }

}
