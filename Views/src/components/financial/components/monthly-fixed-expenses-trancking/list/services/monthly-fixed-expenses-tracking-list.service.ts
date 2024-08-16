import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { MonthlyFixedExpensesTrackingDto } from "../../dto/monthly-fixed-expenses-tracking-dto";



@Injectable({providedIn:'root'})
export class MonthlyFixedExpensesTrackingListService extends BackEndService<MonthlyFixedExpensesTrackingDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts

  ) {
    super(_http, environment._MONTH_FIXED_EXPENSES_TRACKING)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const partner = new MonthlyFixedExpensesTrackingDto();
    partner.id = id;

    this.deleteFake$<MonthlyFixedExpensesTrackingDto>('DeleteFakePartner', partner).subscribe(
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
