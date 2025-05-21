
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';
import { ListCreditCardInvoicesService } from '../services/list-credit-card-invoices.service';
import { ListCreditCardInvoiceDto } from '../../../../credit-card-fixed-expenses/dto/list-credit-card-invoice-dto'
import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';

import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { CreditCardExpenseInvoiceDto } from '../dto/credit-card-expense-invoice-dto';



export class ListControlCreditCardInvoices extends BaseList {

  entities$: Observable<ListCreditCardInvoiceDto[]>;
  entities: ListCreditCardInvoiceDto[] = [];
  entitiesFiltered$: Observable<ListCreditCardInvoiceDto[]>;
  entitiesFiltered: ListCreditCardInvoiceDto[] = [];
  length = 0;
  showHideFilter = false;
  term: string;
  // controllerUrl: string = environment._CUSTOMERS.split('/')[4];
  // backEndUrl: string = `${this.controllerUrl}/GetAllCustomersPagedAsync`;

  constructor(
    override _router: Router,
    public _http: HttpClient,
    protected _dialog: MatDialog,
    protected _listCreditCardInvoicesService: ListCreditCardInvoicesService,
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
      { key: 'Descrição', style: 'cursor: pointer;' },
      { key: 'Compras até:', style: 'cursor: pointer;' },
      { key: 'Vencimento', style: 'cursor: pointer;' },
      { key: 'Preço', style: 'cursor: pointer;' }
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
      { key: 'description', style: '' },
      { key: 'closingDate', style: '' },
      { key: 'expiresView', style: '' },
      { key: 'price', style: '' }
    ]
  }

  // onPageChange($event: PageEvent) {

  //   if ($event.previousPageIndex < $event.pageIndex)
  //     this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

  //   else if ($event.previousPageIndex > $event.pageIndex)
  //     this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

  //   if (this.term) {
  //     this.entitiesFiltered$ = of(this.pageChange(this.searchListEntities(this.entitiesFiltered, this.term), $event))
  //     this.length = this.searchListEntities(this.entitiesFiltered, this.term).length
  //   }

  // }
  onSelectedMonth(entities: any[], selectedMonth: number, field: string) {
    let result;
    entities.forEach(x => console.log(x));


    if (selectedMonth != -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear() && new Date(x[field].key).getMonth() == selectedMonth)

      // this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x[field].key).getFullYear())

      // this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize));
    }
    return result;
  }

  arrayOrderByDate(entities: any[], field: string): any[] {
    return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  }

  onClickOrderByFields(field: string, entities$: Observable<ListCreditCardInvoiceDto[]>) {

    // switch (field) {
    //   case 'name':

    //     this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<CustomerListDto[]>;
    //     break;

    //   case 'assured':
    //     this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<CustomerListDto[]>;
    //     break;

    //   case 'responsible':
    //     this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) as Observable<CustomerListDto[]>;
    //     break;
    // }

  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {

    console.log(obj.action)

    if (obj.action.split('|')[0] == 'edit') {
      this.callRouter(`/side-nav/customer/edit/${obj.entityId}`);

    }

    if (obj.action.split('|')[0] == 'list') {
      this.callRouter(`/side-nav/financial/list-credit-card-expenses/${obj.entityId}`);
      console.log(obj.entityId)
    }

    if (obj.action.split('|')[0] == 'delete')
      this.deleteFake(obj.entityId);

  }
  // ['',
  //   'Descrição',
  //   'Compras até:',
  //   'Vencimento',
  //   'Preço',],
  // ['description',
  //   'closingDate',
  //   'expiresView',
  //   'price']

  // makeGridItems(xy: CreditCardExpenseInvoiceDto) {
  //   console.log(xy)
  //   const viewDto = new ListCreditCardInvoiceDto;
  //   viewDto.id = xy.id;
  //   const wasPaid: Date = new Date(xy.wasPaid);
  //   const expires: Date = new Date(xy.expires);
  //   viewDto.wasPaid = xy.wasPaid;
  //   viewDto.userId = xy.userId.toString();

  //   const monthName = this.months[expires.getMonth()].name;
  //   viewDto.description = monthName.toUpperCase();
  //   viewDto.closingDate = this._ptBrDatePipe.transform(xy.closingDate, 'Date');
  //   viewDto.closingDateBusinessRule = new Date(xy.closingDate);
  //   viewDto.expires = xy.expires;
  //   viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
  //   viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
  //   viewDto.interest = xy.interest.toString();

  //   return viewDto;
  // }

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

  supplyItemsGrid = (ListCreditCardExpenseInvoice: ListCreditCardInvoiceDto[], creditCardexpenseInvoice: CreditCardExpenseInvoiceDto) => {

    const items: ListCreditCardInvoiceDto = new ListCreditCardInvoiceDto();
    //ListCreditCardExpenseInvoice = [];
    Object.assign(items, {

      id: {
        key: creditCardexpenseInvoice.id,
        display: 'icons',

        icons: ['list|margin-right:10px;', 'edit|', 'delete|color:rgb(158, 64, 64);margin-left:10px;'],

        // icons: ['zoom_in', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:100px;',
        route: ''
      },

      description: {
        key: creditCardexpenseInvoice.description,
        styleCell: 'width:100%;',

      },

      closingDate: {
        key: this._ptBrDatePipe.transform(creditCardexpenseInvoice.closingDate, 'Date'),
        styleCell: 'width:100%;',
      },

      expiresView: {
        key: this._ptBrDatePipe.transform(creditCardexpenseInvoice.expires, 'Date'),
        styleCell: 'width:100%;',
      },
      expires: {
        key: creditCardexpenseInvoice.expires
      },
      price: {
        key: this._ptBrCurrencyPipe.transform(Number(creditCardexpenseInvoice.price)),
        styleCell: 'width:100%;',
      }
    })

    ListCreditCardExpenseInvoice.push(items);

    return ListCreditCardExpenseInvoice;
  }

  startSupply(url: string, cardId: string): Subscription {


    let entities: ListCreditCardInvoiceDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, cardId).pipe(
      map((x: CreditCardExpenseInvoiceDto[]) => {
        console.log(x)
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

        x.forEach(

          (y: CreditCardExpenseInvoiceDto) => {
            this.entities = this.supplyItemsGrid(entities, y);
            this.entities$ = of(this.entities);
            // this.entities$.subscribe(console.log)
            this.entitiesFiltered$ = this.entities$
            this.length = x.length;
            this.getCurrentPagedInFrontEnd(this.entities, 0, this.pageSize, 'expires', false);
          })
      })).subscribe();


    // return this._listGDataService?.entities$.subscribe(
    //   {
    //     next: (x: CreditCardExpenseInvoiceDto[]) => {

    //       if (x.length > 0)
    //         console.log('Maior')



    //       x.forEach(
    //         (y: CreditCardExpenseInvoiceDto) => {
    //           // console.log(y)
    //           this.entities = this.supplyItemsGrid(entities, y);
    //           this.entities$ = of(this.entities);
    //           this.entitiesFiltered$ = this.entities$
    //         })

    //       // this.getCurrent();
    //     }
    //   }
    // )


  }

  // test() {
  //   {
  //     card: null;
  //     cardId: 1;
  //     closingDate: "2025-06-15T00:00:00";
  //     company: null;
  //     companyId: 1;
  //     creditCardExpense: null;
  //     creditCardExpenses: [{
  //       card: null,
  //       cardId: 1,
  //       categoryExpense: null,
  //       categoryExpenseId: 8,
  //       company: null,
  //       companyId: 1,
  //       creditCardExpenseInvoice: null,
  //       creditCardExpenseInvoiceId: 2,
  //       creditCardLimitOperation: null,
  //       currentInstallment: "1/2",
  //       deleted: "0001-01-01T00:00:00",
  //       description: "asddfsfdfdssdf",
  //       document: "4ee34d",
  //       expenseDay: "2025-05-20T03:00:00",
  //       expires: "2025-06-25T03:00:00",
  //       financingAndLoanExpenseId: null,
  //       id: 2,
  //       installmentPrice: 1111.11,
  //       installmentsQuantity: 2,
  //       monthlyFixedExpenseId: null,
  //       name: "tesrt",
  //       othersPaymentMethods: null,
  //       paidFromBankAccount: null,
  //       paidFromBankAccountId: null,
  //       paymentAtSight: 2222.22,
  //       price: 2222.22,
  //       registered: "2025-05-20T04:26:14.33832",
  //       subcategoryExpense: null,
  //       subcategoryExpenseId: 28,
  //       totalPercentageInterest: 0,
  //       totalPriceInterest: 0,
  //       user: null,
  //       userId: 1,
  //       variableExpenseId: null,
  //       wasPaid: "0001-01-01T00:00:00",
  //       yearlyFixedExpenseId: null,
  //     }];
  //     creditCardLimitOperation: null;
  //     deleted: "0001-01-01T00:00:00";
  //     description: "Gastos geral No Stop";
  //     document: null;
  //     expires: "2025-06-25T03:00:00";
  //     id: 2;
  //     interest: 0;
  //     othersPaymentMethods: null;
  //     paidFromBankAccountId: null;
  //     price: 1111.11;
  //     registered: "2025-05-20T04:26:14.427991";
  //     user: null;
  //     userId: 1;
  //     wasPaid: "0001-01-01T00:00:00";
  //   }
  // }

  getCurrentPagedInFrontEnd(entities: any[], currentPage: number, pageSize: number, field: string, withPagination: boolean) {
    this.entitiesFiltered$ = this.current(entities,
      currentPage,
      pageSize,
      field,
      withPagination);
  }

  current(entities: any[], currentPage: number, pageSize: number, field: string, withPagination: boolean) {
    let result: any[] = null;

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

  getCurrent = () => {
    this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));
  }
}

