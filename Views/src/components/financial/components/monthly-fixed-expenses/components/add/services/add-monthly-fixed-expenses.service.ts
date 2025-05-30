import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";


import { environment } from "../../../../../../../environments/environment";
import { BackEndService } from "../../../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../../../shared/services/messages/snack-bar.service";
import { MonthlyFixedExpenseDto } from "../../../dto/monthly-fixed-expense-dto";

@Injectable()
export class AddMonthlyFixedExpensesService extends BackEndService<MonthlyFixedExpenseDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._MONTHLY_FIXED_EXPENSES)
  }
  save(form: FormGroup) {

    const toSave: MonthlyFixedExpenseDto = { ...form.value };

    this.add$<MonthlyFixedExpenseDto>(toSave, 'AddFixedExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, '0', 4);
          this._route.navigateByUrl(`/financial/list-monthly-fixed-expenses`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })

  }

}
