import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { YearlyFixedExpensesDto } from "../../../dto/yearly-fixed-expenses-dto";






@Injectable({providedIn:'root'})
export class YearlyFixedExpensesListService extends BackEndService<YearlyFixedExpensesDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http,
      environment._FNBANKSACCOUNTS,
    );

  }


  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const fnBankAccount = new YearlyFixedExpensesDto();
    fnBankAccount.id = id;

    this.deleteFake$<YearlyFixedExpensesDto>('DeleteFakeFnBankAccount', fnBankAccount).subscribe(
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
