import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { MultipleDataSource } from "src/shared/helpers/multiple-datasource";
import { ServicesBudgetListService } from "../../budget/service-budget-list/services/services-budget-list.service";
import { ServiceBudgetDto } from "../../dtos/service-budget-dto";




@Injectable()

export class ServiceBenchListService extends BackEndService<ServiceBudgetDto, number>{

  private _multipleDataSource: MultipleDataSource;
  public getSetdata = new Observable<any>();
  private _serviceBudgetFromDb: ServiceBudgetDto[] = [];

  constructor(
    protected _Http: HttpClient,
    private _LoadClient: ClientListService,
    private _ServicebudgetServices?: ServicesBudgetListService
  ) {
    super(_Http, null, environment._SERVICES_BUDGET);
  }

  get serviceBudgetFromDb(): ServiceBudgetDto[] {
    return this._serviceBudgetFromDb;
  }

  get dataSource() {
    return this.getSetdata;
  }


  firstToLoad(_ServicebudgetServices?: ServicesBudgetListService) {
    this._multipleDataSource = new MultipleDataSource(null, null, null, _ServicebudgetServices, null);
    this.getSetdata = this._multipleDataSource.servicebudgetServices$();
  }




}
