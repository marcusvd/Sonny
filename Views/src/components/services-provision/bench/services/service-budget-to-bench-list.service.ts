import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../../budget/dto/service-budget-dto";



@Injectable()
export class ServiceBudgetToBenchListService extends BackEndService<ServiceBudgetDto, number>{

  private _serviceBudgetFromDb: ServiceBudgetDto[] = [];

  constructor(
    override _http: HttpClient,
    //private _loadCustomers: CustomerListService,
  ) {
    super(_http, environment._SERVICES_BUDGET);
  }


  loadAllBudget() {
    this.loadAll$<ServiceBudgetDto>('GetAllServicesBudgetsIncludedAsync').subscribe((serviceBudgetDto: ServiceBudgetDto[]) => {
      this._serviceBudgetFromDb = serviceBudgetDto;
    })
  }


  get serviceBudgetFromDb(): ServiceBudgetDto[] {
    return this._serviceBudgetFromDb;
  }

}
