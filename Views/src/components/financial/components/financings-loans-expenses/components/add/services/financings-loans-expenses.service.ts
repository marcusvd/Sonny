import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { FinancingsLoansExpensesDto } from "../../../dto/financings-loans-expenses-dto";

@Injectable()
export class FinancingsLoansExpensesService extends BackEndService<FinancingsLoansExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._FINANCINGS_LOANS_EXPENSES)
  }

  save(form: FormGroup) {

    const toSave: FinancingsLoansExpensesDto = { ...form.value };

    // this.add$<FinancingsLoansExpensesDto>(toSave, 'AddFinancingsAndLoansExpenses').subscribe({
    this.add$<FinancingsLoansExpensesDto>(toSave, 'AddFinancingsAndLoanExpenseInstallments').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
         this._route.navigateByUrl(`/side-nav/financial-dash/list-financings-loans-expenses`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })

  }

}
