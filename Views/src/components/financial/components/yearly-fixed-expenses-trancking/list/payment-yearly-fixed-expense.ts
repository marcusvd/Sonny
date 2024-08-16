import { NavigationExtras, Router } from "@angular/router";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { FormBase } from "src/shared/components/financial/payment/models/form-base";
import { InputField } from "src/shared/components/financial/payment/models/input-field";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { YearlyFixedExpenseTrackingDto } from "../dto/yearly-fixed-expense-tracking-dto";
import { YearlyFixedExpenseTrackingListGridDto } from "./dto/yearly-fixed-expense-tracking-list-grid-dto";
import { YearlyFixedExpensesTrackingListService } from "./services/yearly-fixed-expenses-tracking-list.service";

export class PaymentYearlyFixedExpense {

  constructor(
    private _listServices: YearlyFixedExpensesTrackingListService,
    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  toPay(entityGrid: YearlyFixedExpenseTrackingListGridDto) {
    this._listServices.loadById$<YearlyFixedExpenseTrackingDto>('GetYearlyFixedExpenseTrackingByIdAllIncluded', entityGrid.id.toString())
      .subscribe((x: YearlyFixedExpenseTrackingDto) => {
        this.callRoute(x);
      })
  }

  callRoute(entity: YearlyFixedExpenseTrackingDto) {
    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          form: this.dynamicForm(entity),
          urlBackend: 'YearlyFixedExpenseTracking/UpdateYearlyFixedExpenseTracking'
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment'], objectRoute);
  }

  makeInfoScreenData(entity: YearlyFixedExpenseTrackingDto): FieldsScreenPayment[] {
    const obj = [
      { label: 'Descrição', value: entity.yearlyFixedExpense.description, order: 2 },
      { label: 'Categoria', value: entity.yearlyFixedExpense.categoryExpenses.name, order: 3 },
      { label: 'Subcategoria', value: entity.yearlyFixedExpense.subcategoryExpenses.name, order: 4 },
      { label: 'Início', value: this._ptBrDatePipe.transform(entity.yearlyFixedExpense.start, 'Date'), order: 5 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.yearlyFixedExpense.expiration, 'Date'), order: 5 },
      { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.yearlyFixedExpense.price), order: 6 }
    ]
    return obj
  }

  dynamicForm(entity: YearlyFixedExpenseTrackingDto) {
    const questions: FormBase<string>[] = [
      new InputField({
        key: 'id',
        // label: 'First name',
        value: entity?.id?.toString(),
        required: true,
        order: 1
      }),

      new InputField({
        key: 'companyId',
        // label: 'First name',
        value: JSON.parse(localStorage.getItem('companyId')),
        required: true,
        order: 2
      }),

      new InputField({
        key: 'userId',
        // label: 'First name',
        value: JSON.parse(localStorage.getItem('userId')),
        required: true,
        order: 3
      }),

      new InputField({
        key: 'YearlyFixedExpenseId',
        // label: 'First name',
        value: entity?.yearlyFixedExpenseId?.toString(),
        required: true,
        order: 4
      }),

      new InputField({
        key: 'bankAccountId',
        // label: 'First name',
        value: entity?.bankAccountId?.toString(),
        required: true,
        order: 5
      }),

      new InputField({
        key: 'pixId',
        // label: 'First name',
        value: entity?.pixId?.toString(),
        required: false,
        order: 6
      }),

      new InputField({
        key: 'othersPaymentMethods',
        // label: 'First name',
        value: entity?.othersPaymentMethods,
        required: false,
        order: 7
      }),

      new InputField({
        key: 'cardId',
        // label: 'First name',
        value: entity?.cardId?.toString(),
        required: false,
        order: 8
      }),

      new InputField({
        key: 'wasPaid',
        // label: 'First name',
        value: new Date().toDateString(),
        required: true,
        order: 9
      }),

      new InputField({
        key: 'expiration',
        // label: 'First name',
        value: entity?.expiration?.toString(),
        required: true,
        order: 10
      }),

      new InputField({
        key: 'price',
        label: 'Valor Despesa',
        value: entity?.price?.toString(),
        required: true,
        order: 11
      }),

      new InputField({
        key: 'interest',
        label: 'Juros',
        value: entity?.interest?.toString(),
        required: false,
        order: 12
      }),
    ];

    // return of(questions.sort((a, b) => a.order - b.order));
    return questions

  }

}
