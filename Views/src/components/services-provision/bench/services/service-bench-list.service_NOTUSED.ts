import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { ServiceBudgetDto } from "../../budget/dto/service-budget-dto";
import { ServiceBenchDto } from "../dto/service-bench-dto";
@Injectable()
export class ServiceBenchListService_NOTUSED extends BackEndService<ServiceBenchDto, number>{

  private _serviceBudgetFromDb: ServiceBudgetDto[] = [];

  constructor(
    protected _Http: HttpClient,
    private _LoadClient: ClientListService,
    // private _ServicebudgetServices: ServicesBudgetListService
  ) {
    super(_Http, null, environment._SERVICES_BUDGET);
  }

  get serviceBudgetFromDb(): ServiceBudgetDto[] {
    return this._serviceBudgetFromDb;
  }

}
