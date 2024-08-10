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
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
// import { YearlyExpensesTrackingListFilter } from '../../common-components/static-business-rule/static-business-rule';
import { YearlyFixedExpensesTrackingDto } from '../dto/yearly-fixed-expenses-tracking-dto';
import { YearlyFixedExpensesTrackingListGridDto } from './dto/yearly-fixed-expenses-tracking-list-grid-dto';
import { BackEndFilterYearlyExpensesTrackingList } from './filter-list/back-end-filter-yearly-expenses-tracking-list';
import { FrontEndFilterYearlyExpensesTrackingList } from './filter-list/front-end-filter-yearly-expenses-tracking-list';
import { PaymentYearlyFixedExpenses } from './payment-yearly-fixed-expenses';
import { YearlyFixedExpensesTrackingListService } from './services/yearly-fixed-expenses-tracking-list.service';
import { FilterBtnRadioComponent } from '../../common-components/filter-btn-radio/filter-btn-radio.component';

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
    FilterBtnRadioComponent
  ],
  providers: [
    YearlyFixedExpensesTrackingListService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class YearlyFixedExpensesTrackingListComponent extends List implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
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
      ['', 'Descrição', 'Categoria', 'Subcategoria', 'Vencimento', 'Preço', 'Status'],
      ['description', 'category', 'subcategory', 'expirationView', 'price'],
      _breakpointObserver,
      _listServices
    )
  }

  override backEndUrl: string = 'YearlyFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
  override  entities: YearlyFixedExpensesTrackingListGridDto[] = [];
  override entities$: Observable<YearlyFixedExpensesTrackingListGridDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-yearly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/yearly-fixed-expenses-add';

  workingFrontEnd = new FrontEndFilterYearlyExpensesTrackingList();
  workingBackEnd = new BackEndFilterYearlyExpensesTrackingList();

  pay = new PaymentYearlyFixedExpenses(
    this._listServices,
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

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

        this.entities$ = this.workingFrontEnd.isExpires(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }

      if (checkbox.source.value == 'pending') {

        this.entities$ = this.workingFrontEnd.isPending(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();

      }

      if (checkbox.source.value == 'paid') {
        this.entities$ = this.workingFrontEnd.isPaid(this.entities, 0, this.pageSize);

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
      this.entities$ = this.workingFrontEnd.searchField(this.entities, 0, this.pageSize, $event.value);
      this.entities$.pipe(
        map(x => {
          this.gridListCommonHelper.lengthPaginator.next(x.length)
        })).subscribe();

      if ($event.value.length > 0)
        this.clearRadios();
    }
  }

  orderBy(field: string) {

    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else
      this.entities$ = this.workingFrontEnd.orderByFrontEnd(this.entities$, field)

  }

  getData() {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.getCurrentEntitiesFromBackEndPaged();
    else {
      this.getCurrentEntitiesFromBackEnd();
    }
  }

  getCurrentEntitiesFromBackEndPaged() {
    this.backEndUrl = 'YearlyFixedExpensesTracking/GetAllYearlyFixedExpensesTrackingByIdCompanyAsync';
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: YearlyFixedExpensesTrackingDto[]) => {
      x.forEach((xy: YearlyFixedExpensesTrackingDto) => {
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

  getCurrentEntitiesFromBackEnd() {
    const comapanyId: number = JSON.parse(localStorage.getItem('companyId'))
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged('YearlyFixedExpensesTracking/GetAllYearlyFixedExpensesTrackingByIdCompanyAsync', comapanyId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: YearlyFixedExpensesTrackingDto[]) => {

      x.forEach((xy: YearlyFixedExpensesTrackingDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }

  statusStyle: boolean[] = [];

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
    this.screen();
    this._actRoute.data.subscribe(x => {
      this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    })
    this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
    this.getData();
  }

}
