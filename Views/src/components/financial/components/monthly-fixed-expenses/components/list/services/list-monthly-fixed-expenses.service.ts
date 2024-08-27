import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { MonthlyFixedExpenseDto } from "../../../dto/monthly-fixed-expense-dto";




@Injectable({providedIn:'root'})
export class ListMonthlyFixedExpensesService extends BackEndService<MonthlyFixedExpenseDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts

  ) {
    super(_http, environment._MONTHLY_FIXED_EXPENSES)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const partner = new MonthlyFixedExpenseDto();
    partner.id = id;

    this.deleteFake$<MonthlyFixedExpenseDto>('DeleteFakePartner', partner).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg(error, 1);
          return false;
        }

      }
    );


  }



}
