import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import { List } from 'src/shared/components/inheritance/list/list';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { YearsDto } from 'src/shared/components/years-select/years-dto';
import { YearsSelectComponent } from 'src/shared/components/years-select/years-select-g.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { FinancialStaticBusinessRule } from '../../common-components/static-business-rule/static-business-rule';
import { YearlyFixedExpensesTrackingDto } from '../dto/yearly-fixed-expenses-tracking-dto';
import { YearlyFixedExpensesTrackingListGridDto } from './dto/yearly-fixed-expenses-tracking-list-grid-dto';
import { PaymentYearlyFixedExpenses } from './payment-yearly-fixed-expenses';
import { YearlyFixedExpensesTrackingListService } from './services/yearly-fixed-expenses-tracking-list.service';

@Component({
  selector: 'yearly-fixed-expenses-tracking-list',
  templateUrl: './yearly-fixed-expenses-tracking-list.component.html',
  styleUrls: ['./yearly-fixed-expenses-tracking-list.component.css'],
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
    YearsSelectComponent
  ],
  providers: [
    YearlyFixedExpensesTrackingListService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
    // FinancialResolver,
  ]

})
export class YearlyFixedExpensesTrackingListComponent extends List implements OnInit, AfterViewInit, OnChanges {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _communicationsAlerts: CommunicationAlerts,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: YearlyFixedExpensesTrackingListService

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Descrição', 'Início', 'Vencimento', 'Preço', 'Liquidado', 'Status'],
      ['description', 'start', 'expirationView', 'price', 'wasPaidView'],
      _breakpointObserver,
      _listServices
    )
  }


  override backEndUrl: string = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
  override  entities: YearlyFixedExpensesTrackingListGridDto[] = [];
  override entities$: Observable<YearlyFixedExpensesTrackingListGridDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-month-fixed-expenses-tracking';

  ngOnChanges(changes: SimpleChanges): void {
    // this.entities$ = of(this.entities.filter(x => new Date(x.expiration).getMonth() == this.monthFilter.id));
    // this.screen();
    // console.log(this.resetMonth.id)
  }

  screenFieldPosition: string = 'row';
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

  pay = new PaymentYearlyFixedExpenses(
    this._listServices,
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe
  );

  // toPay(entityGrid: YearlyFixedExpensesTrackingListGridDto) {
  //   this._router.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-to-pay/${entityGrid.id.toString()}`)
  // }

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  resetYear: YearsDto;
  clearRadios() {
    if (this.radioExpired && this.radioPedding && this.radioPaid) {
      this.radioExpired.checked = false;
      this.radioPedding.checked = false;
      this.radioPaid.checked = false;
    }
  }

  filterClear() {

    this.clearRadios();
    this.getAllLessThanOrEqualCurrentDate();

    this.resetYear = new YearsDto();
    this.resetYear.id = -1;
    this.resetYear.year = 'TODOS';
    this.yearHideShowPendingRadio = this.resetYear;
  }

  yearFilter: YearsDto;
  yearHideShowPendingRadio: YearsDto = new YearsDto();
  // selectedMonth(year: YearsDto) {

  //   this.clearRadios();
  //   this.yearFilter = year;
  //   this.yearHideShowPendingRadio = year;
  //   if (this.yearFilter.id != -1) {
  //     this.entities$ = of(this.entities.filter(x => this.checkMonth(x.expiration) && this.checkPeriod(x.expiration)).slice(0, this.pageSize));
  //     this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => this.checkMonth(x.expiration) && this.checkPeriod(x.expiration)).length)
  //   }

  //   if (this.yearFilter.id == -1)
  //     this.getAllLessThanOrEqualCurrentDate();

  // }

  getAllLessThanOrEqualCurrentDate() {
    this.entities$ = of(this.entities.filter(x => this.checkPeriod(x.expiration)).slice(0, this.pageSize));
    this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => this.checkPeriod(x.expiration)).length)
  }

  totalYearAgo: number = 5;

  checkPeriod(expirationDate: Date): boolean {

    // const expires = new Date(expirationDate);

    // const DateCurrent = new Date();

    // const lessFiveYear = new Date().setFullYear(new Date().getFullYear() - this.totalYearAgo)

    // if (expires.getFullYear() >= DateCurrent.getFullYear())


    //   const fiveYearsAgo = new Date(lessFiveYear)

    // let id = 0;


    return false;

  }

  checkExpired(x: YearlyFixedExpensesTrackingListGridDto) {
    return FinancialStaticBusinessRule.isExpired(x.expiration.toString(), x.wasPaid.toString())
  }

  checkPedding(x: YearlyFixedExpensesTrackingListGridDto) {
    return FinancialStaticBusinessRule.isPending(x.expiration.toString(), x.wasPaid.toString())
  }

  checkPaid(x: YearlyFixedExpensesTrackingListGridDto) {
    return FinancialStaticBusinessRule.isPaid(x.wasPaid.toString())
  }

  filterFrontEnd(checkbox: MatCheckboxChange) {
    if (checkbox.source.value == 'expired')
      this.expiredFilter()

    if (checkbox.source.value == 'pending')
      this.pedingFilter();

    if (checkbox.source.value == 'paid')
      this.paidFilter();
  }

  expired: boolean = false;
  expiredFilter() {
    this.entities$ = of(this.entities.filter(x => this.checkExpired(x)).slice(0, this.pageSize));
    this.entities$.pipe(map(entities => this.gridListCommonHelper.lengthPaginator.next(entities.length))).subscribe();
  }

  pedingFilter() {
    this.entities$ = of(this.entities.filter(x => this.checkPedding(x)).slice(0, this.pageSize));
    this.entities$.pipe(map(entities => this.gridListCommonHelper.lengthPaginator.next(entities.length))).subscribe();
  }

  paidFilter() {
    this.entities$ = of(this.entities.filter(x => this.checkPaid(x)).slice(0, this.pageSize));
    this.entities$.pipe(map(entities => this.gridListCommonHelper.lengthPaginator.next(entities.length))).subscribe();
  }

  isdescending = true;
  orderBy(field: string) {

    if (this.gridListCommonHelper.pgIsBackEnd)
      this.orderByBackEnd(field);
    else
      this.orderByFrontEnd(field);

  }

  orderByBackEnd(field: string) {
    this.isdescending = !this.isdescending;
    this.backEndUrl = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
    const value = field;

    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, null, {}));
  }

  orderByFrontEnd(field: string) {
    this.isdescending = !this.isdescending;

    // if (field.toLowerCase() === 'conta') {

    //   this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
    //     if (this.isdescending)
    //       return x.fixedExpenses.localeCompare(field)
    //     else
    //       return y.fixedExpenses.localeCompare(field)
    //   })))

    // }
    // if (field.toLowerCase() === 'descrição') {

    //   this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
    //     if (this.isdescending)
    //       return x.nameIdentification.localeCompare(field)
    //     else
    //       return y.nameIdentification.localeCompare(field)
    //   })))

    // }
    if (field.toLowerCase() === 'vencimento') {

      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.expiration).getTime() - new Date(y.expiration).getTime();
        else
          return new Date(y.expiration).getTime() - new Date(x.expiration).getTime();
      })))

    }
    if (field.toLowerCase() === 'preço') {
      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          console.log(priceX)
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          return priceY - priceX;
        }
      })))

    }
    if (field.toLowerCase() === 'status') {


      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.wasPaid).getTime() - this.minValue.getTime();
        else
          return this.minValue.getTime() - new Date(x.wasPaid).getTime();
      })))

    }

  }

  queryFieldOutput($event: FormControl) {

    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.paginatorBelow.pageIndex = 0;
      this.paginatorAbove.pageIndex = 0;
      this.backEndUrl = 'YearlyFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
      this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, $event, null));

    }

    else {
      //frontEnd
      this.entities$ = of(this.entities.filter(x => this.queryHandledFront(x, $event.value)));
      this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => this.queryHandledFront(x, $event.value)).length)

      if ($event.value.length === 1)
        this.filterClear()
    }
  }

  queryHandledFront(x: YearlyFixedExpensesTrackingListGridDto, term: string) {
    return (this.removeAccentsSpecialCharacters(x.description.toLowerCase()).includes(this.removeAccentsSpecialCharacters(term).toLowerCase()) || this.removeAccentsSpecialCharacters(x.category.toLowerCase()).includes(this.removeAccentsSpecialCharacters(term).toLowerCase()));
  }


  getData() {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.getPagedBackEnd();
    else
      this.getPagedFrontEnd();
  }

  getPagedBackEnd() {
    this.backEndUrl = 'YearlyFixedExpensesTracking/GetAllYearlyFixedExpensesTrackingPagedAsync';
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: YearlyFixedExpensesTrackingDto[]) => {
      x.forEach((xy: YearlyFixedExpensesTrackingDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.entities$ = of(this.entities)
    })
  }

  getPagedFrontEnd() {

    this.gridListCommonHelper.getAllEntitiesInMemoryPaged('YearlyFixedExpensesTracking/GetAllYearlyFixedExpensesTrackingByIdCompanyAsync', this.companyId);

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: YearlyFixedExpensesTrackingDto[]) => {

      x.forEach((xy: YearlyFixedExpensesTrackingDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.entities$ = of(this.entities)

    })
  }

  makeGridItems(xy: YearlyFixedExpensesTrackingDto) {

    const viewDto = new YearlyFixedExpensesTrackingListGridDto;
    const wasPaid: Date = new Date(xy.wasPaid)

    viewDto.id = xy.id
    viewDto.start = this._ptBrDatePipe.transform(xy.start, 'Date');
    viewDto.expiration = xy.expiration;
    viewDto.expirationView = this._ptBrDatePipe.transform(xy.expiration, 'Date');
    viewDto.description = xy.yearlyFixedExpenses.description;
    viewDto.category = xy.yearlyFixedExpenses.categoryExpenses.name;
    viewDto.subcategory = xy.yearlyFixedExpenses.subcategoryExpenses.name;
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    viewDto.wasPaid = xy.wasPaid;

    if (wasPaid.getFullYear() == this.minValue.getFullYear())
      viewDto.wasPaidView = 'Não efetuado'
    else
      viewDto.wasPaidView = this._ptBrDatePipe.transform(xy.wasPaid, 'Date');

    // this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear())



    return viewDto;
  }

  ngOnInit(): void {
    this._actRoute.data.subscribe(x => {
      this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    })
    this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
    this.getData();





  }


}
