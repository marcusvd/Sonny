
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';

import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ImportsListVariableExpenses, ProvidersListVariableExpenses } from '../../components/list/imports/imports-list-variable-expenses';
import { VariableExpenseDto } from '../../dto/variable-expense-dto';
import { ListVariableExpensesDto } from './dto/list-variable-expenses-dto';
import { FrontEndFilterVariableExpenseslist } from './filter-list/front-end-filter-variable-expenses-list';
import { VariableExpensesListService } from './services/variable-expenses-list.service';


@Component({
  selector: 'variable-expenses-list',
  templateUrl: './variable-expenses-list.component.html',
  styleUrls: ['./variable-expenses-list.component.css'],
  standalone: true,
  imports: [
    ImportsListVariableExpenses
  ],
  providers: [
    ProvidersListVariableExpenses
  ]

})
export class VariableExpensesListComponent extends FrontEndFilterVariableExpenseslist implements OnInit {

  controllerUrl: string = environment._VARIABLE_EXPENSES.split('/')[4];

  constructor(
    private _route: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _actRoute: ActivatedRoute,

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
        'Despesa'
      ],

      [
        'paidDayToView',
        'price',
        'name'
      ],

      _listServices
    )
  }

  override addUrlRoute: string = '/side-nav/financial/add-variable-expenses';

  clearSearchField = false;
  filterClear() {
    this.clearSearchField = !this.clearSearchField;
    this.getData();
    this.assembleMonth();
  }

  assembleMonth() {
    this.monthFilter = new MonthsDto();
    this.monthFilter.id = this.months[this.currentDate.getMonth()].id;
    this.monthFilter.name = this.months[this.currentDate.getMonth()].name;
    this.monthHideShowPendingRadio = this.monthFilter;
  }

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id);
  }

  queryFieldOutput($event: FormControl) {
    this.entities$ = this.query($event, this.monthFilter.id);
  }

  get pedingRadioHide() {
    if (this.monthHideShowPendingRadio.id == -1)
      return false;

    return this.monthHideShowPendingRadio.id < this.currentDate.getMonth();
  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.current(this.entities, 0, this.pageSize, 'paidDay', true);
    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length);
      })
    ).subscribe()
  }



  viewDto: ListVariableExpensesDto;
  getData() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllVariableExpensesByCompanyId`, this.companyId);
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: VariableExpenseDto[]) => {
      this.entities = [];
      x.forEach((xy: VariableExpenseDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })

  }

  makeGridItems(xy: VariableExpenseDto) {
    // this.viewDto = new ListVariableExpensesDto;
    // this.viewDto.id = xy.id;
    // this.viewDto.name = xy.name;
    // this.viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    // this.viewDto.paidDay = xy.wasPaid,
    //   this.viewDto.paidDayToView = this._ptBrDatePipe.transform(xy.wasPaid, 'Date');
    // this.viewDto.place = xy.place;
    // return this.viewDto;
  }

  ngOnInit(): void {
    this.getData();
  }

}
