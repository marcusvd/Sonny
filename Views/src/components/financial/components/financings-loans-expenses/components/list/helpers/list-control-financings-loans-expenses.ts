
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';

import { ListCreditCardInvoiceDto } from '../../../../credit-card-fixed-expenses/dto/list-credit-card-invoice-dto'
import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';

import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { ListFinancingsLoansExpensesDto } from '../dto/list-financings-loans-expenses-dto';
import { FinancingsLoansExpensesDto } from '../../../dto/financings-loans-expenses-dto';
// import { ListFinancingsLoansExpensesDto } from '../dto/list-credit-card-expenses-dto';
// financingsLoansExpensesDto{ FinancingsLoansExpensesDto } from '../../../dto/credit-card-expense-dto';
// import { ex_month, ex_months } from 'src/shared/components/months-select/months-dto';
// import { FinancialSubtitleDto } from 'src/components/financial/components/common-components/subtitle/financial-subtitle-dto';



export class ListControlFinancingsLoansExpenses extends BaseList {

  entities$: Observable<ListFinancingsLoansExpensesDto[]>;
  entities: ListFinancingsLoansExpensesDto[] = [];
  entitiesFiltered$: Observable<ListFinancingsLoansExpensesDto[]>;
  entitiesFiltered: ListCreditCardInvoiceDto[] = [];

  viewListUrlRoute: string = '/financial/list-financings-loans-expenses-installment';
  addUrlRoute: string = '/financial/add-financings-loans-expenses';

  length = 0;
  showHideFilter = false;
  // expensesMonth: string = null;
  term: string;

  // controllerUrl: string = environment._CUSTOMERS.split('/')[4];
  // backEndUrl: string = `${this.controllerUrl}/GetAllCustomersPagedAsync`;

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
      { key: 'Despesa', style: 'cursor: pointer;' },
      { key: 'Valor parcela', style: 'cursor: pointer;' },
      { key: 'Nº Parcelas', style: 'cursor: pointer;' },
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
      { key: 'name', style: '' },
      { key: 'installmentPrice', style: '' },
      { key: 'installmentsQuantity', style: '' },
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

  onClickOrderByFields(field: string, entities$: Observable<ListFinancingsLoansExpensesDto[]>) {

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

    if (obj.action.split('|')[0] == 'edit') {
      this.callRouter(`/customer/edit/${obj.entityId}`);

    }

    if (obj.action.split('|')[0] == 'list') {
      this.callRouter(`${this.viewListUrlRoute}/${obj.entityId}`);
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
  // statusCollection: FinancialSubtitleDto[] = [
  //   { id: 1, name: 'Vencida', squareBgColor: "bg-expired", monthColorName: "text-expired", visible: false },
  //   { id: 2, name: 'Pendente', squareBgColor: "bg-pendding", monthColorName: "text-pendding", visible: false },
  //   { id: 3, name: 'Liquidada', squareBgColor: "bg-paid", monthColorName: "text-paid", visible: false }
  // ]


  supplyItemsGrid = (listFinancingsLoansExpenses: ListFinancingsLoansExpensesDto[], financingsLoansExpenses: FinancingsLoansExpensesDto) => {

    const items: ListFinancingsLoansExpensesDto = new ListFinancingsLoansExpensesDto();
    //ListCreditCardExpense = [];
    Object.assign(items, {

      id: {
        key: financingsLoansExpenses.id,
        display: 'icons',

        icons: ['list|margin-right:10px;', 'edit|', 'delete|color:rgb(158, 64, 64);margin-left:10px;'],

        // icons: ['zoom_in', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:100px;',
        route: ''
      },

      name: {
        key: financingsLoansExpenses.name,
        styleCell: 'width:100%;',

      },
      installmentPrice: {
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
          // const expires = new Date(x[0].expires).getMonth();
          // this.expensesMonth = ex_month(expires).name;

          x.forEach(
            (y: FinancingsLoansExpensesDto) => {
              this.entities = this.supplyItemsGrid(entities, y);
              this.entities$ = of(this.entities);
              // this.entities$.subscribe(console.log)
              this.entitiesFiltered$ = this.entities$
              this.length = x.length;

              // this.getCurrentPagedInFrontEnd(this.entities, 0, this.pageSize, 'expires', false);
            })
        }
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

  // getCurrentPagedInFrontEnd(entities: any[], currentPage: number, pageSize: number, field: string, withPagination: boolean) {
  //   this.entitiesFiltered$ = this.current(entities,
  //     currentPage,
  //     pageSize,
  //     field,
  //     withPagination);
  // }

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

  getCurrent = () => {
    this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));
  }


  // isExpires(entities: ListFinancingsLoansExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
  //   if (selectedMonth == -1) {
  //     const result = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
  //     );
  //     return of(result.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())
  //       &&
  //       //checkIsExpires
  //       (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires.key).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
  //   }
  //   else {
  //     const checkPeriod = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires.key).getMonth() == selectedMonth)
  //     );

  //     const result = checkPeriod.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())
  //       &&
  //       //checkIsExpires
  //       (new Date(this.currentDateWithoutHours) > new Date(new Date(x.expires.key).setHours(0, 0, 0, 0)))
  //     )

  //     return of(result.slice(currentPage, pageSize))
  //   }
  // }

  // isPending(entities: ListFinancingsLoansExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {

  //   if (selectedMonth == -1) {
  //     const result = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires.key).getMonth() <= this.currentDate.getMonth())
  //     );
  //     return of(result.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())
  //       &&
  //       //checkIsPendig
  //       (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires.key).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
  //   }
  //   else {

  //     const checkPeriod = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires.key).getMonth() == selectedMonth)
  //     );

  //     const result = checkPeriod.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())
  //       &&
  //       //checkIsPendig
  //       (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires.key).setHours(0, 0, 0, 0)))

  //     )

  //     return of(result.slice(currentPage, pageSize))
  //   }

  // }

  // isPaid(entities: ListFinancingsLoansExpensesDto[], selectedMonth: number, currentPage: number, pageSize: number) {
  //   if (selectedMonth == -1) {
  //     const result = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires.key).getMonth() <= this.currentDate.getMonth())
  //     );
  //     return of(result.filter(x =>
  //       //checkWasPaid
  //       (this.minValue.getFullYear() == new Date(x.wasPaid.key).getFullYear())
  //       &&
  //       //checkIsPendig
  //       (new Date(this.currentDateWithoutHours) <= new Date(new Date(x.expires.key).setHours(0, 0, 0, 0)))).slice(currentPage, pageSize))
  //   }
  //   else {
  //     const checkPeriod = entities.filter(x =>
  //       //check Year
  //       (this.currentDate.getFullYear() == new Date(x.expires.key).getFullYear())
  //       &&
  //       //check month
  //       (new Date(x.expires.key).getMonth() == selectedMonth)
  //     );
  //     return of(checkPeriod.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid.key).getFullYear()).slice(currentPage, pageSize))
  //   }
  // }

}

