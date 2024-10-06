import { NavigationExtras, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { CreditCardExpenseInvoiceDto } from "../../dto/credit-card-expense-invoice-dto";

export class TriggerCreditCardsInvoices {

  constructor(

    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  public entityToPay: CreditCardExpenseInvoiceDto = null;

  callRoute(entity: CreditCardExpenseInvoiceDto) {

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          'entity': entity,
          hideShowScreenDataInfo: true,
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment-credit-card-expenses'], objectRoute);
  }
  
  monthsString: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  makeInfoScreenData(entity: CreditCardExpenseInvoiceDto): FieldsScreenPayment[] {
    const obj = [
      { label: 'Fatura mês', value: this.monthsString[new Date(entity.expires).getMonth()], order: 1 },
      { label: 'Número Cartão', value: entity.card.number, order: 2 },
      { label: 'Bandeira', value: entity.card.flag, order: 3 },
      { label: 'Banco', value: entity.card.bankAccount.institution, order: 4 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.expires, 'Date'), order: 5 },
      { label: 'Valor fatura', value: this._ptBrCurrencyPipe.transform(entity.price), order: 6 }
    ]
    return obj
  }

}