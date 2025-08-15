import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { BackEndService } from "../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../shared/services/messages/snack-bar.service";
import { CashWithdrawnExpenseDto } from "../dto/cash-withdrawn-expenses-dto";



@Injectable()
export class AddCashWithdrawnExpensesService extends BackEndService<CashWithdrawnExpenseDto> {
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment.__FN_CASH_WITHDRAWN_EXPENSES)
  }

  save(form: FormGroup) {

    const toSave: CashWithdrawnExpenseDto = { ...form.value };
    console.log(toSave);

    this.add$<CashWithdrawnExpenseDto>(toSave, 'AddCashWithdrawnExpenses').subscribe({
      next: () => {
        // this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
          this._route.navigateByUrl(`/financial/list-cash-withdrawn-expenses`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }
}
