import { NavigationExtras, Router } from "@angular/router";
import { MonthlyFixedExpensesTrackingDto } from "../dto/monthly-fixed-expenses-tracking-dto";
import { MonthlyFixedExpensesTrackingListGridDto } from "./dto/monthly-fixed-expenses-tracking-list-grid-dto";
import { MonthlyFixedExpensesTrackingListService } from "./services/monthly-fixed-expenses-tracking-list.service";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { InputField } from "src/shared/components/financial/payment/models/input-field";
import { FormBase } from "src/shared/components/financial/payment/models/form-base";

export class PaymentMonthlyFixedExpenses {

  constructor(
    private _listServices: MonthlyFixedExpensesTrackingListService,
    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  toPay(entityGrid: MonthlyFixedExpensesTrackingListGridDto) {

    this._listServices.loadById$<MonthlyFixedExpensesTrackingDto>('GetFixedExpensesTrackingByIdAllIncluded', entityGrid.id.toString())
      .subscribe((x: MonthlyFixedExpensesTrackingDto) => {
        this.callRoute(x);

      })


  }

  callRoute(entity: MonthlyFixedExpensesTrackingDto) {

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          form: this.dynamicForm(entity),
          urlBackend: 'MonthlyFixedExpensesTracking/UpdateFnFixedExpensesTracking'
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment'], objectRoute);
  }

  makeInfoScreenData(entity: MonthlyFixedExpensesTrackingDto): FieldsScreenPayment[] {
    const obj = [
      { label: 'Descrição', value: entity.monthlyFixedExpenses.description, order: 2 },
      { label: 'Categoria', value: entity.monthlyFixedExpenses.categoryExpenses.name, order: 3 },
      { label: 'Subcategoria', value: entity.monthlyFixedExpenses.subcategoryExpenses.name, order: 4 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.monthlyFixedExpenses.expiration, 'Date'), order: 5 },
      { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.monthlyFixedExpenses.price), order: 6 }
    ]
    return obj
  }

  dynamicForm(entity: MonthlyFixedExpensesTrackingDto) {
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
        key: 'monthlyFixedExpensesId',
        // label: 'First name',
        value: entity?.monthlyFixedExpensesId?.toString(),
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
