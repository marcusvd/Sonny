import { NavigationExtras, Router } from "@angular/router";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { FinancingAndLoanExpenseInstallmentDto } from "../../dto/financing-and-loan-expense-installment-dto";


export class TriggerPaymentFinancingsLoansInstallment {

  constructor(

    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  public entityToPay: FinancingAndLoanExpenseInstallmentDto = null;

  callRoute(entity: FinancingAndLoanExpenseInstallmentDto) {

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
       //   'screenInfoFields': this.makeInfoScreenData(entity),
          'entity': entity,
          hideShowScreenDataInfo: true,
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment-financings-loans'], objectRoute);
  }
  
  // financingAndLoanExpenseId:
  // currentInstallment:
  // bankAccountId:
  // cardId:
  // pixId:
  // pixExpense: this.subFormLoad(),
  // othersPaymentMethods:
  // document:
  // expires:
  // wasPaid:
  // priceWasPaidInstallment:
  // interest:
  makeInfoScreenData(entity: FinancingAndLoanExpenseInstallmentDto): FieldsScreenPayment[] {
    const obj = [
     
      { label: 'Parcela', value: entity.currentInstallment, order: 2 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.expires, 'Date'), order: 3 },
      { label: 'Fim', value: this._ptBrDatePipe.transform(entity.expires, 'Date'), order: 5 },
//      { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.financingAndLoanExpense.installmentPrice), order: 8 }
    ]
    return obj
  }

}
