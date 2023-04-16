import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { ServiceBenchCreateService } from '../services/service-bench-create.service';
// import { ServiceBenchListService } from '../services/service-bench-list.service_NOTUSED';
import { ServiceBudgetListService, } from '../services/service-budget-list.service';
import { ServicesBudgetUpdate } from '../services/services-budget-update.service';

@Component({
  selector: 'service-budget-list',
  templateUrl: './service-budget-list.component.html',
  styleUrls: ['./service-budget-list.component.css'],
  providers: [
    ServiceBudgetListService,
    ServicesBudgetUpdate,
    ServiceBenchCreateService
  ]
})

export class ServiceBudgetListComponent extends BaseForm implements OnInit {

  indexTabContentField: number = 0;

  title: string = 'Orçamentos';
  subTitle: string = 'Administrativo';

  constructor(
    private _serviceBudgetListService: ServiceBudgetListService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  get dataSource() {
    return this._serviceBudgetListService.serviceBudgetFromDb.filter((auth: ServiceBudgetDto) => auth.authorized == false)
  }

  tabContentIndex($event:any) {
    this.indexTabContentField = $event;
  }

  reloadGrid() {
    this._serviceBudgetListService.loadAllBudget()
  }

  ngOnInit() {
    this._serviceBudgetListService.loadAllBudget()
  }

}
