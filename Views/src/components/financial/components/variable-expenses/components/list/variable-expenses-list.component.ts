import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';
import { map } from 'rxjs/operators';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { List } from 'src/shared/components/inheritance/list/list';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { VariableExpensesDto } from '../../dto/variable-expenses-dto';
import { VariableExpensesListGridDto } from './dto/variable-expenses-list-grid-dto';
import { BackEndFilterVariableExpensesList } from './filter-list/back-end-filter-variable-expenses-list';
import { FrontEndFilterVariableExpenseslist } from './filter-list/front-end-filter-variable-expenses-list';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { VariableExpensesListService } from './services/variable-expenses-list.service';


@Component({
  selector: 'variable-expenses-list',
  templateUrl: './variable-expenses-list.component.html',
  styleUrls: ['./variable-expenses-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule,
    FlexLayoutModule,
    PtBrDatePipe,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    MonthsSelectComponent,
    FilterBtnRadioComponent
  ],
  providers: [
    PtBrDatePipe,
    AccountTypePipe,
    PtBrCurrencyPipe,
    VariableExpensesListService
  ]

})
export class VariableExpensesListComponent extends List implements OnInit {

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  workingFrontEnd = new FrontEndFilterVariableExpenseslist();
  workingBackEnd = new BackEndFilterVariableExpensesList();

  constructor(
    private _route: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _communicationsAlerts: CommunicationAlerts,
    override _actRoute: ActivatedRoute,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: VariableExpensesListService,

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['',
        'Dia',
        'Preço',
        'Despesa',
        'Local',
        'Categoria',
        'Subcategoria',
        ],

      [
        'paidDay',
        'price',
        'description',
        'place',
        'category',
        'subcategory',
        ],
      _breakpointObserver,
      _listServices
    )
  }

  override addUrlRoute: string = '/side-nav/financial-dash/variable-expenses-add';

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

  orderBy(field: string) {

    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else
      this.entities$ = this.workingFrontEnd.orderByFrontEnd(this.entities$, field)

  }


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

  getCurrentPagedInFrontEnd() {

    this.entities$ = this.workingFrontEnd.current(this.entities, 0, this.pageSize)
    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length)
      })).subscribe();

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


  getIdEntity($event: { entity: VariableExpensesListGridDto, id: number, action: string }) {
    // if ($event.action == 'visibility')
    //   this.view($event.id);

    // if ($event.action == 'edit')
    //   this.edit($event.id);

    // if ($event.action == 'delete')
    //   this.delete($event.entity);
  }

  viewDto: VariableExpensesListGridDto;
  getData() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged('VariableExpenses/GetAllVariableExpensesByCompanyId', this.companyId);
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: VariableExpensesDto[]) => {
      this.entities = [];
      x.forEach((xy: VariableExpensesDto) => {
        console.log(xy)
        this.makeViewDto(xy);
      })
      this.entities$ = of(this.entities)
    })

  }

  makeViewDto(xy: VariableExpensesDto) {
    console.log(xy)
    const paidDay: Date = new Date(xy.paidDay);

    this.viewDto = new VariableExpensesListGridDto;
    this.viewDto.id = xy.id;
    this.viewDto.description = xy.description;
    this.viewDto.category = xy.categoryExpenses.name;
    this.viewDto.subcategory = xy.subcategoryExpenses.name;
    this.viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    this.viewDto.paidDay = this._ptBrDatePipe.transform(xy.paidDay, 'Date');
    this.viewDto.place = xy.place;
    // this.viewDto.expiration = this._ptBrDatePipe.transform(xy.expiration, 'Date');
    // this.viewDto.numberInstallment = xy.numberInstallment;
    // this.viewDto.cyclePayment = this.cyclePayment(xy.cyclePayment);

    // this.viewDto.cards = xy.cards.length.toString();
    // this.viewDto.balance = this._ptBrCurrency.transform(xy.balance);
    // this.viewDto.type = this._accountTypePipe.transform(xy.type);
    this.entities.push(this.viewDto);
  }

  ngOnInit(): void {
    this.getData();
  }

}