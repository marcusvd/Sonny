import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { YearlyFixedExpensesDto } from "../../../dto/yearly-fixed-expenses-dto";
import { YearlyFixedExpensesFillersDto } from "../../../dto/yearly-fixed-expenses-fillers-dto";

@Injectable()
export class yearlyFixedExpensesFillersService extends BackEndService<YearlyFixedExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._YEARLY_FIXED_EXPENSES_FILLERS)
  }

  getFillers() {
    const companyId = JSON.parse(localStorage.getItem('companyId'));

    return this.loadById$<YearlyFixedExpensesFillersDto[]>('GetAllYearlyFixedExpensesFillersByCompanyId', companyId);
  }

}
