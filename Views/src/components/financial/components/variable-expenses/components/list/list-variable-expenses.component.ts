
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


import { environment } from '../../../../../../environments/environment';

import { Subscription } from 'rxjs';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { MonthsDto } from '../../../../../../shared/components/months-select/months-dto';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { ImportsListVariableExpenses, ProvidersListVariableExpenses } from '../../components/list/imports/imports-list-variable-expenses';
import { ListControlVariableExpenses } from '../list/helpers/list-control-variable-expenses';
import { ListVariableExpensesDto } from './dto/list-variable-expenses-dto';
import { VariableExpensesListService } from './services/variable-expenses-list.service';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';

@Component({
  selector: 'list-variable-expenses',
  templateUrl: './list-variable-expenses.component.html',
  styleUrls: ['./list-variable-expenses.component.css'],
  standalone: true,
  imports: [
    ImportsListVariableExpenses,
    ListDefaultImports
  ],
  providers: [
    ProvidersListVariableExpenses,
    ListDefaultProviders
  ]

})
export class Listvariableexpensescomponent extends ListControlVariableExpenses implements OnInit {

  controllerUrl: string = environment._VARIABLE_EXPENSES.split('/')[4];

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _route: ActivatedRoute,
    private _actRoute: ActivatedRoute,
    private _listServices: VariableExpensesListService,

  ) {
    super(
          _router,
      _http,
      _dialog,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe,
    )
  }

  // override addUrlRoute: string = '/financial/add-variable-expenses';

  clearSearchField = false;
  filterClear() {
    this.clearSearchField = !this.clearSearchField;
    // this.getData();
    this.assembleMonth();
  }

  assembleMonth() {
    // this.monthFilter = new MonthsDto();
    // this.monthFilter.id = this.months[this.currentDate.getMonth()].id;
    // this.monthFilter.name = this.months[this.currentDate.getMonth()].name;
    // this.monthHideShowPendingRadio = this.monthFilter;
  }

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = new MonthsDto();
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;

    this.onSelectedMonth(this.entities, this.monthFilter.id, 'wasPaid').subscribe((x: ListVariableExpensesDto[]) =>console.log(x));

    this.entitiesFiltered$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'wasPaid');
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
  //   this.entities$ = this.current(this.entities, 0, this.pageSize, 'paidDay', true);
  //   this.entities$.pipe(
  //     map(x => {
  //       this.gridListCommonHelper.lengthPaginator.next(x.length);
  //     })
  //   ).subscribe()
  // }



  viewDto: ListVariableExpensesDto;
  // getData() {
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllVariableExpensesByCompanyId`, this.companyId);
  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: VariableExpenseDto[]) => {
  //     this.entities = [];
  //     x.forEach((xy: VariableExpenseDto) => {
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.getCurrentPagedInFrontEnd();
  //   })

  // }

  // makeGridItems(xy: VariableExpenseDto) {
    // this.viewDto = new ListVariableExpensesDto;
    // this.viewDto.id = xy.id;
    // this.viewDto.name = xy.name;
    // this.viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    // this.viewDto.paidDay = xy.wasPaid,
    //   this.viewDto.paidDayToView = this._ptBrDatePipe.transform(xy.wasPaid, 'Date');
    // this.viewDto.place = xy.place;
    // return this.viewDto;
  // }

  variableExpensesSubscribe: Subscription;
   ngOnDestroy(): void {
     this.variableExpensesSubscribe?.unsubscribe();
   }



   ngOnInit(): void {
     this.variableExpensesSubscribe = this.startSupply(`${this.controllerUrl}/GetAllVariableExpensesByCompanyId`, this.companyId.toString());
     // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
   }


}
