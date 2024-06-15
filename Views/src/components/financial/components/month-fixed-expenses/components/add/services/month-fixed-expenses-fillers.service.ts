import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { MonthFixedExpensesDto } from "../../../dto/month-fixed-expenses-dto";
import { MonthFixedExpensesFillersDto } from "../../../dto/month-fixed-expenses-fillers-dto";

@Injectable()
export class MonthFixedExpensesFillersService extends BackEndService<MonthFixedExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._MONTH_FIXED_EXPENSES_FILLERS)
  }


  getFillers() {
    const companyId = JSON.parse(localStorage.getItem('companyId'));

    return this.loadById$<MonthFixedExpensesFillersDto[]>('GetAllMonthFixedExpensesFillersByCompanyId', companyId);
  }

}
