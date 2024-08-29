import { NavigationExtras, Router } from "@angular/router";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { FormBase } from "src/shared/components/financial/payment/models/form-base";
import { InputField } from "src/shared/components/financial/payment/models/input-field";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { FinancingsLoansExpensesDto } from "../../dto/financings-loans-expenses-dto";
import { ListGridFinancingsLoansExpensesDto } from "./dto/list-grid-financings-loans-expenses-dto";
import { ListFinancingsLoansExpensesService } from "./services/list-financings-loans-expenses.service";
import { environment } from "src/environments/environment";


export class PaymentFinancingsloansExpense {

  constructor(
    private _listServices: ListFinancingsLoansExpensesService,
    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  controllerUrl:string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];

  toPay(entityGrid: ListGridFinancingsLoansExpensesDto) {
    this._listServices.loadById$<FinancingsLoansExpensesDto>('GetFinancingsAndLoansGetExpensesByIdAllIncluded', entityGrid.id.toString())
      .subscribe((x: FinancingsLoansExpensesDto) => {
        this.callRoute(x);
      })
  }

  callRoute(entity: FinancingsLoansExpensesDto) {

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          form: this.dynamicForm(entity),
          urlBackend: `${this.controllerUrl}/UpdateFinancingsAndLoans`
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment'], objectRoute);
  }

  makeInfoScreenData(entity: FinancingsLoansExpensesDto): FieldsScreenPayment[] {
    const obj = [
      { label: 'Descrição', value: entity.name, order: 2 },
      { label: 'Categoria', value: entity.categoryExpense.name, order: 3 },
      { label: 'Subcategoria', value: entity.subcategoryExpense.name, order: 4 },
      { label: 'Início', value: this._ptBrDatePipe.transform(entity.start, 'Date'), order: 5 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.expires, 'Date'), order: 5 },
      { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.price), order: 6 }
    ]
    return obj
  }

  dynamicForm(entity: FinancingsLoansExpensesDto) {
    
    const questions: FormBase<string>[] = [
      new InputField({
        key: 'id',
        // label: 'First name',
        value: entity?.id?.toString(),
        required: true,
        order: 1
      }),
      new InputField({
        key: 'name',
        // label: 'First name',
        value: entity?.name?.toString(),
        required: true,
        order: 2
      }),
      new InputField({
        key: 'categoryExpenseId',
        // label: 'First name',
        value: entity?.categoryExpenseId?.toString(),
        required: true,
        order: 3
      }),
      new InputField({
        key: 'subcategoryExpenseId',
        // label: 'First name',
        value: entity?.subcategoryExpenseId?.toString(),
        required: true,
        order: 4
      }),
      new InputField({
        key: 'document',
        // label: 'First name',
        value: entity?.document,
        required: false,
        order:5
      }),

      new InputField({
        key: 'companyId',
        // label: 'First name',
        value: JSON.parse(localStorage.getItem('companyId')),
        required: true,
        order: 6
      }),

      new InputField({
        key: 'userId',
        // label: 'First name',
        value: JSON.parse(localStorage.getItem('userId')),
        required: true,
        order: 7
      }),

      new InputField({
        key: 'bankAccountId',
        // label: 'First name',
        value: entity?.bankAccountId?.toString(),
        required: true,
        order: 8
      }),

      new InputField({
        key: 'pixId',
        // label: 'First name',
        value: entity?.pixId?.toString(),
        required: false,
        order: 9
      }),

      new InputField({
        key: 'othersPaymentMethods',
        // label: 'First name',
        value: entity?.othersPaymentMethods,
        required: false,
        order:10
      }),

      new InputField({
        key: 'cardId',
        // label: 'First name',
        value: entity?.cardId?.toString(),
        required: false,
        order: 11
      }),

      new InputField({
        key: 'wasPaid',
        // label: 'First name',
        value: new Date().toDateString(),
        required: true,
        order: 12
      }),

      new InputField({
        key: 'expires',
        // label: 'First name',
        value: entity?.expires?.toString(),
        required: true,
        order: 13
      }),

      new InputField({
        key: 'price',
        label: 'Valor Despesa',
        value: entity?.price?.toString(),
        required: true,
        order: 14
      }),

      new InputField({
        key: 'interest',
        label: 'Juros',
        value: entity?.interest?.toString(),
        required: false,
        order: 15
      }),
      new InputField({
        key: 'deleted',
        label: 'deleted',
        value: entity?.deleted?.toString(),
        required: false,
        order: 16
      }),
      new InputField({
        key: 'registered',
        label: 'registered',
        value: entity?.registered?.toString(),
        required: true,
        order: 17
      }),
      new InputField({
        key: 'description',
        label: 'description',
        value: entity?.description?.toString(),
        required: false,
        order: 18
      }),
      new InputField({
        key: 'linkCopyBill',
        label: 'linkCopyBill',
        value: entity?.linkCopyBill?.toString(),
        required: false,
        order: 19
      }),
      new InputField({
        key: 'userLinkCopyBill',
        label: 'userLinkCopyBill',
        value: entity?.userLinkCopyBill?.toString(),
        required: false,
        order: 20
      }),
      new InputField({
        key: 'passLinkCopyBill',
        label: 'passLinkCopyBill',
        value: entity?.passLinkCopyBill?.toString(),
        required: false,
        order: 21
      }),
      new InputField({
        key: 'start',
        label: 'start',
        value: entity?.start?.toString(),
        required: true,
        order: 22
      }),
      new InputField({
        key: 'end',
        label: 'end',
        value: entity?.end?.toString(),
        required: true,
        order: 23
      }),
    ];

    // return of(questions.sort((a, b) => a.order - b.order));
    return questions

  }

}















