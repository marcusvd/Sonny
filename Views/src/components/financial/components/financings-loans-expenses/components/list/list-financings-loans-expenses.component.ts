
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { Subscription } from 'rxjs';

import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { environment } from '../../../../../../environments/environment';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { FinancingsLoansExpensesDto } from '../../dto/financings-loans-expenses-dto';
import { ListControlFinancingsLoansExpenses } from '../list/helpers/list-control-financings-loans-expenses';
import { ListFinancingsLoansExpensesImports, ListFinancingsLoansExpensesProviders } from '../list/imports/list-financings-loans-expenses.imports';
import { TriggerPaymentFinancingsLoans } from './trigger-payment-financings-loans';


@Component({
  selector: 'list-financings-loans-expenses',
  templateUrl: './list-financings-loans-expenses.component.html',
  styleUrls: ['./list-financings-loans-expenses.component.css'],
  standalone: true,
  imports: [
    ListFinancingsLoansExpensesImports,
    ListDefaultImports,
  ],
  providers: [
    ListDefaultProviders,
    ListFinancingsLoansExpensesProviders
  ]

})
export class ListFinancingsLoansExpensesComponent extends ListControlFinancingsLoansExpenses {

  controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/FinancingsAndLoansGetAllExpensesPagedAsync`;
  FinancingsLoansExpensesSubscribe: Subscription;
  financingsLoansExpenses: FinancingsLoansExpensesDto[] = [];

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
    super(
      _router,
      _http,
      _dialog,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe,
    )
  }

  ngOnInit(): void {
    this.FinancingsLoansExpensesSubscribe = this.startSupply(`${this.controllerUrl}/GetAllFinancingsAndLoansExpensesByCompanyId`, this.companyId.toString());
  }

  ngOnDestroy(): void {
    this.FinancingsLoansExpensesSubscribe?.unsubscribe();
  }

  pay = new TriggerPaymentFinancingsLoans(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  getEntityTopay(entity: FinancingsLoansExpensesDto) {
    const yearlyExpense = this.financingsLoansExpenses.find(x => x.id == entity.id);

    this.pay.entityToPay = yearlyExpense;

    this.pay.callRoute(this.pay.entityToPay);
  }

}
