
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule as MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';

import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';


import { ScreenDataInfoComponent } from '../../../common-components/screen-data-info/screen-data-info.component';
import { FinancingAndLoanExpenseInstallmentDto } from '../../dto/financing-and-loan-expense-installment-dto';
import { ListFinancingsLoansExpensesInstallmentDto } from './dto/list-financings-loans-expenses-installment-dto';
import { FrontEndListFilterFinancingsLoansExpensesInstallment } from './filter-list/front-end-list-filter-financings-loans-expenses-installment';
import { ListControlListFinancingsLoansExpensesInstallment } from '../list-installment/helpers/list-control-list-financings-loans-expenses-installment';
import { ListFinancingsLoansExpensesInstallmentService } from './services/list-financings-loans-expenses-installment.service';
import { TriggerPaymentFinancingsLoansInstallment } from './trigger-payment-financings-loans-installment';
import { ImportsListFinancingsLoansExpensesInstallment, ProvidersListFinancingsLoansExpensesInstallment } from '../list-installment/imports/imports-list-financings-loans-expenses-installment';
import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';


@Component({
  selector: 'list-financings-loans-expenses-installment',
  templateUrl: './list-financings-loans-expenses-installment.component.html',
  styleUrls: ['./list-financings-loans-expenses-installment.component.css'],
  standalone: true,
  imports: [
    ImportsListFinancingsLoansExpensesInstallment
  ],
  providers: [
    ProvidersListFinancingsLoansExpensesInstallment
  ]

})
export class ListFinancingsLoansExpensesInstallmentComponent extends ListControlListFinancingsLoansExpensesInstallment implements OnInit {

  constructor(
    private _actRoute: ActivatedRoute,
    private _listServices: ListFinancingsLoansExpensesInstallmentService,
    override _router: Router,
    override _http: HttpClient,
    private _fb: FormBuilder,
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
