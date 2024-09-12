import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CardDto } from "src/components/financial/components/bank-account-cards/dto/card-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CreditCardExpensesDto } from "../../../dto/credit-card-expenses-dto";
import { CreditCardExpenseInvoiceDto } from "../../../dto/credit-card-expenses-invoice-dto";
import { CreditCardLimitOperationDto } from "src/components/financial/components/bank-account-cards/dto/credit-card-limit-operation-dto";

@Injectable()
export class AddCreditCardExpensesService extends BackEndService<CreditCardExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._CREDIT_CARD_EXPENSES)
  }

  save(form: FormGroup, creditCardLimitOperation:CreditCardLimitOperationDto) {

    const toSave: CreditCardExpensesDto = { ...form.value };

    const invoice = new CreditCardExpenseInvoiceDto();
    invoice.id = toSave.id;
    invoice.userId = toSave.userId;
    invoice.companyId = toSave.companyId;
    invoice.cardId = toSave.cardId;
    invoice.card = new CardDto();

    invoice.card.id = toSave.cardId;
    // invoice.card.creditCardLimitOperation = new 

    // invoice.amountPrice = toSave.price;
    invoice.interest = toSave.interest;
    invoice.expires = toSave.expires;
    invoice.wasPaid = toSave.wasPaid;
    invoice.othersPaymentMethods = toSave.othersPaymentMethods;
    invoice.document = toSave.document;
    invoice.description = toSave.description;
    invoice.registered = toSave.registered;
    invoice.deleted = toSave.deleted;
    invoice.creditCardExpense = toSave;

    //console.log(toSave)

    this.add$<CreditCardExpenseInvoiceDto>(invoice, 'AddCreditCardExpense').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        // this._route.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list/${this.companyId}`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
    // this.add$<CreditCardExpensesDto>(toSave, 'AddCreditCardExpense').subscribe({
    //   next: () => {
    //     this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
    //     // this._route.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list/${this.companyId}`)

    //   },
    //   error: (erroCode) => {
    //     console.log(erroCode)
    //     this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
    //   }
    // })



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
