import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
// import { FinancialResolver } from 'src/shared/components/financial/resolvers/financial.resolver';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
// import { MonthExpensesTrackingListFilter } from '../../common-components/static-business-rule/static-business-rule';

import { environment } from 'src/environments/environment';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { MonthlyFixedExpenseDto } from '../../dto/monthly-fixed-expense-dto';
import { ListGridMonthlyFixedExpenseDto } from './dto/monthly-fixed-expense-tracking-list-grid-dto';
import { BackEndFilterMonthlyExpensesList } from './filter-list/back-end-filter-monthly-expenses-list';
import { FrontEndListFilterMonthlyExpenses } from './filter-list/front-end-list-filter-monthly-expenses';

import { ListMonthlyFixedExpensesService } from './services/list-monthly-fixed-expenses.service';
import { TriggerPaymentMonthly } from './trigger-payment-monthly';


@Component({
  selector: 'list-monthly-fixed-expenses',
  templateUrl: './list-monthly-fixed-expenses.component.html',
  styleUrls: ['./list-monthly-fixed-expenses.component.css'],
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
    MonthsSelectComponent,
    FilterBtnRadioComponent
  ],
  providers: [
    ListMonthlyFixedExpensesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListMonthlyFixedExpensesComponent extends FrontEndListFilterMonthlyExpenses implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListMonthlyFixedExpensesService,
  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['','Vencimento','Despesa','Preço','Status'],
      ['expiresView','name','price'],
      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment._MONTHLY_FIXED_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllFixedExpensesByCompanyIdPagedAsync`;
  override  entities: ListGridMonthlyFixedExpenseDto[] = [];
  override entities$: Observable<ListGridMonthlyFixedExpenseDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-monthly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/monthly-fixed-expenses-add';

  workingBackEnd = new BackEndFilterMonthlyExpensesList();



  toPay: MonthlyFixedExpenseDto = null;
  listMonthlyFixedExpense: MonthlyFixedExpenseDto[] = [];
  getEntityTopay(entity: ListGridMonthlyFixedExpenseDto) {
    const monthlyExpense = this.listMonthlyFixedExpense.find(x => x.id == entity.id);

    this.pay.entityToPay = monthlyExpense;

    this.pay.callRoute(this.pay.entityToPay);
  }

  pay = new TriggerPaymentMonthly(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  screenFieldPosition: string = 'row';
  searchFieldMonthSelect: number = 90;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.searchFieldMonthSelect = 50;
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.searchFieldMonthSelect = 50;
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 70;
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 90;
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 90;
            break;
          }
        }
      }
    })
  }

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  clearRadios() {
    if (this.radioExpired && this.radioPedding && this.radioPaid) {
      this.radioExpired.checked = false;
      this.radioPedding.checked = false;
      this.radioPaid.checked = false;
    }
  }

 

  filterClear() {
    this.clearRadios();
    this.getCurrentPagedInFrontEnd();
    this.monthFilter = new MonthsDto();
    this.monthFilter.id = this.months[this.currentDate.getMonth()].id;
    this.monthFilter.name = this.months[this.currentDate.getMonth()].name;
    this.monthHideShowPendingRadio = this.monthFilter;
  }

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.clearRadios();
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;

    this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id);

    // this.orderByFrontEnd(, { 'expires': new Date() })

  }


  filterView(checkbox: MatCheckboxChange) {
    if (checkbox.source.value == 'expired') 
      this.entities$ = this.isExpires(this.entities, this.monthFilter.id, 0, this.pageSize);  

    if (checkbox.source.value == 'pending')
      this.entities$ = this.isPending(this.entities, this.monthFilter.id, 0, this.pageSize);

    if (checkbox.source.value == 'paid')
      this.entities$ = this.isPaid(this.entities, this.monthFilter.id, 0, this.pageSize);
  }



  queryFieldOutput($event: FormControl) {
    this.entities$ = this.query($event, this.monthFilter.id);
  }





  // private lengthPaginatorOfQuery(entities$: Observable<ListGridMonthlyFixedExpenseDto[]>) {
  //   entities$.pipe(
  //     map(x => {
  //       this.gridListCommonHelper.lengthPaginator.next(x.length)
  //     })).subscribe();
  // }




  get pedingRadioHide() {
    if (this.monthHideShowPendingRadio.id == -1)
      return false;

    return this.monthHideShowPendingRadio.id < this.currentDate.getMonth();
  }

  getData() {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.getCurrentEntitiesFromBackEndPaged();
    else {
      this.getCurrentEntitiesFromBackEnd();
    }
  }

  getCurrentEntitiesFromBackEndPaged() {

    this.backEndUrl = `${this.controllerUrl}/GetAllFixedExpensesByCompanyIdPagedAsync`;
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: MonthlyFixedExpenseDto[]) => {
      x.forEach((xy: MonthlyFixedExpenseDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.entities$ = of(this.entities)
    })
  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.getCurrentByCurrentYearAndEqualAndLessThenSelectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id)
  }



  getCurrentEntitiesFromBackEnd() {
    const comapanyId: number = this.companyId;
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFixedExpensesByCompanyId`, comapanyId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: MonthlyFixedExpenseDto[]) => {

      x.forEach((xy: MonthlyFixedExpenseDto) => {
        this.listMonthlyFixedExpense.push(xy)
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }

  statusStyle: boolean[] = [];

  makeGridItems(xy: MonthlyFixedExpenseDto) {
    const wasPaid: Date = new Date(xy.wasPaid)
    const viewDto = new ListGridMonthlyFixedExpenseDto;
    viewDto.wasPaid = xy.wasPaid;
    viewDto.id = xy.id;
    // viewDto.category = xy.categoryExpense.name.toUpperCase();
    // viewDto.subcategory = xy.subcategoryExpense.name.toUpperCase();
    viewDto.name = xy.name;
    viewDto.expires = xy.expires
    viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear())
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);

    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    this._actRoute.data.subscribe(x => {
      this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    })
    this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
    this.getData();
  }

}
