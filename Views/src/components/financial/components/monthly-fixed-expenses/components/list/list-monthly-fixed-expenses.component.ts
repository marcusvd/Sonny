
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


import { environment } from 'src/environments/environment';
// import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';

import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../imports/components-default.imports';
import { ListMonthlyFixedExpensesImports, ListMonthlyFixedExpensesProviders } from '../../components/list/imports/list-monthly-fixed-expenses.imports';
import { MonthlyFixedExpenseDto } from '../../dto/monthly-fixed-expense-dto';
import { ListControlMonthlyFixedExpenses } from '../../components/list/helpers/list-control-monthly-fixed-expenses';
import { BackEndFilterMonthlyExpensesList } from './filter-list/back-end-filter-monthly-expenses-list';
import { FrontEndListFilterMonthlyExpenses } from './filter-list/front-end-list-filter-monthly-expenses';

import { TriggerPaymentMonthly } from './trigger-payment-monthly';
import { ListMonthlyFixedExpensesService } from './services/list-monthly-fixed-expenses.service';
import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';
import { ListMonthlyFixedExpenseDto } from './dto/list-monthly-fixed-expense-dto';


@Component({
  selector: 'list-monthly-fixed-expenses',
  templateUrl: './list-monthly-fixed-expenses.component.html',
  styleUrls: ['./list-monthly-fixed-expenses.component.css'],
  standalone: true,
  imports: [
    ListMonthlyFixedExpensesImports,
    ListDefaultImports
  ],
  providers: [
    ListMonthlyFixedExpensesProviders,
    ListDefaultProviders
  ]

})
export class ListMonthlyFixedExpensesComponent extends ListControlMonthlyFixedExpenses implements OnInit {

  controllerUrl: string = environment._MONTHLY_FIXED_EXPENSES.split('/')[4];
  // override backEndUrl: string = `${this.controllerUrl}/GetAllFixedExpensesByCompanyIdPagedAsync`;
  override  entities: ListMonthlyFixedExpenseDto[] = [];
  override entities$: Observable<ListMonthlyFixedExpenseDto[]>;
  // override viewUrlRoute: string = '/financial/view-monthly-fixed-expenses-tracking';
  override addUrlRoute: string = '/financial/monthly-fixed-expenses-add';

  workingBackEnd = new BackEndFilterMonthlyExpensesList();

  toPay: MonthlyFixedExpenseDto = null;
  listMonthlyFixedExpense: MonthlyFixedExpenseDto[] = [];

  constructor(
    override _router: Router,
       override _http: HttpClient,
       override _dialog: MatDialog,
       override _deleteServices: DeleteServices,
       override _ptBrDatePipe: PtBrDatePipe,
       override _ptBrCurrencyPipe: PtBrCurrencyPipe,
       private _actRoute: ActivatedRoute,
       private _listServices: ListMonthlyFixedExpensesService,
  ) {
    super(
      _http,
      _router,
      _dialog,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe,
    )
  }


    monthlyFixedExpenseSubscribe: Subscription;
    ngOnDestroy(): void {
      this.monthlyFixedExpenseSubscribe?.unsubscribe();
    }



    ngOnInit(): void {
      this.monthlyFixedExpenseSubscribe = this.startSupply(`${this.controllerUrl}/GetAllFixedExpensesByCompanyId`, this.companyId.toString());
      // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
    }



  getEntityTopay(entity: ListMonthlyFixedExpenseDto) {
    const monthlyExpense = this.listMonthlyFixedExpense.find(x => x.id.toString() == entity.id.key );

    this.pay.entityToPay = monthlyExpense;

    this.pay.callRoute(this.pay.entityToPay);
  }

  pay = new TriggerPaymentMonthly(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  clearSearchField = false;
  cleanRadios = false;
  filterClear() {
    this.onMonthSelectedclearFilters();
    // this.getCurrentPagedInFrontEnd();
    this.assembleMonth();
  }

  assembleMonth() {
    this.monthFilter = new MonthsDto();
    // this.monthFilter.id = this.months[this.currentDate.getMonth()].id;
    // this.monthFilter.name = this.months[this.currentDate.getMonth()].name;
    this.monthHideShowPendingRadio = this.monthFilter;
  }

  onMonthSelectedclearFilters() {
    this.clearSearchField = !this.clearSearchField;
    this.cleanRadios = !this.cleanRadios;
  }

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    // this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id);
  }

  filterView(checkbox: MatCheckboxChange) {
    // if (checkbox.source.value == 'expired')
    //   this.isExpires(this.monthFilter.id, 0, this.pageSize);

    // if (checkbox.source.value == 'pending')
    //   this.isPending(this.monthFilter.id, 0, this.pageSize);

    // if (checkbox.source.value == 'paid')
    //   this.isPaid(this.monthFilter.id, 0, this.pageSize);
  }

  queryFieldOutput($event: FormControl) {
    // this.entities$ = this.query($event, this.monthFilter.id);
  }

  get pedingRadioHide() {
    if (this.monthHideShowPendingRadio.id == -1)
      return false;

    return this.monthHideShowPendingRadio.id < this.currentDate.getMonth();
  }

  // getCurrentPagedInFrontEnd() {
  //   this.getCurrentByCurrentYearAndEqualAndLessThenSelectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id)
  // }

  // getCurrentEntitiesFromBackEnd() {
  //   const comapanyId: number = this.companyId;
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFixedExpensesByCompanyId`, comapanyId.toString());

  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: MonthlyFixedExpenseDto[]) => {

  //     x.forEach((xy: MonthlyFixedExpenseDto) => {
  //       this.listMonthlyFixedExpense.push(xy)
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.getCurrentPagedInFrontEnd();
  //   })
  // }




}
