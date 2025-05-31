import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { environment } from "../../../../../../../environments/environment";
import { BackEndService } from "../../../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../../../shared/services/messages/snack-bar.service";
import { PixExpenseDto } from "../../../dto/pix-expense-dto";





@Injectable({providedIn:'root'})
export class ListPixExpensesService extends BackEndService<PixExpenseDto> {

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

    const fnBankAccount = new PixExpenseDto();
    fnBankAccount.id = id;

    this.deleteFake$<PixExpenseDto>('DeleteFakeFnBankAccount', fnBankAccount).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, '0', 4);
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
