
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';
import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { FinancingsLoansExpensesDto } from '../../../dto/financings-loans-expenses-dto';
import { ListFinancingsLoansExpensesDto } from '../dto/list-financings-loans-expenses-dto';

export class ListControlFinancingsLoansExpenses extends BaseList {

  entities$: Observable<ListFinancingsLoansExpensesDto[]>;
  entities: ListFinancingsLoansExpensesDto[] = [];
  entitiesFiltered$: Observable<ListFinancingsLoansExpensesDto[]>;
  entitiesFiltered: ListFinancingsLoansExpensesDto[] = [];

  viewListUrlRoute: string = '/financial/list-financings-loans-expenses-installment';
  addUrlRoute: string = '/financial/add-financings-loans-expenses';

  length = 0;

  constructor(
    override _router: Router,
    public _http: HttpClient,
    protected _dialog: MatDialog,
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
      { key: 'Despesa', style: 'cursor: pointer;' },
      { key: 'Valor parcela', style: 'cursor: pointer;' },
      { key: 'Nº Parcelas', style: 'cursor: pointer;' },
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
      { key: 'name', style: '' },
      { key: 'installmentPriceView', style: '' },
      { key: 'installmentsQuantity', style: '' },
    ]
  }

  onSelectedMonth(entities: any[], selectedMonth: number, field: string) {

    let result;

    if (selectedMonth != -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear() && new Date(x[field].key).getMonth() == selectedMonth)

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x[field].key).getFullYear())

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize));
    }

    return result;
  }

  arrayOrderByDate(entities: any[], field: string): any[] {
    return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  }

  onClickOrderByFields(field: string, entities$: Observable<ListFinancingsLoansExpensesDto[]>) {

    switch (field) {
      case 'name':

        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<ListFinancingsLoansExpensesDto[]>;
        break;

      case 'installmentPriceView':
        this.entities$ = this.orderByFrontEnd(entities$, { key: 'installmentPrice', value: 0 }) as Observable<ListFinancingsLoansExpensesDto[]>;
        break;

      case 'installmentsQuantity':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) as Observable<ListFinancingsLoansExpensesDto[]>;
        break;
    }

  }

  onClickIcons(obj: OnClickInterface) {

    if (obj.action.split('|')[0] == 'edit')
      this.callRouter(`/customer/edit/${obj.entityId}`);

    if (obj.action.split('|')[0] == 'list')
      this.callRouter(`${this.viewListUrlRoute}/${obj.entityId}`);

    // if (obj.action.split('|')[0] == 'delete')
    //   this.deleteFake(obj.entityId);

  }

  supplyItemsGrid = (listFinancingsLoansExpenses: ListFinancingsLoansExpensesDto[], financingsLoansExpenses: FinancingsLoansExpensesDto) => {

    const items: ListFinancingsLoansExpensesDto = new ListFinancingsLoansExpensesDto();

    Object.assign(items, {

      id: {
        key: financingsLoansExpenses.id,
        display: 'icons',
        icons: ['list|margin-right:10px;', 'edit|'],
        styleInsideCell: `max-width:30px; color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:30px; display:flex; justify-content: center;',
      },

      name: {
        key: financingsLoansExpenses.name,
        styleCell: 'width:100%;',

      },
      installmentPrice: {
        key: financingsLoansExpenses.installmentPrice,
      },
      installmentPriceView: {
        key: this._ptBrCurrencyPipe.transform(financingsLoansExpenses.installmentPrice),
        styleCell: 'width:100%;',
      },
      installmentsQuantity: {
        key: financingsLoansExpenses.installmentsQuantity
      },
      userId: {
        key: financingsLoansExpenses.userId
      },
      companyId: {
        key: financingsLoansExpenses.companyId
      },
      categoryExpenseId: {
        key: financingsLoansExpenses.categoryExpenseId
      },
      subcategoryExpenseId: {
        key: financingsLoansExpenses.subcategoryExpenseId
      },
      start: {
        key: financingsLoansExpenses.start
      },
      end: {
        key: financingsLoansExpenses.end
      },
      totalPriceToBePaid: {
        key: financingsLoansExpenses.totalPriceToBePaid
      },
      totalPriceFinancingOrLoan: {
        key: financingsLoansExpenses.totalPriceFinancingOrLoan
      },
      totalPriceInterest: {
        key: financingsLoansExpenses.totalPriceInterest
      },
      totalPercentageInterest: {
        key: financingsLoansExpenses.totalPercentageInterest
      },
      wasPaid: {
        key: financingsLoansExpenses.wasPaid
      },
      wasPaidView: {
        key: financingsLoansExpenses.wasPaid
      },
      deleted: {
        key: financingsLoansExpenses.deleted
      },
      registered: {
        key: financingsLoansExpenses.registered
      },
      description: {
        key: financingsLoansExpenses.description
      },
      linkCopyBill: {
        key: financingsLoansExpenses.linkCopyBill
      },
      uSERLinkCopyBill: {
        key: financingsLoansExpenses.uSERLinkCopyBill
      },
      pASSLinkCopyBill: {
        key: financingsLoansExpenses.pASSLinkCopyBill
      }
    })

    listFinancingsLoansExpenses.push(items);

    return listFinancingsLoansExpenses;
  }

  startSupply(url: string, cardId: string): Subscription {

    let entities: ListFinancingsLoansExpensesDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, cardId).pipe(
      map((x: FinancingsLoansExpensesDto[]) => {

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
            (y: FinancingsLoansExpensesDto) => {
              this.entities = this.supplyItemsGrid(entities, y);
              this.entities$ = of(this.entities);
              this.entitiesFiltered$ = this.entities$
              this.length = x.length;
            })
        }
      })).subscribe();
  }

}

