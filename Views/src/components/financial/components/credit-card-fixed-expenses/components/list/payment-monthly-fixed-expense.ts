import { NavigationExtras, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { FormBase } from "src/shared/components/financial/payment/models/form-base";
import { InputField } from "src/shared/components/financial/payment/models/input-field";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { ListCreditCardExpensesDto } from "./dto/list-credit-card-expenses-dto";
import { ListCreditCardExpensesService } from "./services/list-credit-card-expenses.service";
import { CreditCardExpenseDto } from "../../dto/credit-card-expense-dto";

export class PaymentMonthlyFixedExpense {

  constructor(
    private _listServices: ListCreditCardExpensesService,
    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  controllerUrl: string = environment._MONTHLY_FIXED_EXPENSES.split('/')[4];
  toPay(entityGrid: ListCreditCardExpensesDto) {

    this._listServices.loadById$<CreditCardExpenseDto>('GetFixedExpensesByIdAllIncluded', entityGrid.id.toString())
      .subscribe((x: CreditCardExpenseDto) => {
        this.callRoute(x);

      })


  }

  callRoute(entity: CreditCardExpenseDto) {

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          // form: this.dynamicForm(entity),
          urlBackend: `${this.controllerUrl}/UpdateMonthlyFixedExpense`
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment'], objectRoute);
  }

  makeInfoScreenData(entity: CreditCardExpenseDto): FieldsScreenPayment[] {
    const obj = [
      { label: 'Despesa', value: entity.name, order: 2 },
      { label: 'Categoria', value: entity.categoryExpense.name, order: 3 },
      { label: 'Subcategoria', value: entity.subcategoryExpense.name, order: 4 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.expires, 'Date'), order: 5 },
      { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.price), order: 6 }
    ]
    return obj
  }

}
