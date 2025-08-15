
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';

import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ex_month, MonthsDto } from 'src/shared/components/months-select/months-dto';
import { ItemsViewInterface } from 'src/shared/components/view-default/interfaces/items-view.interface';
import { ex_search } from 'src/shared/helpers/search-field/search-field';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { CashWithdrawnExpenseDto } from '../../../dto/cash-withdrawn-expenses-dto';
import { ListCashWithdrawnExpensesDto } from '../../../dto/list-cash-withdrawn-expenses-dto';

export class ListControlCashWithdrawnExpenses extends BaseList {

  entities$: Observable<ListCashWithdrawnExpensesDto[]>;
  entities: ListCashWithdrawnExpensesDto[] = [];
  entitiesFiltered$: Observable<ListCashWithdrawnExpensesDto[]>;
  entitiesFiltered: ListCashWithdrawnExpensesDto[] = [];
  monthFilter = new MonthsDto();

  controllerUrl: string = environment.__FN_CASH_WITHDRAWN_EXPENSES.split('/')[4];
  itemsToView: ItemsViewInterface[] = [];
  formControlSearch = new FormControl('');
  searchw = ex_search

  editUrlRoute: string = '/financial/edit-cash-withdrawn-expenses';
  addUrlRoute: string = '/financial/add-financings-loans-expenses';
  containerCls = '!w-full !grid !grid-cols-[10px_100px_auto] !items-center'
  containerMainCls = '!flex !items-center'

  length = 0;
  showHideFilter = false;

  clearSearchField = false;

  showHideDetails = false;
  term: string;

  constructor(
    override _router: Router,
    public _http: HttpClient,
    protected _dialog: MatDialog,
    // protected _listCreditCardInvoicesService: ListCreditCardInvoicesService,
    protected _deleteServices: DeleteServices,
    protected _ptBrDatePipe: PtBrDatePipe,
    protected _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
    super(
      new ListGDataService(_http),
      _router,
    )
  }
  labelHeaders = () => {
    return [
      { key: '', style: 'cursor: pointer; max-width:100px;' },
      { key: 'Dia', style: 'cursor: pointer;' },
      { key: 'Banco', style: 'cursor: pointer;' },
      { key: 'Preço', style: 'cursor: pointer;' },
      { key: 'Despesa', style: 'cursor: pointer;' },
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
      { key: 'withdrawnOnToView', style: '' },
      { key: 'institution', style: '' },
      { key: 'priceView', style: '' },
      { key: 'name', style: '' },
    ]
  }

