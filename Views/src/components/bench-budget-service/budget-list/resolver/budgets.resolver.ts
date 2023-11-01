import { BackEndService } from "src/shared/services/back-end/backend.service";
import { Observable, zip } from "rxjs";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BudgetServiceDto } from "../../dto/budget-service-dto";

@Injectable()
export class BudgetResolver extends BackEndService<BudgetServiceDto> implements Resolve<Observable<{ budgetServiceLength: number }>>{

  constructor(override _http:HttpClient) {
    super(_http,environment.backEndDoor);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ budgetServiceLength: number; }> {

    const budgetServiceLength$: Observable<number> = this.loadById$('budgetsservices/LengthBudgetAsync', route.paramMap.get('id'));
    // const budgetServiceLength$: Observable<number> = this.loadById$('budgetsservices/LengthBudgetServiceAsync', route.paramMap.get('id'));

    const Zip = zip(budgetServiceLength$)
      .pipe(map(([budgetServiceLength]) => ({ budgetServiceLength })))

    return Zip;

  }

}
