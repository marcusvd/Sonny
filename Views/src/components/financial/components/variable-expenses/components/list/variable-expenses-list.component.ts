import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { VariableExpenseDto } from '../../dto/variable-expense-dto';
import { VariableExpensesListGridDto } from './dto/variable-expenses-list-grid-dto';
import { FrontEndFilterVariableExpenseslist } from './filter-list/front-end-filter-variable-expenses-list';
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
    PtBrCurrencyPipe,
    VariableExpensesListService
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
        'Despesa'
      ],

      [
        'paidDayToView',
        'price',
        'name'
      ],
      _breakpointObserver,
      _listServices
    )
  }

  override addUrlRoute: string = '/side-nav/financial-dash/add-variable-expenses';

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
      map(x=> {
        this.gridListCommonHelper.lengthPaginator.next(x.length);
      })
    ).subscribe()
  }



  viewDto: VariableExpensesListGridDto;
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
    this.viewDto = new VariableExpensesListGridDto;
    this.viewDto.id = xy.id;
    this.viewDto.name = xy.name;
    this.viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    this.viewDto.paidDay = xy.wasPaid,
    this.viewDto.paidDayToView = this._ptBrDatePipe.transform(xy.wasPaid, 'Date');
    this.viewDto.place = xy.place;
    return this.viewDto;
  }

  ngOnInit(): void {
    this.getData();
  }

}
