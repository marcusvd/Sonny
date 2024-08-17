import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { VariableExpenseDto } from "../../../dto/variable-expense-dto";





@Injectable({providedIn:'root'})
export class VariableExpensesListService extends BackEndService<VariableExpenseDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http,
      environment._VARIABLE_EXPENSES,
    );

  }


  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const fnBankAccount = new VariableExpenseDto();
    fnBankAccount.id = id;

    this.deleteFake$<VariableExpenseDto>('DeleteFakeFnBankAccount', fnBankAccount).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
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
