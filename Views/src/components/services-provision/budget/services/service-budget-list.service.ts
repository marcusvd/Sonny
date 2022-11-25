import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { ClientListService } from "src/components/customer/components/client-list/services/client-list.service";

@Injectable()
export class ServiceBudgetListService extends BackEndService<ServiceBudgetDto, number>{

  private _serviceBudgetFromDb: ServiceBudgetDto[] = [];

  constructor(
    protected _Http: HttpClient,
    private _LoadClient: ClientListService,
  ) {
    super(_Http, environment._SERVICES_BUDGET_ALL_INCLUDED, environment._SERVICES_BUDGET_ALL_INCLUDED);
  }

  loadAllBudget() {
    this.loadAll$().subscribe((serviceBudgetDto: ServiceBudgetDto[]) => {
      this._serviceBudgetFromDb = serviceBudgetDto;
    })
  }

  get serviceBudgetFromDb(): ServiceBudgetDto[] {
    return this._serviceBudgetFromDb;
  }

}
