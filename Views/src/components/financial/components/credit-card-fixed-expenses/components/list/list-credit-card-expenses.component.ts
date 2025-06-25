import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { environment } from 'src/environments/environment';
import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ListCreditCardExpensesImports, ListCreditCardExpensesProviders } from '../../../../../../components/financial/components/credit-card-fixed-expenses/components/list/imports/list-credit-card-expenses.imports';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { ListControlCreditCardExpenses } from '../list/helpers/list-control-credit-card-expenses';

@Component({
  selector: 'list-credit-card-expenses',
  templateUrl: './list-credit-card-expenses.component.html',
  styleUrls: ['./list-credit-card-expenses.component.css'],
  standalone: true,
  imports: [
    ListCreditCardExpensesImports,
    ListDefaultImports
  ],
  providers: [
    ListCreditCardExpensesProviders,
    ListDefaultProviders
  ]

})
export class ListCreditCardExpensesComponent extends ListControlCreditCardExpenses implements OnInit {

  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];
  creditCardExpenseSubscribe: Subscription;

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _actRoute: ActivatedRoute,
  ) {
    super(
      _router,
      _http,
      _dialog,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe
    )
  }

  ngOnInit(): void {
    this.creditCardExpenseSubscribe = this.startSupply(`${this.controllerUrl}/GetCreditCardExpensesByIdInvoice`, this._actRoute.snapshot.params['id'])
  }
  
  ngOnDestroy(): void {
    this.creditCardExpenseSubscribe?.unsubscribe();
  }

}
