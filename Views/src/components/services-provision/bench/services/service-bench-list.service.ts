import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { MultipleDataSource } from "src/shared/helpers/multiple-datasource";
import { ServicesBudgetListService } from "../../budget/service-budget-list/services/services-budget-list.service";
import { ServiceBudgetDto } from "../../dtos/service-budget-dto";
import { ServiceBenchDto } from "../../dtos/service-bench-dto";
@Injectable()
export class ServiceBenchListService extends BackEndService<ServiceBenchDto, number>{

  private _serviceBudgetFromDb: ServiceBudgetDto[] = [];

  constructor(
    protected _Http: HttpClient,
    private _LoadClient: ClientListService,
    private _ServicebudgetServices: ServicesBudgetListService
  ) {
    super(_Http, null, environment._SERVICES_BUDGET);
  }

  get serviceBudgetFromDb(): ServiceBudgetDto[] {
    return this._serviceBudgetFromDb;
  }






}
