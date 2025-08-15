
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';



import { Subscription } from 'rxjs';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { SearchGListComponent } from '../../../../../../shared/search-g/search-list.component';
import { ImportsListCashWithdrawnExpenses, ProvidersListCashWithdrawnExpenses } from '../../components/list/imports/imports-list-cash-withdrawn-expenses';
import { ListCashWithdrawnExpensesService } from '../../services/list-cash-withdrawn-expenses.service';
import { ListControlCashWithdrawnExpenses } from '../list/helpers/list-control-cash-withdrawn-expenses';
import { map } from 'rxjs/operators';

@Component({
  selector: 'list-cash-withdrawn-expenses',
  templateUrl: './list-cash-withdrawn-expenses.component.html',
  styleUrls: ['./list-cash-withdrawn-expenses.component.scss'],
  standalone: true,
  imports: [
    ImportsListCashWithdrawnExpenses,
    ListDefaultImports,
    SearchGListComponent
  ],
  providers: [
    ProvidersListCashWithdrawnExpenses,
    ListDefaultProviders
  ]

})
export class ListCashWithdrawnExpensesComponent extends ListControlCashWithdrawnExpenses implements OnInit {


  @Output() outFieldSearch = new EventEmitter<string>();

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _route: ActivatedRoute,
    private _actRoute: ActivatedRoute,
    private _listServices: ListCashWithdrawnExpensesService,
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

  cashWithdrawnExpensesSubscribe: Subscription;
  ngOnDestroy(): void {
    this.cashWithdrawnExpensesSubscribe?.unsubscribe();
  }

  ngOnInit(): void {
    // bankAccount
    this.cashWithdrawnExpensesSubscribe = this.startSupply(`${this.controllerUrl}/GetAllCashWithdrawnExpensesByCompanyId`, this.companyId.toString());

  }


}
