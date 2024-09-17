import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CreditCardLimitOperationDto } from "src/components/financial/components/bank-account-cards/dto/credit-card-limit-operation-dto";
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


  save(creditCardLimitOperation: CreditCardLimitOperationDto, form: FormGroup) {
    //creditCardLimitOperation.limitCreditUsed += form.get('price').value;
    const toSave: CreditCardExpenseDto = { ...form.value };
    toSave.creditCardLimitOperation = creditCardLimitOperation;
    this.add$<CreditCardExpenseDto>(toSave, 'AddCreditCardExpense').subscribe({
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

  // save(form: FormGroup) {

  //   const toSave: CreditCardExpensesDto = { ...form.value };

  //   const invoice = new CreditCardExpenseInvoiceDto();
  //   invoice.id = toSave.id;
  //   invoice.userId = toSave.userId;
  //   invoice.companyId = toSave.companyId;
  //   invoice.cardId = toSave.cardId;
  //   invoice.interest = toSave.interest;
  //   invoice.expires = toSave.expires;
  //   invoice.wasPaid = toSave.wasPaid;
  //   invoice.othersPaymentMethods = toSave.othersPaymentMethods;
  //   invoice.document = toSave.document;
  //   invoice.description = toSave.description;
  //   invoice.registered = toSave.registered;
  //   invoice.deleted = toSave.deleted;
  //   invoice.creditCardExpense = toSave;

  //   this.add$<CreditCardExpenseInvoiceDto>(invoice, 'AddCreditCardExpense').subscribe({
  //     next: () => {
  //       this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
  //       // this._route.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list/${this.companyId}`)

  //     },
  //     error: (erroCode) => {
  //       console.log(erroCode)
  //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //     }
  //   })


  // }

}
