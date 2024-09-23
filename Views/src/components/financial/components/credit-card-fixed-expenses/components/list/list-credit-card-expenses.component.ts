import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
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
import { List } from 'src/shared/components/inheritance/list/list';
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
import { FinancialSubtitleDto } from '../../../common-components/subtitle/financial-subtitle-dto';
import { FinancialSubtitleComponent } from '../../../common-components/subtitle/financial-subtitle.component';
import { CreditCardExpenseDto } from '../../dto/credit-card-expense-dto';
import { ListGridCreditCardExpensesDto } from './dto/list-grid-credit-card-expenses-dto';
import { BackEndListFilterCreditCardExpenses } from './filter-list/back-end-list-filter-credit-card-expenses';
import { FrontEndListFilterCreditCardExpenses } from './filter-list/front-end-list-filter-credit-card-expenses';
import { PaymentMonthlyFixedExpense } from './payment-monthly-fixed-expense';
import { ListCreditCardExpensesService } from './services/list-credit-card-expenses.service';


@Component({
  selector: 'list-credit-card-expenses',
  templateUrl: './list-credit-card-expenses.component.html',
  styleUrls: ['./list-credit-card-expenses.component.css'],
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
    FilterBtnRadioComponent,
    FinancialSubtitleComponent
  ],
  providers: [
    ListCreditCardExpensesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListCreditCardExpensesComponent extends List implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListCreditCardExpensesService

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Despesa', 'Categoria', 'Subcategoria', 'Vencimento', 'Preço', 'Status'],
      ['name', 'category', 'subcategory', 'expirationView', 'price'],
      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  override  entities: ListGridCreditCardExpensesDto[] = [];
  override entities$: Observable<ListGridCreditCardExpensesDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-monthly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/add-credit-card-expenses';

  workingFrontEnd = new FrontEndListFilterCreditCardExpenses();
  workingBackEnd = new BackEndListFilterCreditCardExpenses();

  pay = new PaymentMonthlyFixedExpense(
    this._listServices,
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

  months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]

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
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.workingBackEnd.selectedMonth();
    }
    else {
      if (this.monthFilter.id != -1) {
        this.entities$ = this.workingFrontEnd.selectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }

      if (this.monthFilter.id == -1) {
        this.entities$ = this.workingFrontEnd.getAllLessThanOrEqualCurrentDate(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }
    }
  }

  filter(checkbox: MatCheckboxChange) {
    if (this.gridListCommonHelper.pgIsBackEnd) {
      if (checkbox.source.value == 'expired') {
        this.workingBackEnd.isExpires()
      }

      if (checkbox.source.value == 'pending') {
        this.workingBackEnd.isPending()
      }

      if (checkbox.source.value == 'paid') {
        this.workingBackEnd.isPaid()
      }
    }
    else {
      if (checkbox.source.value == 'expired') {

        this.entities$ = this.workingFrontEnd.isExpires(this.entities, this.monthFilter.id, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }

      if (checkbox.source.value == 'pending') {

        this.entities$ = this.workingFrontEnd.isPending(this.entities, this.monthFilter.id, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();

      }

      if (checkbox.source.value == 'paid') {
        this.entities$ = this.workingFrontEnd.isPaid(this.entities, this.monthFilter.id, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();

      }
    }

  }

  termSearched: string = null;
  queryFieldOutput($event: FormControl) {
    this.termSearched = $event.value
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.workingBackEnd.searchField();
    }
    else {
      //frontEnd
      this.entities$ = this.workingFrontEnd.searchField(this.entities, this.monthFilter.id, 0, this.pageSize, $event.value);
      this.entities$.pipe(
        map(x => {
          this.gridListCommonHelper.lengthPaginator.next(x.length)
        })).subscribe();

      if ($event.value.length > 0)
        this.clearRadios();
    }
  }

  get pedingRadioHide() {
    if (this.monthHideShowPendingRadio.id == -1)
      return false;

    return this.monthHideShowPendingRadio.id < this.currentDate.getMonth();
  }

  orderBy(field: string) {

    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else
      this.entities$ = this.workingFrontEnd.orderByFrontEnd(this.entities$, field)

  }

  getData(credCardInvoiceId: number) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.getCurrentEntitiesFromBackEndPaged();
    else
      this.getCurrentEntitiesFromBackEnd(credCardInvoiceId);

  }

  getCurrentEntitiesFromBackEndPaged() {

    this.backEndUrl = `${this.controllerUrl}/GetAllFixedExpensesByCompanyIdPagedAsync`;
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: CreditCardExpenseDto[]) => {
      x.forEach((xy: CreditCardExpenseDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.entities$ = of(this.entities)
    })
  }

  getCurrentPagedInFrontEnd() {

    this.entities$ = this.workingFrontEnd.current(this.entities, 0, this.pageSize)
    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length)
      })).subscribe();

  }

  // paymentStatus(creditCardExpense: CreditCardExpenseDto) {
  //   if (creditCardExpense.creditCardExpenseInvoice.wasPaid.getFullYear() != this.minValue.getFullYear())
  //     this.paid = true;
  // }



  statusCollection: FinancialSubtitleDto[] = [
    { id: 1, name: 'Vencida', class: 'bg-color-expired', visible: false },
    { id: 2, name: 'Pendente', class: 'bg-color-will-expire', visible: false },
    { id: 3, name: 'Liquidada', class: 'bg-color-paid', visible: false }
  ]

  getCurrentEntitiesFromBackEnd(credCardInvoiceId: number) {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetCreditCardExpensesByIdInvoice`, credCardInvoiceId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseDto[]) => {

      x.forEach((xy: CreditCardExpenseDto) => {
        this.paymentStatus(x[0])
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }


  paymentStatus(creditCardExpense: CreditCardExpenseDto) {
    //PAID
    this.workingFrontEnd.isPaid(this.entities, this.monthFilter.id, 0, this.pageSize).subscribe(
      x => {
        if (x.length > 0){
        console.log(x)
      this.statusCollection.find(x => x.id == 3).visible = true;}
    }
    )
    
    //EXPIRED
    this.workingFrontEnd.isExpires(this.entities, this.monthFilter.id, 0, this.pageSize).subscribe(
      x => {
        if (x.length > 0){
        console.log(x)
          this.statusCollection.find(x => x.id == 1).visible = true;}
      }
    )
    //WILL EXPIRES
    this.workingFrontEnd.isPending(this.entities, this.monthFilter.id, 0, this.pageSize).subscribe(
      x => {
        if (x.length > 0){
          console.log(x)
        this.statusCollection.find(x => x.id == 2).visible = true;}
      }
    )


    // if (this.workingFrontEnd.isExpires(this.entities, this.monthFilter.id, 0, this.pageSize))

    // if (checkbox.source.value == 'expired') {

    //   this.entities$ = this.workingFrontEnd.isExpires(this.entities, this.monthFilter.id, 0, this.pageSize);

    //   this.entities$.pipe(
    //     map(x => {
    //       this.gridListCommonHelper.lengthPaginator.next(x.length)
    //     })).subscribe();
    // }

    // if (this.workingFrontEnd.isPending(this.entities, this.monthFilter.id, 0, this.pageSize))


    // if (checkbox.source.value == 'pending') {

    //   this.entities$ = this.workingFrontEnd.isPending(this.entities, this.monthFilter.id, 0, this.pageSize);

    //   this.entities$.pipe(
    //     map(x => {
    //       this.gridListCommonHelper.lengthPaginator.next(x.length)
    //     })).subscribe();

    // }

    // if (this.workingFrontEnd.isPaid(this.entities, this.monthFilter.id, 0, this.pageSize)) {

    // }



    // if (checkbox.source.value == 'paid') {
    //   this.entities$ = this.workingFrontEnd.isPaid(this.entities, this.monthFilter.id, 0, this.pageSize);

    //   this.entities$.pipe(
    //     map(x => {
    //       this.gridListCommonHelper.lengthPaginator.next(x.length)
    //     })).subscribe();

    // }

  }



  statusStyle: boolean[] = [];
  makeGridItems(xy: CreditCardExpenseDto) {
    const wasPaid: Date = new Date(xy.wasPaid);
    const viewDto = new ListGridCreditCardExpensesDto;
    viewDto.wasPaid = xy.wasPaid;
    viewDto.id = xy.id;
    viewDto.category = xy.categoryExpense.name.toUpperCase();
    viewDto.subcategory = xy.subcategoryExpense.name.toUpperCase();


    viewDto.name = xy.name;
    viewDto.expiration = xy.expires;
    viewDto.expirationView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear());
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);

    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    this.getData(this._actRoute.snapshot.params['id'] as number);

    // this._actRoute.data.subscribe(x => {
    //   this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    //   console.log(x['loaded'] as number)
    // })
    this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
  }

}
