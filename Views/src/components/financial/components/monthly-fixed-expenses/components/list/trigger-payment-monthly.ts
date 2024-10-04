import { NavigationExtras, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { MonthlyFixedExpenseDto } from "../../dto/monthly-fixed-expense-dto";

export class TriggerPaymentMonthly {

  constructor(
    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }
  
  public entityToPay: MonthlyFixedExpenseDto = null;

  callRoute(entity: MonthlyFixedExpenseDto) {

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          'entity': entity,
          hideShowScreenDataInfo: true,
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/payment-monthly'], objectRoute);
  }

  makeInfoScreenData(entity: MonthlyFixedExpenseDto): FieldsScreenPayment[] {
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
