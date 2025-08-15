import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { environment } from "../../../../../environments/environment";
import { BackEndService } from "../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../shared/services/messages/snack-bar.service";
import { CashWithdrawnExpenseDto } from "../dto/cash-withdrawn-expenses-dto";






@Injectable({providedIn:'root'})
export class ListCashWithdrawnExpensesService extends BackEndService<CashWithdrawnExpenseDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http,
      environment.__FN_CASH_WITHDRAWN_EXPENSES,
    );

  }


  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const fnBankAccount = new CashWithdrawnExpenseDto();
    fnBankAccount.id = id;

    this.deleteFake$<CashWithdrawnExpenseDto>('DeleteFakeFnBankAccount', fnBankAccount).subscribe(
      {
        next: () => {
          // this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg('4', 11);
          console.log(error)
          return false;
        }

      }
    );


  }








}
