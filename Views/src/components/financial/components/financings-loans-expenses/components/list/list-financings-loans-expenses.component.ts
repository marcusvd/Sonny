import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { List } from 'src/shared/components/inheritance/list/list';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';

import { IEntityGridAction } from 'src/shared/components/grid-list-common/interface/entity-grid-action';
import { ViewExpensesGDto } from '../../../common-components/view-expenses-g/dtos/view-expense-g-dto';
import { FinancingsLoansExpensesDto } from '../../dto/financings-loans-expenses-dto';
import { ListGridFinancingsLoansExpensesDto } from './dto/list-grid-financings-loans-expenses-dto';
import { BackEndListFilterFinancingsLoansExpenses } from './filter-list/back-end-list-filter-financings-loans-expenses';
import { FrontEndListFilterFinancingsLoansExpenses } from './filter-list/front-end-list-filter-financings-loans-expenses';
import { ListFinancingsLoansExpensesService } from './services/list-financings-loans-expenses.service';
import { TriggerPaymentFinancingsLoans } from './trigger-payment-financings-loans';


@Component({
  selector: 'list-financings-loans-expenses',
  templateUrl: './list-financings-loans-expenses.component.html',
  styleUrls: ['./list-financings-loans-expenses.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    BtnGComponent,
    SubTitleComponent,
    FilterBtnRadioComponent
  ],
  providers: [
    ListFinancingsLoansExpensesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListFinancingsLoansExpensesComponent extends List implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListFinancingsLoansExpensesService

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['',
        'Despesa',
        'Valor parcela',
        'Nº Parcelas'],
      ['name',
        'installmentPrice',
        'installmentsQuantity'],
      _breakpointObserver,
      _listServices
    )
  }
  controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/FinancingsAndLoansGetAllExpensesPagedAsync`;
  override  entities: ListGridFinancingsLoansExpensesDto[] = [];
  override entities$: Observable<ListGridFinancingsLoansExpensesDto[]>;
  override viewListUrlRoute: string = '/side-nav/financial-dash/list-financings-loans-expenses-installment';
  override viewUrlRoute: string = '/side-nav/financial-dash/view-financings-loans-expenses';
  override addUrlRoute: string = '/side-nav/financial-dash/add-financings-loans-expenses';

  workingFrontEnd = new FrontEndListFilterFinancingsLoansExpenses();
  workingBackEnd = new BackEndListFilterFinancingsLoansExpenses();

  pay = new TriggerPaymentFinancingsLoans(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );


  financingsLoansExpenses: FinancingsLoansExpensesDto[] = [];
  getEntityTopay(entity: FinancingsLoansExpensesDto) {
    const yearlyExpense = this.financingsLoansExpenses.find(x => x.id == entity.id);

    this.pay.entityToPay = yearlyExpense;

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

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  override getEntity($event: IEntityGridAction, itemWillDeleted?: string) {

    if ($event.action == 'visibility')
      this.viewDialog(this.viewUrlRoute, this.makeObjToShow($event.entity));

    if ($event.action == 'format_list_numbered')
      this.viewList(this.viewListUrlRoute, $event.entity.id);
  }

  makeObjToShow(entity: ListGridFinancingsLoansExpensesDto): ViewExpensesGDto[] {

    const obj = [
      { label: 'Descrição', value: entity.name, order: 1 },
      { label: 'Categoria', value: entity.categoryExpense.name, order: 2 },
      { label: 'Subcategoria', value: entity.subcategoryExpense.name, order: 3 },
      { label: 'Início', value: this._ptBrDatePipe.transform(entity.start, 'Date'), order: 4 },
      { label: 'Fim', value: this._ptBrDatePipe.transform(entity.end, 'Date'), order: 5 },
      { label: 'Código', value: entity.id, order: 6 },
      { label: 'Prestações', value: entity.installmentsQuantity, order: 7 },
      { label: 'Valor por prestação', value: entity.installmentPrice, order: 8 },
      { label: '', value: entity.userId, order: 9 },
      { label: '', value: entity.user, order: 10 },
      { label: '', value: entity.companyId, order: 11 },
      { label: '', value: entity.company, order: 12 },
      { label: '', value: entity.totalPriceToBePaid, order: 13 },
      { label: '', value: entity.totalPriceFinancingOrLoan, order: 14 },
      { label: '', value: entity.totalPriceInterest, order: 15 },
      { label: '', value: entity.totalPercentageInterest, order: 16 },
      { label: '', value: entity.wasPaid, order: 19 },
      { label: '', value: entity.deleted, order: 20 },
      { label: '', value: entity.registered, order: 21 },
      { label: '', value: entity.description, order: 22 },
      { label: '', value: entity.linkCopyBill, order: 23 },
      { label: '', value: entity.uSERLinkCopyBill, order: 24 },
      { label: '', value: entity.pASSLinkCopyBill, order: 25 },

    ]

    return obj

  }

  
  queryFieldOutput($event: FormControl) {
    this.termSearched = $event.value
    this.entities$ = this.searchField(this.entities, 0, this.pageSize, this.termSearched)
  }

  orderBy(field: string) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else {
      if (field == 'Despesa')
        this.entities$ = this.orderByFrontEnd(this.entities$, { name: 'name' });

      if (field == 'Valor parcela')
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'installmentPrice': 0 });

      if (field == 'Nº Parcelas')
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'installmentsQuantity': 0 });
    }

  }

  getCurrentPagedInFrontEnd() {

    this.entities$ = this.workingFrontEnd.current(this.entities, 0, this.pageSize)
    this.paginatorLength();
  }

  paginatorLength() {
    this.gridListCommonHelper.lengthPaginator.next(this.lengthPaginatorNoFilter(this.entities));
  }


  getCurrentEntitiesFromBackEnd() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFinancingsAndLoansExpensesByCompanyId`, this.companyId.toString());
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: FinancingsLoansExpensesDto[]) => {
      x.forEach((xy: FinancingsLoansExpensesDto) => {
        this.financingsLoansExpenses.push(xy)
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }

  statusStyle: boolean[] = [];

  makeGridItems(xy: FinancingsLoansExpensesDto) {

    const viewGridDto = new ListGridFinancingsLoansExpensesDto();
    viewGridDto.id = xy.id;
    viewGridDto.category = xy.categoryExpense.name;
    viewGridDto.name = xy.name;
    viewGridDto.installmentsQuantity = xy.installmentsQuantity.toString();
    viewGridDto.installmentPrice = this._ptBrCurrencyPipe.transform(xy.installmentPrice);
    viewGridDto.userId = xy.userId;
    viewGridDto.user = xy.user;
    viewGridDto.companyId = xy.companyId;
    viewGridDto.company = xy.company;
    viewGridDto.start = xy.start;
    viewGridDto.end = xy.end;
    viewGridDto.totalPriceToBePaid = xy.totalPriceToBePaid;
    viewGridDto.totalPriceFinancingOrLoan = xy.totalPriceFinancingOrLoan;
    viewGridDto.totalPriceInterest = xy.totalPriceInterest;
    viewGridDto.totalPercentageInterest = xy.totalPercentageInterest;
    viewGridDto.wasPaid = xy.wasPaid;
    viewGridDto.deleted = xy.deleted;
    viewGridDto.registered = xy.registered;
    viewGridDto.description = xy.description;
    viewGridDto.linkCopyBill = xy.linkCopyBill;
    viewGridDto.uSERLinkCopyBill = xy.uSERLinkCopyBill;
    viewGridDto.pASSLinkCopyBill = xy.pASSLinkCopyBill;
    return viewGridDto
  }



  ngOnInit(): void {
    this.screen();
    this.getCurrentEntitiesFromBackEnd();
  }

}
