
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';

import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';
import { ListCreditCardInvoiceDto } from '../../../../credit-card-fixed-expenses/dto/list-credit-card-invoice-dto';

import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { FinancialSubtitleDto } from 'src/components/financial/components/common-components/subtitle/financial-subtitle-dto';
import { ex_month } from 'src/shared/components/months-select/months-dto';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { CreditCardExpenseDto } from '../../../dto/credit-card-expense-dto';
import { ListCreditCardExpensesDto } from '../dto/list-credit-card-expenses-dto';



export class ListControlCreditCardExpenses extends BaseList {

  entities$: Observable<ListCreditCardExpensesDto[]>;
  entities: ListCreditCardExpensesDto[] = [];
  entitiesFiltered$: Observable<ListCreditCardExpensesDto[]>;
  entitiesFiltered: ListCreditCardInvoiceDto[] = [];
  length = 0;
  showHideFilter = false;
  expensesMonth: string = null;
  term: string;


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
      { key: 'Local Despesa', style: 'cursor: pointer;' },
      { key: 'Dia da despesa', style: 'cursor: pointer;' },
      { key: 'Preço', style: 'cursor: pointer;' },
      { key: 'Parcela', style: 'cursor: pointer;' }
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
      { key: 'name', style: '' },
      { key: 'expenseDayView', style: '' },
      { key: 'installmentPriceView', style: '' },
      { key: 'currentInstallment', style: '' }
    ]
  }
  
  onSelectedMonth(entities: any[], selectedMonth: number, field: string) {
    let result;
    entities.forEach(x => console.log(x));


    if (selectedMonth != -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear() && new Date(x[field].key).getMonth() == selectedMonth)

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear())

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize));
    }
    return result;
  }

  arrayOrderByDate(entities: any[], field: string): any[] {
    return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  }

  onClickOrderByFields(field: string, entities$: Observable<ListCreditCardExpensesDto[]>) {


    switch (field) {
      case 'name':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<ListCreditCardExpensesDto[]>;
        break;
        
        case 'expenseDayView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'expenseDay', value: new Date() }) as Observable<ListCreditCardExpensesDto[]>;
        break;
        
        case 'installmentPriceView':
          this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'installmentPrice', value: 0 }) as Observable<ListCreditCardExpensesDto[]>;
          break;
          
          case 'currentInstallment':
          this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'expenseDay', value: new Date() }) as Observable<ListCreditCardExpensesDto[]>;
          break;
        }
        
  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {

    if (obj.action.split('|')[0] == 'list') {
      this.callRouter(`/financial/list-credit-card-expenses/${obj.entityId}`);
      console.log(obj.entityId)
    }

  }

  statusCollection: FinancialSubtitleDto[] = [
    { id: 1, name: 'A pagar', icon: 'close', classesStyleIcon: "!text-[100px] !text-expired !w-[100px] !h-[100px] border border-expired", monthColorNameStyleClasses: "!text-expired", visible: false },
    { id: 3, name: 'Pago', icon: 'check', classesStyleIcon: "!text-[100px] !text-paid !w-[100px] !h-[100px] border border-paid", monthColorNameStyleClasses: "!text-paid", visible: false }
  ]

  paymentStatus(creditCardExpense: CreditCardExpenseDto, listCreditCardExpenses: ListCreditCardExpensesDto[]) {
    const expire = new Date(creditCardExpense.expires).getMonth();
    //PAID
    this.isPaid(listCreditCardExpenses, expire, 0, this.pageSize).subscribe(
      x => {
        if (x.length) {

          this.statusCollection.find(x => x.id == 3).visible = true;
        }
      }
    )
    //EXPIRED
    this.isExpires(listCreditCardExpenses, expire, 0, this.pageSize).subscribe(
      x => {
        if (x.length) {
          this.statusCollection.find(x => x.id == 1).visible = true;
        }
      }
    )

  }

  supplyItemsGrid = (ListCreditCardExpense: ListCreditCardExpensesDto[], creditCardexpense: CreditCardExpenseDto) => {

    const items: ListCreditCardExpensesDto = new ListCreditCardExpensesDto();

    Object.assign(items, {

      id: {
        key: creditCardexpense.id,
        display: 'icons',
        icons: ['edit|'],
        styleInsideCell: `max-width:10px; color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:10px; display:flex; justify-content: center;',
      },

      name: {
        key: creditCardexpense.name,
        styleCell: 'width:100%;',

      },

      expenseDayView: {
        key: this._ptBrDatePipe.transform(creditCardexpense.expenseDay, 'Date'),
        styleCell: 'width:100%;',
      },
      expenseDay: {
        key: creditCardexpense.expenseDay,
      },

      installmentPriceView: {
        key: this._ptBrCurrencyPipe.transform(creditCardexpense.installmentPrice),
      },

      installmentPrice: {
        keyN: +creditCardexpense.installmentPrice,
        styleCell: 'width:100%;',
      },

      currentInstallment: {
        key: creditCardexpense.currentInstallment
      },


      categoryExpenseId: { key: creditCardexpense.categoryExpenseId },
      subcategoryExpenseId: { key: creditCardexpense.subcategoryExpenseId },
      cardId: { key: creditCardexpense.cardId },
      price: { key: creditCardexpense.price },
      interest: { key: creditCardexpense.interest },
      expires: { key: creditCardexpense.expires },
      wasPaid: { key: creditCardexpense.wasPaid },
      othersPaymentMethods: { key: creditCardexpense.othersPaymentMethods },
      document: { key: creditCardexpense.document },
      description: { key: creditCardexpense.description },
      installmentsQuantity: { key: creditCardexpense.installmentsQuantity },
      totalPriceInterest: { key: creditCardexpense.totalPriceInterest },
      totalPercentageInterest: { key: creditCardexpense.totalPercentageInterest },
      paymentAtSight: { key: creditCardexpense.paymentAtSight },
      creditCardExpenseInvoiceId: { key: creditCardexpense.creditCardExpenseInvoiceId },
    })

    ListCreditCardExpense.push(items);

    return ListCreditCardExpense;
  }

  startSupply(url: string, cardId: string): Subscription {

    let entities: ListCreditCardExpensesDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, cardId).pipe(
      map((x: CreditCardExpenseDto[]) => {

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
          const expires = new Date(x[0].expires).getMonth();
          this.expensesMonth = ex_month(expires).name;

          x.forEach(
            (y: CreditCardExpenseDto) => {
              this.entities = this.supplyItemsGrid(entities, y);
              this.entities$ = of(this.entities);
              // this.entities$.subscribe(console.log)
              this.entitiesFiltered$ = this.entities$
              this.length = x.length;
              this.paymentStatus(x[0], this.entities);
              // this.getCurrentPagedInFrontEnd(this.entities, 0, this.pageSize, 'expires', false);
            })
        }
      })).subscribe();

  }

  current(entities: any[], currentPage: number, pageSize: number, field: string, withPagination: boolean) {
    
    return of(entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear()
      && new Date(x[field].key).getMonth() == (this.currentDate.getMonth())));

  }

  getCurrent = () => {
    this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));
  }

  isExpires(entities: ListCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())
        &&
        //checkIsExpires
        (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires.key).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
        &&
        //check month
        (new Date(x.expires.key).getMonth() == selectedMonth)
      );

      const result = checkPeriod.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())
      )

      return of(result.slice(currentPage, pageSize))
    }
  }

  isPaid(entities: ListCreditCardExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
    if (selectedMonth == -1) {
      const result = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
        &&
        //check month
        (new Date(x.expires.key).getMonth() <= this.currentDate.getMonth())
      );
      return of(result.filter(x =>
        //checkWasPaid
        (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())).slice(currentPage, pageSize))
   
    }
    else {
      const checkPeriod = entities.filter(x =>
        //check Year
        (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
        &&
        //check month
        (new Date(x.expires.key).getMonth() == selectedMonth)
      );
      return of(checkPeriod.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid.key).getFullYear()).slice(currentPage, pageSize))
    }
  }
}

