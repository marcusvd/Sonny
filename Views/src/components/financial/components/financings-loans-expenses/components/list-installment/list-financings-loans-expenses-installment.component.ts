import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';


import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { ListControlListFinancingsLoansExpensesInstallment } from '../list-installment/helpers/list-control-list-financings-loans-expenses-installment';
import { ListFinancingsLoansExpensesInstallmentImports, ListFinancingsLoansExpensesInstallmentProviders } from '../list-installment/imports/list-financings-loans-expenses-installment.imports';
import { ListFinancingsLoansExpensesInstallmentService } from './services/list-financings-loans-expenses-installment.service';


@Component({
  selector: 'list-financings-loans-expenses-installment',
  templateUrl: './list-financings-loans-expenses-installment.component.html',
  styleUrls: ['./list-financings-loans-expenses-installment.component.css'],
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
export class ListFinancingsLoansExpensesInstallmentComponent extends ListControlListFinancingsLoansExpensesInstallment implements OnInit {

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



  id: number;
  ngOnInit(): void {
    const id = this._actRoute.snapshot.params['id'];

    this.financingsLoansExpensesInstallmentSubscribe = this.startSupply(`${this.controllerUrl}/GetInstallmentsByFinancingsAndLoansExpensesId`, id);
    // this.id = id;
    // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
  }


  controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];
  // override backEndUrl: string = `${this.controllerUrl}/FinancingsAndLoansGetAllExpensesPagedAsync`;
  // override viewUrlRoute: string = '/financial/view-yearly-fixed-expenses-tracking';
  override addUrlRoute: string = '/financial/add-financings-loans-expenses';






  // filterClear() {
  //   this.cleanRadios = !this.cleanRadios
  //   this.filterCheckBoxSelected = null;
  //   this.getCurrentPagedInFrontEnd();
  // }


  // getCurrentEntitiesFromBackEnd(id: number) {
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetInstallmentsByFinancingsAndLoansExpensesId`, id.toString());
  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: FinancingAndLoanExpenseInstallmentDto[]) => {

  //     x.forEach((xy: FinancingAndLoanExpenseInstallmentDto) => {
  //       this.financingsLoansExpenses.push(xy);
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.getCurrentPagedInFrontEnd();
  //   })
  // }


  // makeGridItems(xy: FinancingAndLoanExpenseInstallmentDto) {
  //   let currentStallment: string[] = [];

  //   if (xy?.currentInstallment)
  //     currentStallment = xy.currentInstallment.split('/');

  //   const viewDto = new ListFinancingsLoansExpensesInstallmentDto;
  //   viewDto.id = xy.id
  //   viewDto.currentInstallment = `${currentStallment[0]} de ${currentStallment[1]}`
  //   viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
  //   viewDto.expires = xy.expires;
  //   viewDto.priceWasPaidInstallment = this._ptBrCurrencyPipe.transform(xy.priceWasPaidInstallment);

  //   viewDto.companyId = xy.companyId;
  //   viewDto.userId = xy.userId;
  //   viewDto.bankAccountId = xy.bankAccountId;
  //   viewDto.deleted = xy.deleted;
  //   viewDto.cardId = xy.cardId;
  //   viewDto.pixId = xy.pixId;
  //   viewDto.interest = xy.interest;
  //   viewDto.registered = xy.registered;
  //   viewDto.othersPaymentMethods = xy.othersPaymentMethods;
  //   viewDto.wasPaid = xy.wasPaid;
  //   viewDto.document = xy.document;
  //   viewDto.financingAndLoanExpense = xy.financingAndLoanExpense

  //   return viewDto;
  // }


  // ngOnInit(): void {

  //   // this.getCurrentEntitiesFromBackEnd(id);
  // }

}
