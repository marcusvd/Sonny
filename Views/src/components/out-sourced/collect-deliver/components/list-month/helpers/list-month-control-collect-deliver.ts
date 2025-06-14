
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../../shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../shared/components/list-g/list/data/list-g-data.service';


import { OnClickInterface } from '../../../../../../shared/components/list-g/list/interfaces/on-click-interface';

import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { MonthsDto } from '../../../../../../shared/components/months-select/months-dto';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { CollectDeliverDto } from '../../../dto/collect-deliver-dto';
import { ListMonthCollectDeliverDto } from '../dto/list-month-collect-deliver-dto';


export class ListMonthControlCollectDeliver extends BaseList {

  entities$: Observable<ListMonthCollectDeliverDto[]>;
  entities: ListMonthCollectDeliverDto[] = [];
  entitiesFiltered$: Observable<ListMonthCollectDeliverDto[]>;
  entitiesFiltered: ListMonthCollectDeliverDto[] = [];

  viewListUrlRoute: string = '/outsourced/list-collect-deliver-by-month';
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
      { key: '', style: 'max-width:10px;' },
      { key: 'Mês', style: '' },
      { key: 'R$ Total', style: '' },
      { key: 'Situação', style: '' }
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:10px;' },
      { key: 'month', style: '' },
      { key: 'price', style: '' },
      { key: 'expiresView', style: '' }
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


  arrayOrderByDate(entities: any[], field: string): any[] {
    return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  }

