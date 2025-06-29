import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../../../../environments/environment";
import { BackEndService } from "../../../../../../../../shared/services/back-end/backend.service";
import { FinancingsLoansExpensesDto } from "../../../../dto/financings-loans-expenses-dto";


@Injectable({providedIn:'root'})
export class FinancingValuesService extends BackEndService<FinancingsLoansExpensesDto>{

  constructor(
    override _http: HttpClient
  ) {
    super(_http, environment._FINANCINGS_LOANS_EXPENSES)
  }
}
