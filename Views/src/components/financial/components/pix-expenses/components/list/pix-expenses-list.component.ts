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
    PtBrCurrencyPipe,
    PixExpensesListService
  ]

})
export class PixExpensesListComponent extends List implements OnInit {

  // @ViewChild('radioExpired') radioExpired: MatRadioButton;
  // @ViewChild('radioPedding') radioPedding: MatRadioButton;
  // @ViewChild('radioPaid') radioPaid: MatRadioButton;

  controllerUrl: string = environment._FN_PIXES_EXPENSES.split('/')[4];
  workingFrontEnd = new FrontEndFilterPixExpenseslist();
  workingBackEnd = new BackEndFilterPixExpensesList();

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
    override _listServices: PixExpensesListService,

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['',
        'Dia',
        'Preço',
        'Pix Saída',
        'Beneficiado',
      ],

      [
        'expenseDay',
        'price',
        'pixOutId',
        'benefitedName',
      ],
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

  // clearRadios() {
  //   if (this.radioExpired && this.radioPedding && this.radioPaid) {
  //     this.radioExpired.checked = false;
  //     this.radioPedding.checked = false;
  //     this.radioPaid.checked = false;
  //   }
  // }


  filterClear() {
    // this.clearRadios();
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
    // this.clearRadios();
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.workingBackEnd.selectedMonth();
    }
    else {
      if (this.monthFilter.id != -1) {

       // this.entities$ = this.onSelectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id, 'expenseDayToFilter');

        this.entities$.pipe(
          map(x => {
            console.log(x)
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }
     // else
        //this.entities$ = this.getByCurrentYear(this.entities, 0, this.pageSize, 'expenseDayToFilter');

    }
  }
  orderBy(field: string) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else {
      if (field.toLowerCase() == 'Dia'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayToFilter': new Date() });

      if (field.toLowerCase() == 'Preço'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

      if (field.toLowerCase() == '	Pix Saída'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'pixOutId': 0 });

      if (field.toLowerCase() == 'Beneficiado'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'benefitedName': 'benefitedName' });
    }

  }

  
  queryFieldOutput($event: FormControl) {
    this.termSearched = $event.value

  //   if (this.monthFilter.id != -1)
  //    this.entities$ = this.searchField(this.entities, this.termSearched).pipe(
  //       map(x => x.filter(y => new Date(y.expenseDayToFilter).getMonth() == this.monthFilter.id))
  //     )

  //   else
  //  this.entities$ = this.searchField(this.entities, this.termSearched).pipe(
  //     map(x => x.filter(y => new Date(y.expenseDayToFilter).getFullYear() == this.currentDate.getFullYear()))
  //   )



    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length)
      })).subscribe();
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