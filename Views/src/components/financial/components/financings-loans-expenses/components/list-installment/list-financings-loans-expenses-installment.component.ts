import { BreakpointObserver } from '@angular/cdk/layout';
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
import { Observable, of } from 'rxjs';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';


import { ScreenDataInfoComponent } from '../../../common-components/screen-data-info/screen-data-info.component';
import { FinancingAndLoanExpenseInstallmentDto } from '../../dto/financing-and-loan-expense-installment-dto';
import { ListGridFinancingsLoansExpensesInstallmentDto } from './dto/list-grid-financings-loans-expenses-installment-dto';
import { FrontEndListFilterFinancingsLoansExpensesInstallment } from './filter-list/front-end-list-filter-financings-loans-expenses-installment';
import { ListFinancingsLoansExpensesInstallmentService } from './services/list-financings-loans-expenses-installment.service';
import { TriggerPaymentFinancingsLoansInstallment } from './trigger-payment-financings-loans-installment';


@Component({
  selector: 'list-financings-loans-expenses-installment',
  templateUrl: './list-financings-loans-expenses-installment.component.html',
  styleUrls: ['./list-financings-loans-expenses-installment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    
    MatCheckboxModule,
    MatRadioModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    BtnGComponent,
    SubTitleComponent,
    FilterBtnRadioComponent,
    ScreenDataInfoComponent
  ],
  providers: [
    ListFinancingsLoansExpensesInstallmentService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListFinancingsLoansExpensesInstallmentComponent extends FrontEndListFilterFinancingsLoansExpensesInstallment implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListFinancingsLoansExpensesInstallmentService
  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Vencimento', 'Valor pago', 'Nº Parcelas', 'Status'],
      ['expiresView', 'priceWasPaidInstallment', 'currentInstallment'],
      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/FinancingsAndLoansGetAllExpensesPagedAsync`;
  override  entities: ListGridFinancingsLoansExpensesInstallmentDto[] = [];
  override entities$: Observable<ListGridFinancingsLoansExpensesInstallmentDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-yearly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/add-financings-loans-expenses';

  pay = new TriggerPaymentFinancingsLoansInstallment(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  financingsLoansExpenses: FinancingAndLoanExpenseInstallmentDto[] = [];
  getEntityTopay(entity: FinancingAndLoanExpenseInstallmentDto) {
    const installment = this.financingsLoansExpenses.find(x => x.id == entity.id);

    this.pay.entityToPay = installment;

    this.pay.callRoute(this.pay.entityToPay);
  }

  screenFieldPosition: string = 'row';
  searchFieldYearlySelect: number = 50;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';

            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';

            break;
          }
        }
      }
    })
  }

  cleanRadios = false;
  filterClear() {
    this.cleanRadios = !this.cleanRadios
    this.filterCheckBoxSelected = null;
    this.getCurrentPagedInFrontEnd();
  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = of(this.entities);
    this.gridListCommonHelper.lengthPaginator.next(this.entities.length)
  }

  getCurrentEntitiesFromBackEnd(id: number) {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetInstallmentsByFinancingsAndLoansExpensesId`, id.toString());
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: FinancingAndLoanExpenseInstallmentDto[]) => {

      x.forEach((xy: FinancingAndLoanExpenseInstallmentDto) => {
        this.financingsLoansExpenses.push(xy);
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }


  makeGridItems(xy: FinancingAndLoanExpenseInstallmentDto) {
    let currentStallment: string[] = [];

    if (xy?.currentInstallment)
      currentStallment = xy.currentInstallment.split('/');

    const viewDto = new ListGridFinancingsLoansExpensesInstallmentDto;
    viewDto.id = xy.id
    viewDto.currentInstallment = `${currentStallment[0]} de ${currentStallment[1]}`
    viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    viewDto.expires = xy.expires;
    viewDto.priceWasPaidInstallment = this._ptBrCurrencyPipe.transform(xy.priceWasPaidInstallment);

    viewDto.companyId = xy.companyId;
    viewDto.userId = xy.userId;
    viewDto.bankAccountId = xy.bankAccountId;
    viewDto.deleted = xy.deleted;
    viewDto.cardId = xy.cardId;
    viewDto.pixId = xy.pixId;
    viewDto.interest = xy.interest;
    viewDto.registered = xy.registered;
    viewDto.othersPaymentMethods = xy.othersPaymentMethods;
    viewDto.wasPaid = xy.wasPaid;
    viewDto.document = xy.document;
    viewDto.financingAndLoanExpense = xy.financingAndLoanExpense

    return viewDto;
  }

  id: number;
  ngOnInit(): void {
    const id = this._actRoute.snapshot.params['id'];
    this.id = id;
    this.getCurrentEntitiesFromBackEnd(id);
  }

}
