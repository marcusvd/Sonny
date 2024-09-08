import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CreditCardExpenseDto } from "../../../dto/credit-card-expense-dto";

@Injectable()
export class AddCreditCardExpensesService extends BackEndService<CreditCardExpenseDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._CREDIT_CARD_EXPENSES)
  }

  save(form: FormGroup) {

    const mainToSave = new CreditCardExpenseDto()
    mainToSave.id = 0;
    mainToSave.userId = this.userId;
    mainToSave.companyId = this.companyId;
    mainToSave.registered = new Date();
    mainToSave.deleted = false;

    mainToSave.creditCardExpensesInstallments = [];
    mainToSave.creditCardExpensesInstallments[0] = { ...form.value };



    //console.log(toSave)

    this.add$<CreditCardExpenseDto>(mainToSave, 'AddCreditCardExpense').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        // this._route.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list/${this.companyId}`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })



  }

  // AddFillers(name: string) {


  //   const toSave: MonthFixedExpensesFillersDto = { id: 0, expensesName: name, companyId: JSON.parse(localStorage.getItem('companyId')), deleted: false };

  //   this.add$<MonthFixedExpensesFillersDto>(toSave, 'AddFixedExpensesFillers').subscribe({
  //     next: () => {
  //       //  this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
  //       //  this._route.navigateByUrl(`/side-nav/financial-dash/list-bank-account-cards`)
  //     },
  //     error: (erroCode) => {
  //       console.log(erroCode)
  //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //     }
  //   })
  // }


}
