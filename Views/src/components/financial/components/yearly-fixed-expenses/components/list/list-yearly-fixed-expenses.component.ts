
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { environment } from 'src/environments/environment';

import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { YearlyFixedExpenseDto } from '../../dto/yearly-fixed-expense-dto';
import { ListYearlyFixedExpensesImports, ListYearlyFixedExpensesProviders } from '../imports/list-yearly-fixed-expenses.imports';
import { ListYearlyFixedExpenseDto } from './dto/list-yearly-fixed-expense-dto';
import { ListControlYearlyFixedExpenses } from './helpers/list-control-yearly-fixed-expenses';
import { ListYearlyFixedExpensesService } from './services/list-yearly-fixed-expenses.service';
import { TriggerPaymentYearly } from './trigger-payment-yearly';

@Component({
  selector: 'list-yearly-fixed-expenses',
  templateUrl: './list-yearly-fixed-expenses.component.html',
  styleUrls: ['./list-yearly-fixed-expenses.component.css'],
  standalone: true,
  imports: [
    ListDefaultImports,
    ListYearlyFixedExpensesImports
  ],
  providers: [
    ListYearlyFixedExpensesProviders,
    ListDefaultProviders
  ]

})
export class ListYearlyFixedExpensesComponent extends ListControlYearlyFixedExpenses implements OnInit {

  YearlyFixedExpensesSubscribe: Subscription;
  controllerUrl: string = environment._YEARLY_FIXED_EXPENSES.split('/')[4];
  addUrlRoute: string = '/financial/yearly-fixed-expenses-add';
  backEndUrl: string = `${this.controllerUrl}/GetAllYearlyFixedExpensesByCompanyId`;

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _listServices: ListYearlyFixedExpensesService

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

  ngOnDestroy(): void {
    this.YearlyFixedExpensesSubscribe?.unsubscribe();
  }



  ngOnInit(): void {
    this.YearlyFixedExpensesSubscribe = this.startSupply(this.backEndUrl, this.companyId.toString());
    // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
  }

  // override  entities: ListYearlyFixedExpenseDto[] = [];
  // override entities$: Observable<ListYearlyFixedExpenseDto[]>;
  // override viewUrlRoute: string = '/financial/view-yearly-fixed-expenses-tracking';

  // workingFrontEnd = new FrontEndListFilterYearlyExpenses();
  // workingBackEnd = new BackEndListFilterYearlyExpenses();

  pay = new TriggerPaymentYearly(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  listYearlyFixedExpense: YearlyFixedExpenseDto[] = [];
  getEntityTopay(entity: ListYearlyFixedExpenseDto) {
    // const yearlyExpense = this.listYearlyFixedExpense.find(x => x.id == entity.id);

    // this.pay.entityToPay = yearlyExpense;

    // this.pay.callRoute(this.pay.entityToPay);
  }

  clearSearchField = false;
  cleanRadios = false;
  filterClear() {
    this.clearSearchField = !this.clearSearchField;
    this.cleanRadios = !this.cleanRadios;
    // this.filterCheckBoxSelected = null;
    // this.getCurrentPagedInFrontEnd();
  }

  queryFieldOutput($event: FormControl) {
    // this.entities$ = this.query($event);
  }

  // getCurrentEntitiesFromBackEndPaged() {
  //   this.backEndUrl = `${this.controllerUrl}/GetAllYearlyFixedExpensesByCompanyId`;
  //   this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
  //   this.gridListCommonHelper.entities$.subscribe((x: YearlyFixedExpenseDto[]) => {
  //     x.forEach((xy: YearlyFixedExpenseDto) => {
  //       this.listYearlyFixedExpense.push(xy);
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.entities$ = of(this.entities)
  //   })
  // }

  // getCurrentPagedInFrontEnd() {

  //   this.entities$ = of(this.entities)
  //   this.entities$.pipe(
  //     map(x => {
  //       this.gridListCommonHelper.lengthPaginator.next(x.length)
  //     })).subscribe();

  // }

  // getCurrentEntitiesFromBackEnd() {
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllYearlyFixedExpensesByCompanyId`, this.companyId.toString());

  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: YearlyFixedExpenseDto[]) => {

  //     x.forEach((xy: YearlyFixedExpenseDto) => {
  //       this.listYearlyFixedExpense.push(xy);
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.getCurrentPagedInFrontEnd();
  //   })
  // }

  // makeGridItems(xy: YearlyFixedExpenseDto) {
  //   const viewDto = new ListYearlyFixedExpenseDto;
  //   const wasPaid: Date = new Date(xy.wasPaid)
  //   viewDto.id = xy.id
  //   viewDto.start = this._ptBrDatePipe.transform(xy.start, 'Date');
  //   viewDto.expires = xy.expires;
  //   viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
  //   viewDto.description = xy.name;
  //   viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
  //   viewDto.wasPaid = xy.wasPaid;

  //   if (wasPaid.getFullYear() == this.minValue.getFullYear())
  //     viewDto.wasPaidView = 'Não efetuado'
  //   else
  //     viewDto.wasPaidView = this._ptBrDatePipe.transform(xy.wasPaid, 'Date');

  //   return viewDto;
  // }

  // ngOnInit(): void {

  //   // this.getCurrentEntitiesFromBackEnd();
  // }

}