  selectedMonth(month: MonthsDto) {
    this.monthFilter = new MonthsDto();
    this.monthFilter = month;
    this.entitiesFiltered$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'withdrawnOn');
    this.dynamicDetails();
  }

  onSelectedMonth(entities: any[], selectedMonth: number, field: string) {
    let result;

    if (selectedMonth != -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear() && new Date(x[field].key).getMonth() == selectedMonth)


      const ordered = this.arrayOrderByDate(result, field)

      result = ordered

      // result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x[field].key).getFullYear())

      // this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, field)
      result = ordered
      // result = of(ordered.slice(0, this.pageSize));
    }
    return of(result);


  }

  queryFieldOutput(field: string) {

    if (field)
      this.selectedMonth(ex_month(12))


    this.entitiesFiltered$ = of(this.searchListEntities(this.entities, field))
    console.log(field)
  }


  showHideFilterMtd() {
    this.showHideFilter = !this.showHideFilter;

    if (!this.showHideFilter)
      this.filterClear();
  }

  showHideDetailsMtd() {
    this.showHideDetails = !this.showHideDetails;
    this.onSelectedMonth(this.entities, this.monthFilter.id, 'withdrawnOn');
    this.dynamicDetails();

  }


  dynamicDetails() {

    this.entitiesFiltered$.pipe(map(x => {

      this.containerMainCls = '!grid grid-cols-[200px_50px] !items-center'

      this.itemsToView[1] = ({ key: this.monthFilter.id == -1 ? `Ano: ${this.currentDate.getFullYear()}` : 'Mês:', value: this.months[(this.monthFilter.id == -1 ? 12 : this.monthFilter.id) ?? this.currentDate.getMonth()].name, classValue: 'font-bold', containerClass: '!w-full !grid !grid-cols-[10px_50px_auto] !items-center' });
      this.itemsToView[0] = ({ key: 'Saques:', value: this._ptBrCurrencyPipe.transform(x.reduce((x, y) => x + y.price.keyN, 0)), classValue: 'text-red-700 font-bold', containerClass: '!w-full !grid !grid-cols-[10px_100px_auto] !items-center' });

    })).subscribe();

  }


  filterClear() {
    this.clearSearchField = !this.clearSearchField;
  }


  arrayOrderByDate(entities: any[], field: string): any[] {
    return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  }

  onClickOrderByFields(field: string, entities$: Observable<ListCashWithdrawnExpensesDto[]>) {

    switch (field) {
      case 'withdrawnOnToView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'withdrawnOn', value: new Date() }) as Observable<ListCashWithdrawnExpensesDto[]>;
        break;

      case 'priceView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'price', value: 0 }) as Observable<ListCashWithdrawnExpensesDto[]>;
        break;

      case 'name':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'name', value: '' }) as Observable<ListCashWithdrawnExpensesDto[]>;
        break;

      case 'institution':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'institution', value: '' }) as Observable<ListCashWithdrawnExpensesDto[]>;
        break;
    }

  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {

    if (obj.action.split('|')[0] == 'edit')
      this.callRouter(`${this.editUrlRoute}/${obj.entityId}`);

    if (obj.action.split('|')[0] == 'delete')
      this.deleteFake(obj.entityId);

  }

  deleteFake = (id: number) => {
    //   const entity = this.entities.find(x => x.id.key == id.toString());

    //   const result = this._deleteServices.delete(parseInt(entity.id.key), entity.name.key)
    //  // const result = this._deleteServices.delete(this.entities.find(x => x.id.key == id.toString()))

    //   result.subscribe(result => {
    //     if (result.id != null) {
    //       this._listCreditCardInvoicesService.deleteFakeDisable(result.id.key);

    //       this.entitiesFiltered$ = this.entitiesFiltered$.pipe(
    //         map(x => x.filter(y => y.id.key != result.id.key.toString()))
    //       )
    //     }

    //   })
  }

  supplyItemsGrid = (listCashWithdrawnExpenses: ListCashWithdrawnExpensesDto[], cashWithdrawnExpense: CashWithdrawnExpenseDto) => {

    const items: ListCashWithdrawnExpensesDto = new ListCashWithdrawnExpensesDto();
    Object.assign(items, {

      id: {
        key: cashWithdrawnExpense.id,
        display: 'icons',
        icons: ['edit|'],
        styleInsideCell: `max-width:30px; color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:30px; display:flex; justify-content: center;',
      },

      withdrawnOnToView: {
        key: this._ptBrDatePipe.transform(cashWithdrawnExpense.withdrawnOn, 'Date'),
        styleCell: 'width:100%;',
      },

      withdrawnOn: {
        key: cashWithdrawnExpense.withdrawnOn,
        styleCell: 'width:100%;',
      },


      priceView: {
        key: this._ptBrCurrencyPipe.transform(cashWithdrawnExpense.price),
      },
      institution: {
        key: cashWithdrawnExpense.bankAccount.institution,
      },

      price: {
        keyN: cashWithdrawnExpense.price,
      },

      name: {
        key: cashWithdrawnExpense.name
      },


    })

    listCashWithdrawnExpenses.push(items);

    return listCashWithdrawnExpenses;
  }

  startSupply(url: string, param: string): Subscription {


    let entities: ListCashWithdrawnExpensesDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, param).pipe(
      map((x: CashWithdrawnExpenseDto[]) => {


        if (x.length <= 0) {
          entities = [];
          this.entities = [];
          this.entities$ = of([]);
          this.entitiesFiltered$ = of([]);
          this.length = 0;
        }

        entities = [];
        this.entities = [];
        this.entities$ = of([]);

        if (x?.length != 0) {
          x.forEach(
            (y: CashWithdrawnExpenseDto) => {

              this.entities = this.supplyItemsGrid(entities, y);

              this.entities$ = of(this.entities);
              this.entitiesFiltered$ = this.entities$
              this.entitiesFiltered$ = this.onSelectedMonth(this.entities, this.currentDate.getMonth(), 'withdrawnOn')

              // this.length = x.length;
            })
        }
      })).subscribe();



  }

  current(entities: any[], currentPage: number, pageSize: number, field: string, withPagination: boolean) {
    // let result: any[] = null;

    // entities.filter(x => console.log(new Date(x[field].key).getFullYear()))
    // console.log(this.currentDate.getFullYear())

    return of(entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear()
      && new Date(x[field].key).getMonth() == (this.currentDate.getMonth())));

    // if (withPagination) {
    //   result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear()
    //     && new Date(x[field].key).getMonth() == (this.currentDate.getMonth() + 1))
    //   return of(result);
    // }
    // else {
    //   result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear()
    //     && new Date(x[field].key).getMonth() == (this.currentDate.getMonth() + 1))
    //     .slice(currentPage, pageSize)
    // }
    // return of(result)
  }

  // getCurrent = () => {
  //   this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));
  // }

}

