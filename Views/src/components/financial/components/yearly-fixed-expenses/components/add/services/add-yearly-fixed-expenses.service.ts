import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../../../environments/environment";
import { BackEndService } from "../../../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../../../shared/services/messages/snack-bar.service";
import { YearlyFixedExpenseDto } from "../../../dto/yearly-fixed-expense-dto";

@Injectable()
export class AddYearlyFixedExpensesService extends BackEndService<YearlyFixedExpenseDto>
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
    trancking.userId = JSON.parse(localStorage.getItem('userId') ?? '');
    trancking.bankAccountId = 0;
    trancking.pixId = 0;
    trancking.cardId = 0;
    trancking.othersPaymentMethods = '0';
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
        this._communicationsAlerts.defaultSnackMsg('0', 0, '0', 4);
          this._route.navigateByUrl(`/financial/yearly-fixed-expenses-list`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })



  }


}
