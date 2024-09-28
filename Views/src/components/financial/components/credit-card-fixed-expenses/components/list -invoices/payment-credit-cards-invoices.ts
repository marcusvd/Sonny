import { NavigationExtras, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { FormBase } from "src/shared/components/financial/payment/models/form-base";
import { InputField } from "src/shared/components/financial/payment/models/input-field";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";

import { CreditCardExpenseInvoiceDto } from "../../dto/credit-card-expense-invoice-dto";
import { ListCreditCardInvoicesService } from "./services/list-credit-card-invoices.service";

export class PaymentCreditCardsInvoices {

  constructor(
    private _listServices: ListCreditCardInvoicesService,
    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,

  ) {
  }

  controllerUrl: string = environment.CREDIT_CARD_EXPENSES_INVOICES.split('/')[4];
  monthsString: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public entityToPay: CreditCardExpenseInvoiceDto = null;
  toPay() {

    this.callRoute(this.entityToPay);
    // this._listServices.loadById$<CreditCardExpenseDto>('GetFixedExpensesByIdAllIncluded', entityGrid.id.toString())
    //   .subscribe((x: CreditCardExpenseDto) => {
    //

    //   })


  }

  callRoute(entity: CreditCardExpenseInvoiceDto) {

   // console.log(entity.creditCardExpenses[0].creditCardLimitOperation.id)

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          form: this.dynamicForm(entity),
          urlBackend: `${this.controllerUrl}/UpdateCreditCardExpensesInvoice`,
          itemsHtmlToVisible: { bankAccountSelectSingleIsVisible: false },
        }
      }
    };
console.log(entity.creditCardExpenses[0].creditCardLimitOperation)

    this._router.navigate(['/side-nav/financial-dash/payment'], objectRoute);
  }

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

  dynamicForm(entity: CreditCardExpenseInvoiceDto) {

    const questions: FormBase<string>[] = [
      new InputField({
        key: 'id',
        value: entity?.id?.toString(),
        required: true,
        order: 1
      }),

      new InputField({
        key: 'userId',
        value: JSON.parse(localStorage.getItem('userId')),
        required: true,
        order: 2
      }),
      new InputField({
        key: 'cardId',
        value: entity.cardId.toString(),
        required: true,
        order: 3
      }),

      new InputField({
        key: 'bankAccountId',
        value: entity.bankAccount.id.toString(),
        required: true,
        order: 4
      }),

      new InputField({
        key: 'wasPaid',
        value: new Date().toDateString(),
        required: true,
        order: 5
      }),

      new InputField({
        key: 'price',
        label: 'Valor Despesa',
        value: entity?.price?.toString(),
        required: true,
        order: 6
      }),

      new InputField({
        key: 'interest',
        label: 'Juros',
        value: entity?.interest?.toString(),
        required: false,
        order: 7
      }),
     
    ];

    return questions

  }

}
