
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { environment } from '../../../../../../environments/environment';
import { MonthsDto } from '../../../../../../shared/components/months-select/months-dto';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { ListPixExpensesImports, ListPixExpensesProviders } from '../../../pix-expenses/components/list/imports/list-pix-expenses.imports';
import { Subscription } from 'rxjs';
import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';
import { ListControlPixExpenses } from '../../components/list/helpers/list-control-pix-expenses';
import { BackEndFilterPixExpensesList } from './filter-list/back-end-filter-pix-expenses-list';
import { ListPixExpensesService } from './services/list-pix-expenses.service';
import { ListPixExpenseDto } from './dto/list-pix-expense-dto';


@Component({
  selector: 'pix-expenses-list',
  templateUrl: './pix-expenses-list.component.html',
  styleUrls: ['./pix-expenses-list.component.css'],
  standalone: true,
  imports: [
    ListDefaultImports,
    ListPixExpensesImports
  ],
  providers: [
    ListDefaultProviders,
    ListPixExpensesProviders
  ]

})
export class PixExpensesListComponent extends ListControlPixExpenses implements OnInit {

  pixExpenseSubscribe: Subscription;
  controllerUrl: string = environment._FN_PIXES_EXPENSES.split('/')[4];
  workingBackEnd = new BackEndFilterPixExpensesList();
  addUrlRoute: string = '/financial/add-pix-expenses';

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _actRoute: ActivatedRoute,
    private _listServices: ListPixExpensesService,

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
      this.pixExpenseSubscribe?.unsubscribe();
    }



    ngOnInit(): void {
      this.pixExpenseSubscribe = this.startSupply(`${this.controllerUrl}/GetAllPixesExpensesByCompanyId`, this.companyId.toString());
      // this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
    }

  clearSearchField = false;
  filterClear() {
    this.clearSearchField = !this.clearSearchField;
    this.getCurrentPagedInFrontEnd();
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
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expenseDayToFilter');
  }

  queryFieldOutput($event: FormControl) {
    // this.entities$ = this.query($event, this.monthFilter.id);
  }

  getCurrentPagedInFrontEnd() {

    // this.entities$ = this.current(this.entities, 0, this.pageSize, 'expenseDayToFilter', true)
    // this.entities$.pipe(
    //   map(x => {
    //     this.gridListCommonHelper.lengthPaginator.next(x.length)
    //   })).subscribe();
  }

  getIdEntity($event: { entity: ListPixExpenseDto, id: number, action: string }) {
    // if ($event.action == 'visibility')
    //   this.view($event.id);

    // if ($event.action == 'edit')
    //   this.edit($event.id);

    // if ($event.action == 'delete')
    //   this.delete($event.entity);
  }

  viewDto: ListPixExpenseDto;
  // getData() {
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllPixesExpensesByCompanyId`, this.companyId);
  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: PixExpenseDto[]) => {
  //     this.entities = [];
  //     x.forEach((xy: PixExpenseDto) => {
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.getCurrentPagedInFrontEnd();
  //     // this.entities$ = of(this.entities)
  //   })

  // }

  // makeGridItems(xy: PixExpenseDto) {
  //   this.viewDto = new ListPixExpenseDto;
  //   this.viewDto.id = xy.id;
  //   this.viewDto.expenseDay = this._ptBrDatePipe.transform(xy.expenseDay, 'Date');
  //   this.viewDto.expenseDayToFilter = xy.expenseDay;
  //   this.viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
  //   this.viewDto.pixOutId = xy.pixOut.value;
  //   this.viewDto.benefitedName = xy.benefitedName;
  //   return this.viewDto;
  // }

}
