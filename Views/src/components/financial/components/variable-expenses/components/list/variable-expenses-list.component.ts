import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { List } from 'src/shared/components/inheritance/list/list';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { VariableExpenseDto } from '../../dto/variable-expense-dto';
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

  controllerUrl: string = environment._VARIABLE_EXPENSES.split('/')[4];
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
        // 'Local',
        // 'Categoria',
        // 'Subcategoria',
      ],

      [
        'paidDayToView',
        'price',
        'name',
        // 'place',
        // 'category',
        // 'subcategory',
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
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.workingBackEnd.selectedMonth();
    }
    else {
      if (this.monthFilter.id != -1) {
        this.entities$ = this.workingFrontEnd.selectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id);
        this.paginatorLength();
      }

      if (this.monthFilter.id == -1) {
        this.entities$ = this.workingFrontEnd.getAllLessThanOrEqualCurrentDate(this.entities, 0, this.pageSize);
        this.paginatorLength(true);
      }
    }
  }

  orderBy(field: string) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else {
      if (field.toLowerCase() == 'Dia'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'paidDay': new Date() });

      if (field.toLowerCase() == 'Preço'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

      if (field.toLowerCase() == 'Despesa'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'name': 'name' });

      if (field.toLowerCase() == 'Local'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'place': 'place' });
    }

  }

  
  queryFieldOutput($event: FormControl) {
    this.termSearched = $event.value

    // if (this.monthFilter.id == -1)
    //   this.entities$ = this.searchField(this.entities, this.termSearched)
    
    // if (this.monthFilter.id !== -1)
    // this.entities$ = this.searchField(this.entities, this.termSearched).pipe(
    //     map(x => x.filter(y => new Date(y.paidDay).getMonth() == this.monthFilter.id))
    //   )

  }

  get pedingRadioHide() {
    if (this.monthHideShowPendingRadio.id == -1)
      return false;

    return this.monthHideShowPendingRadio.id < this.currentDate.getMonth();
  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.workingFrontEnd.current(this.entities, 0, this.pageSize)
    this.paginatorLength();
  }

  paginatorLength(filtered?: boolean) {
    // if (!filtered)
    //   this.gridListCommonHelper.lengthPaginator.next(this.lengthPaginatorByCurrentYearAndSelectedMonth(this.entities, this.monthFilter.id, 'paidDay'))
    // else
    //   this.gridListCommonHelper.lengthPaginator.next(this.lengthPaginatorByCurrentYear(this.entities, 'paidDay'))

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
    console.log(xy)
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
