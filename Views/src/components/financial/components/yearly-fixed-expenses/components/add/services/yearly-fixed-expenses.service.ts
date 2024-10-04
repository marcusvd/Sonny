import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { YearlyFixedExpenseDto } from "../../../dto/yearly-fixed-expense-dto";

@Injectable()
export class YearlyFixedExpensesService extends BackEndService<YearlyFixedExpenseDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._YEARLY_FIXED_EXPENSES)
  }

  makeTrackingEntity(fixedExpenses: YearlyFixedExpenseDto): YearlyFixedExpenseDto {

    const trancking = new YearlyFixedExpenseDto()
    trancking.companyId = this.companyId;
    trancking.userId = JSON.parse(localStorage.getItem('userId'))
    trancking.bankAccountId = null;
    trancking.pixId = null;
    trancking.cardId = null;
    trancking.othersPaymentMethods = null;
    trancking.wasPaid = new Date('0001-01-01T00:00:00Z');
    trancking.expires = new Date(fixedExpenses.expires);
    trancking.registered = new Date();

    if (fixedExpenses.price)
      trancking.price = fixedExpenses.price;
    else
      trancking.price = 0;

    trancking.interest = 0;


    return trancking;
  }

  save(form: FormGroup) {

    const toSave: YearlyFixedExpenseDto = { ...form.value };
    this.add$<YearlyFixedExpenseDto>(toSave, 'AddYearlyFixedExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
          this._route.navigateByUrl(`/side-nav/financial-dash/yearly-fixed-expenses-list`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })



  }


}