  onClickOrderByFields(field: string, entities$: Observable<ListMonthCollectDeliverDto[]>) {

    // switch (field) {
    //   case 'name':

    //     this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<ListCustomerDto[]>;
    //     break;

    //   case 'assured':
    //     this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<ListCustomerDto[]>;
    //     break;

    //   case 'responsible':
    //     this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) as Observable<ListCustomerDto[]>;
    //     break;
    // }

  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {

    console.log(obj)

    if (obj.action.split('|')[0] == 'edit') {
      this.callRouter(`/customer/edit/${obj.entityId}`);

    }

    if (obj.action.split('|')[0] == 'visibility') {
      console.log(`${this.viewListUrlRoute}/${obj.entityId}`)
      this.callRouter(`${this.viewListUrlRoute}/${obj.entityId}`);
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


  // supplyItemsGrid = (listMonthCollectDeliver: ListMonthCollectDeliverDto[], collectDeliver: CollectDeliverDto) => {

  //   const items: ListMonthCollectDeliverDto = new ListMonthCollectDeliverDto();
  //   //ListCreditCardExpense = [];
  //   Object.assign(items, {

  //     id: {
  //       key: collectDeliver.id,
  //       display: 'icons',

  //       icons: ['visibility|margin-right:10px;', 'edit|', 'delete_outline|color:rgb(158, 64, 64);margin-left:10px;'],
  //       // icons: ['zoom_in', 'edit', 'home'],
  //       styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
  //       styleCell: 'max-width:100px;',
  //       route: ''
  //     },

  //     month: {
  //       key: collectDeliver.billingFrom,
  //       styleCell: 'width:100%;',
  //     },
  //     price: {
  //       key: this._ptBrCurrencyPipe.transform(collectDeliver.price),
  //       styleCell: 'width:100%;',
  //     },
  //     expiresView: {
  //       key: this._ptBrDatePipe.transform(collectDeliver.wasPaid),
  //       styleCell: 'width:100%;',
  //     },
  //     expires: {
  //       key: this._ptBrDatePipe.transform(collectDeliver.price),
  //       styleCell: 'width:100%;',
  //     },

  //   })

  //   listMonthCollectDeliver.push(items);

  //   return listMonthCollectDeliver;
  // }

  startSupply(url: string, param: string): Subscription {

    // this.makeMonths();
    // let entities: ListMonthCollectDeliverDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, param).pipe(
      map((x: CollectDeliverDto[]) => {

        if (x.length <= 0) {

          this.entities = [];
          this.entities$ = of([]);
          this.entitiesFiltered$ = of([]);
          this.length = 0;



          this.entities = this.supplyItemsGrid(x, this.makeMonths())
          this.entities$ = of(this.entities);
          // this.entities$.subscribe(console.log)
          this.entitiesFiltered$ = this.entities$
          this.length = x.length;

        }


        this.entities = [];
        this.entities$ = of([]);
        if (x?.length != 0) {
          // const expires = new Date(x[0].expires).getMonth();
          // this.expensesMonth = ex_month(expires).name;

          this.entities = this.supplyItemsGrid(x, this.makeMonths())
          this.entities$ = of(this.entities);
          // this.entities$.subscribe(console.log)
          this.entitiesFiltered$ = this.entities$
          this.length = x.length;
          // x.forEach(
          //   (y: CollectDeliverDto) => {
          //     // this.entities = this.supplyItemsGrid(entities, y);
          //     supplyItemsGrid()
          //     this.entities$ = of(this.entities);
          //     // this.entities$.subscribe(console.log)
          //     this.entitiesFiltered$ = this.entities$
          //     this.length = x.length;

          //     // this.getCurrentPagedInFrontEnd(this.entities, 0, this.pageSize, 'expires', false);
          //   })
        }
      })).subscribe();

  }

  makeMonths() {
    const monthsView: ListMonthCollectDeliverDto[] = [];
    let item: ListMonthCollectDeliverDto;
    // visibility
    // delete
    // format_list_numbered


    this.months.forEach((m: MonthsDto) => {

      item = new ListMonthCollectDeliverDto();

      if (m.name != 'TODOS') {
        Object.assign(item, {

          id: {
            key: m.id.toString(),
            display: 'icons',
            icons: ['visibility|cursor: pointer; color:rgb(43, 161, 168);'],
            styleCell: 'max-width:10px; display:flex; justify-content: center;',
            styleInsideCell: 'max-width:10px;'
          },
          month: {
            key: m.name,
            styleCell: ''
          },
          idMonth: {
            key: m.id.toString()
          },
          price: {
            key: this._ptBrCurrencyPipe.transform(0)
          },
          amountPrice: {
            keyN: 0
          },
          start: {
            key: new Date(this.currentDate.getFullYear(), m.id, 1).toDateString()
          },
          wasPaid: {
            key: this.minValue.toDateString()
          },
          wasPaidCheck: {
            key: '1'
          },
          expiresView: {
            key: '',
             display: 'icons',
             icons: ['check| font-size:35px; width:35px; height:35px;'],
            iconClasses:'text-paid'
          },
          expires: {
            key: this.minValue.toDateString()
          }
        })
        monthsView.push(item)
      }

    });

    // console.log(monthsView)
    return monthsView;
  }

  amountYear: string = '';
  localAmountCosts: string = '';

  // getEntitiesCurrentYear(entities: CollectDeliverDto[]) {
  //   return entities.filter(fromDb => new Date(fromDb.start).getFullYear() == this.currentDate.getFullYear());
  // }

  comparedMonthsCurrentYear(entities: CollectDeliverDto[], itemsGrid: ListMonthCollectDeliverDto[]) {
    return entities.filter(fromDb => itemsGrid.filter(gd => new Date(gd.idMonth.key).getMonth() == new Date(fromDb.start).getMonth()))
  }

  supplyItemsGrid(entities: CollectDeliverDto[], itemsGrid: ListMonthCollectDeliverDto[]) {

    this.amountYear = this._ptBrCurrencyPipe.transform(entities.reduce((x, y) => x + y.price, 0));
    this.localAmountCosts = this._ptBrCurrencyPipe.transform(entities.filter(x => x.billingFrom.base).reduce((x, y) => x + y.price, 0));

    let numberOfRunsMonthly = 0;
    let numberOfRunsMonthlyWasPaid = 0;

    this.comparedMonthsCurrentYear(entities, itemsGrid).forEach((fromDb: CollectDeliverDto) => {
      numberOfRunsMonthly++;

      const indexGridMonth = new Date(fromDb.start).getMonth();

      const wasPaid = new Date(fromDb.wasPaid).getFullYear();


      if (indexGridMonth.toString() == itemsGrid[indexGridMonth].idMonth.key) {

        console.log(fromDb != null)

        const resultPrice = itemsGrid[indexGridMonth].amountPrice.keyN += fromDb.price;
        itemsGrid[indexGridMonth].price.key = this._ptBrCurrencyPipe.transform(resultPrice);
        itemsGrid[indexGridMonth].start.key = fromDb?.start as string as string;

        if (wasPaid != this.minValue.getFullYear())
          numberOfRunsMonthlyWasPaid++;

        if (numberOfRunsMonthly == numberOfRunsMonthlyWasPaid) {
          
          //  itemsGrid[indexGridMonth].expiresView.icons = ['|background-color:red;width: color:red; border-color: red !important;'],
         
          itemsGrid[indexGridMonth].wasPaid.key = fromDb.wasPaid as string;
        }
        else {
          
         itemsGrid[indexGridMonth].expiresView.iconClasses= 'text-expired';
                  itemsGrid[indexGridMonth].wasPaid.key = fromDb.wasPaid as string;
          itemsGrid[indexGridMonth].expires.key = fromDb.wasPaid as string;
        }

      }

      numberOfRunsMonthly = 0;
      numberOfRunsMonthlyWasPaid = 0;
    })
    return itemsGrid;
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


  // isExpires(entities: ListMonthCollectDeliverDto[], selectedMonth: number, currentPage: number, pageSize: number) {
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

  // isPending(entities: ListMonthCollectDeliverDto[], selectedMonth: number, currentPage: number, pageSize: number) {

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

  // isPaid(entities: ListMonthCollectDeliverDto[], selectedMonth: number, currentPage: number, pageSize: number) {
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

