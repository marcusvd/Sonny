import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { BudgetServiceDto } from "src/components/bench-budget-service/dto/budget-service-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

@Injectable({providedIn:'root'})
export class AddEditServicesResolver extends BackEndService<BudgetServiceDto> implements Resolve<Observable<BudgetServiceDto>>{

  constructor(override _http: HttpClient) {
    super(_http, environment.backEndDoor)
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BudgetServiceDto> {
    return this.loadByCompanyIdByEntity$<BudgetServiceDto>(`BudgetsServices/GetByCompanyIdBybudgetServiceId`, JSON.parse(localStorage.getItem('companyId')), route.paramMap.get('id'))
  }

}
