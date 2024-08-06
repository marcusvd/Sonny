import { NavigationExtras, Router } from "@angular/router";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { FormBase } from "src/shared/components/financial/payment/models/form-base";
import { InputField } from "src/shared/components/financial/payment/models/input-field";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { YearlyFixedExpensesTrackingDto } from "../dto/yearly-fixed-expenses-tracking-dto";
import { YearlyFixedExpensesTrackingListGridDto } from "./dto/yearly-fixed-expenses-tracking-list-grid-dto";
import { YearlyFixedExpensesTrackingListService } from "./services/yearly-fixed-expenses-tracking-list.service";

export class PaymentYearlyFixedExpenses {

  constructor(
    private _listServices: YearlyFixedExpensesTrackingListService,
    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  toPay(entityGrid: YearlyFixedExpensesTrackingListGridDto) {
    this._listServices.loadById$<YearlyFixedExpensesTrackingDto>('GetYearlyFixedExpensesTrackingByIdAllIncluded', entityGrid.id.toString())
      .subscribe((x: YearlyFixedExpensesTrackingDto) => {
        this.callRoute(x);
      })
  }

  callRoute(entity: YearlyFixedExpensesTrackingDto) {
    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          form: this.dynamicForm(entity),
          urlBackend: 'YearlyFixedExpensesTracking/UpdateYearlyFixedExpensesTracking'
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment'], objectRoute);
  }

  makeInfoScreenData(entity: YearlyFixedExpensesTrackingDto): FieldsScreenPayment[] {
    const obj = [
      { label: 'Descrição', value: entity.yearlyFixedExpenses.description, order: 2 },
      { label: 'Categoria', value: entity.yearlyFixedExpenses.categoryExpenses.name, order: 3 },
      { label: 'Subcategoria', value: entity.yearlyFixedExpenses.subcategoryExpenses.name, order: 4 },
      { label: 'Início', value: this._ptBrDatePipe.transform(entity.yearlyFixedExpenses.start, 'Date'), order: 5 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.yearlyFixedExpenses.expiration, 'Date'), order: 5 },
      { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.yearlyFixedExpenses.price), order: 6 }
    ]
    return obj
  }

  dynamicForm(entity: YearlyFixedExpensesTrackingDto) {
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
        key: 'YearlyFixedExpensesId',
        // label: 'First name',
        value: entity?.yearlyFixedExpensesId?.toString(),
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
