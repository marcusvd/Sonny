
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { ListControlCreditCardInvoices } from '../../../credit-card-fixed-expenses/components/list-invoices/helpers/list-control-credit-card-invoices';
import { ListCreditCardInvoicesImports, ListCreditCardInvoicesProviders } from '../list-invoices/imports/list-credit-card-invoices.imports';
import { ListCreditCardInvoicesService } from './services/list-credit-card-invoices.service';


@Component({
  selector: 'list-credit-card-invoices',
  templateUrl: './list-credit-card-invoices.component.html',
  styleUrls: ['./list-credit-card-invoices.component.scss'],
  standalone: true,
  imports: [
    ListDefaultImports,
    ListCreditCardInvoicesImports,
  ],
  providers: [
    ListCreditCardInvoicesProviders,
    ListDefaultProviders
  ]

})
export class ListCreditCardInvoicesComponent extends ListControlCreditCardInvoices implements OnInit, OnDestroy {

  creditCardExpenseInvoiceSubscribe: Subscription;

  constructor(
    private _fb: FormBuilder,
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _listCreditCardInvoicesService: ListCreditCardInvoicesService,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe
  ) {
    super(
      _router,
      _http,
      _dialog,
      _listCreditCardInvoicesService,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe
    )
  }

  ngOnInit(): void {
    this.selectedMonth(this.monthFilter);
  }

  ngOnDestroy(): void {
    this.creditCardExpenseInvoiceSubscribe?.unsubscribe();
  }
}
