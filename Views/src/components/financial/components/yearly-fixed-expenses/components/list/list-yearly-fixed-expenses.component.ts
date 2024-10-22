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
import { YearlyFixedExpenseDto } from '../../dto/yearly-fixed-expense-dto';
import { ListGridYearlyFixedExpenseDto } from './dto/list-grid-yearly-fixed-expense-dto';
import { BackEndListFilterYearlyExpenses } from './filter-list/back-end-list-filter-yearly-expenses';
import { FrontEndListFilterYearlyExpenses } from './filter-list/front-end-list-filter-yearly-expenses';
import { ListYearlyFixedExpensesService } from './services/list-yearly-fixed-expenses.service';
import { TriggerPaymentYearly } from './trigger-payment-yearly';

@Component({
  selector: 'list-yearly-fixed-expenses',
  templateUrl: './list-yearly-fixed-expenses.component.html',
  styleUrls: ['./list-yearly-fixed-expenses.component.css'],
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
    ListYearlyFixedExpensesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListYearlyFixedExpensesComponent extends List implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListYearlyFixedExpensesService

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
  controllerUrl:string = environment._YEARLY_FIXED_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllFixedExpensesTrackingPagedAsync`;
  override  entities: ListGridYearlyFixedExpenseDto[] = [];
  override entities$: Observable<ListGridYearlyFixedExpenseDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-yearly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/yearly-fixed-expenses-add';

  workingFrontEnd = new FrontEndListFilterYearlyExpenses();
  workingBackEnd = new BackEndListFilterYearlyExpenses();

  pay = new TriggerPaymentYearly(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  listYearlyFixedExpense: YearlyFixedExpenseDto[] = [];
  getEntityTopay(entity: ListGridYearlyFixedExpenseDto) {
    const yearlyExpense = this.listYearlyFixedExpense.find(x => x.id == entity.id);

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


  filterView(checkbox: MatCheckboxChange) {
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
    this.backEndUrl = `${this.controllerUrl}/GetAllYearlyFixedExpensesByCompanyId`;
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: YearlyFixedExpenseDto[]) => {
      x.forEach((xy: YearlyFixedExpenseDto) => {
        this.listYearlyFixedExpense.push(xy);
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
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllYearlyFixedExpensesByCompanyId`, this.companyId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: YearlyFixedExpenseDto[]) => {

      x.forEach((xy: YearlyFixedExpenseDto) => {
        this.listYearlyFixedExpense.push(xy);
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }

  statusStyle: boolean[] = [];

  makeGridItems(xy: YearlyFixedExpenseDto) {
    const viewDto = new ListGridYearlyFixedExpenseDto;
    const wasPaid: Date = new Date(xy.wasPaid)
    viewDto.id = xy.id
    viewDto.start = this._ptBrDatePipe.transform(xy.start, 'Date');
    viewDto.expiration = xy.expires;
    viewDto.expirationView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    viewDto.description = xy.name;
    viewDto.category = xy.categoryExpense.name;
    viewDto.subcategory = xy.subcategoryExpense.name;
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
