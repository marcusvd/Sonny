import { NavigationExtras, Router } from "@angular/router";
import { FieldsScreenPayment } from "src/shared/components/financial/payment/models/fields-screen-payment";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";
import { FinancingsLoansExpensesDto } from "../../dto/financings-loans-expenses-dto";


export class TriggerPaymentFinancingsLoansInstallment {

  constructor(

    private _router: Router,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
  }

  public entityToPay: FinancingsLoansExpensesDto = null;

  callRoute(entity: FinancingsLoansExpensesDto) {

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

  // makeInfoScreenData(entity: FinancingsLoansExpensesDto): FieldsScreenPayment[] {
  //   const obj = [
  //     { label: 'Descrição', value: entity.name, order: 1 },
  //     { label: 'Parcela', value: entity.currentInstallment, order: 2 },
  //     { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.expires, 'Date'), order: 3 },
  //     { label: 'Início', value: this._ptBrDatePipe.transform(entity.start, 'Date'), order: 4 },
  //     { label: 'Fim', value: this._ptBrDatePipe.transform(entity.end, 'Date'), order: 5 },
  //     { label: 'Categoria', value: entity.categoryExpense.name, order: 6 },
  //     { label: 'Subcategoria', value: entity.subcategoryExpense.name, order: 7 },
  //     { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.price), order: 8 }
  //   ]
  //   return obj
  // }

}
