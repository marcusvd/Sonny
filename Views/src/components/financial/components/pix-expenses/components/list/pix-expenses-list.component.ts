import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { PixExpenseDto } from '../../dto/pix-expense-dto';
import { PixExpenseListGridDto } from './dto/pix-expense-list-grid-dto';
import { BackEndFilterPixExpensesList } from './filter-list/back-end-filter-pix-expenses-list';
import { FrontEndFilterPixExpenseslist } from './filter-list/front-end-filter-pix-expenses-list';
import { PixExpensesListService } from './services/pix-expenses-list.service';


@Component({
  selector: 'pix-expenses-list',
  templateUrl: './pix-expenses-list.component.html',
  styleUrls: ['./pix-expenses-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule,
    // PtBrDatePipe,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    MonthsSelectComponent,
    // FilterBtnRadioComponent
  ],
  providers: [
    PtBrDatePipe,
    PtBrCurrencyPipe,
    PixExpensesListService
  ]

})
export class PixExpensesListComponent extends FrontEndFilterPixExpenseslist implements OnInit {

  controllerUrl: string = environment._FN_PIXES_EXPENSES.split('/')[4];
  workingBackEnd = new BackEndFilterPixExpensesList();

  constructor(
    private _route: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _actRoute: ActivatedRoute,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: PixExpensesListService,

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['','Dia','Preço','Pix Saída','Beneficiado',],['expenseDay','price','pixOutId','benefitedName'],
      _breakpointObserver,
      _listServices
    )
  }

  override addUrlRoute: string = '/side-nav/financial-dash/add-pix-expenses';

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
    this.getCurrentPagedInFrontEnd();
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
    this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id,'expenseDayToFilter');
  }

  queryFieldOutput($event: FormControl) {
    this.entities$ = this.query($event, this.monthFilter.id);
  }

  getCurrentPagedInFrontEnd() {

    this.entities$ = this.current(this.entities, 0, this.pageSize, 'expenseDayToFilter', true)
    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length)
      })).subscribe();
  }

  getIdEntity($event: { entity: PixExpenseListGridDto, id: number, action: string }) {
    // if ($event.action == 'visibility')
    //   this.view($event.id);

    // if ($event.action == 'edit')
    //   this.edit($event.id);

    // if ($event.action == 'delete')
    //   this.delete($event.entity);
  }

  viewDto: PixExpenseListGridDto;
  getData() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllPixesExpensesByCompanyId`, this.companyId);
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: PixExpenseDto[]) => {
      this.entities = [];
      x.forEach((xy: PixExpenseDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
      // this.entities$ = of(this.entities)
    })

  }

  makeGridItems(xy: PixExpenseDto) {
    this.viewDto = new PixExpenseListGridDto;
    this.viewDto.id = xy.id;
    this.viewDto.expenseDay = this._ptBrDatePipe.transform(xy.expenseDay, 'Date');
    this.viewDto.expenseDayToFilter = xy.expenseDay;
    this.viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    this.viewDto.pixOutId = xy.pixOut.value;
    this.viewDto.benefitedName = xy.benefitedName;
    return this.viewDto;
  }

  ngOnInit(): void {
    this.getData();
  }

}
