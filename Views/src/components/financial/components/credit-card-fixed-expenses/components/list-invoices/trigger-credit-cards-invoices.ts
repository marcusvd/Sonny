import { NavigationExtras, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { CreditCardExpenseInvoiceDto } from "./dto/credit-card-expense-invoice-dto";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


export class TriggerCreditCardsInvoices extends BaseForm {

  constructor(
     ) {super()
  }

  public entityToPay: CreditCardExpenseInvoiceDto = null;

  // callRouter(entity: CreditCardExpenseInvoiceDto) {

  //   const objectRoute: NavigationExtras = {
  //       state: entity
  //   };

  //   this._router.navigate(['/financial/payment-credit-card-expenses'], objectRoute);
  // }


  

  // monthsString: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  // makeInfoScreenData(entity: CreditCardExpenseInvoiceDto): FieldsScreenPayment[] {
  //   console.log(entity)


  //   const obj = [
  //     { label: 'Fatura mês', value: this.monthsString[new Date(entity.expires).getMonth()], order: 1 },
  //     { label: 'Número Cartão', value: entity.card?.number, order: 2 },
  //     { label: 'Bandeira', value: entity.card.flag, order: 3 },
  //     { label: 'Banco', value: entity.card.bankAccount.institution, order: 4 },
  //     { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.expires, 'Date'), order: 5 },
  //     { label: 'Valor fatura', value: this._ptBrCurrencyPipe.transform(entity.price), order: 6 }
  //   ]
  //   return obj
  // }

}
