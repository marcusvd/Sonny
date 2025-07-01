import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';

import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { ListControlListFinancingsLoansExpensesInstallment } from '../list-installment/helpers/list-control-financings-loans-expenses-installment';
import { ListFinancingsLoansExpensesInstallmentImports, ListFinancingsLoansExpensesInstallmentProviders } from '../list-installment/imports/list-financings-loans-expenses-installment.imports';


@Component({
  selector: 'list-financings-loans-expenses-installment',
  templateUrl: './list-financings-loans-expenses-installment.component.html',
  styleUrls: ['./list-financings-loans-expenses-installment.component.scss'],
  standalone: true,
  imports: [
    ListFinancingsLoansExpensesInstallmentImports,
    ListDefaultImports,
  ],
  providers: [
    ListFinancingsLoansExpensesInstallmentProviders,
    ListDefaultProviders,
  ]

})
export class ListFinancingsLoansExpensesInstallmentComponent extends ListControlListFinancingsLoansExpensesInstallment implements OnInit{

  constructor(
    private _actRoute: ActivatedRoute,
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _deleteServices: DeleteServices,
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

  financingsLoansExpensesInstallmentSubscribe: Subscription;
  ngOnDestroy(): void {
    this.financingsLoansExpensesInstallmentSubscribe?.unsubscribe();
  }

  ngOnInit(): void {
    const id = this._actRoute.snapshot.params['id'];
    this.financingsLoansExpensesInstallmentSubscribe = this.startSupply(`${this.controllerUrl}/GetInstallmentsByFinancingsAndLoansExpensesId`, id);


  }

}
