import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { MonthFixedExpensesTrackingDto } from "../../../../month-fixed-expenses-trancking/dto/month-fixed-expenses-tracking-dto";
import { MonthFixedExpensesDto } from "../../../dto/month-fixed-expenses-dto";

@Injectable()
export class MonthFixedExpensesService extends BackEndService<MonthFixedExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._MONTH_FIXED_EXPENSES)
  }

  makeTrackingEntity(fixedExpenses: MonthFixedExpensesDto): MonthFixedExpensesTrackingDto {

    const trancking = new MonthFixedExpensesTrackingDto()
    trancking.companyId = this.companyId;
    trancking.userId = JSON.parse(localStorage.getItem('userId'))
    trancking.bankAccountId = null;
    trancking.pixId = null;
    trancking.cardId = null;
    trancking.othersPaymentMethods = null;
    trancking.wasPaid = new Date('0001-01-01T00:00:00Z');
    trancking.expiration = new Date(fixedExpenses.expiration);
    trancking.registered = new Date();

    if (fixedExpenses.price)
      trancking.price = fixedExpenses.price;
    else
      trancking.price = 0;

    trancking.interest = 0;


    return trancking;
  }

  save(form: FormGroup) {

    if (form.get('nameId').value == null)
      form.get('nameId').setValue(0);

    const toSave: MonthFixedExpensesDto = { ...form.value };
    toSave.userId = JSON.parse(localStorage.getItem('userId'));


    this.add$<MonthFixedExpensesDto>(toSave, 'AddFixedExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
          this._route.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list/${this.companyId}`)

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
