
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';

import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';

import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { map } from 'rxjs/operators';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { FinancingAndLoanExpenseInstallmentDto } from '../../../dto/financing-and-loan-expense-installment-dto';
import { ListFinancingsLoansExpensesInstallmentDto } from '../dto/list-financings-loans-expenses-installment-dto';
import { TriggerPaymentFinancingsLoansInstallment } from '../trigger-payment-financings-loans-installment';



export class ListControlListFinancingsLoansExpensesInstallment extends BaseList {

  immutableEntitiesFromDb: FinancingAndLoanExpenseInstallmentDto[] = [];
  entities$: Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
  entities: ListFinancingsLoansExpensesInstallmentDto[] = [];
  entitiesFiltered$: Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
  entitiesFiltered: ListFinancingsLoansExpensesInstallmentDto[] = [];

  cleanRadios = false;
  showHideFilter = false;

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
      { key: '', style: 'cursor: pointer;max-width:30px;' },
      { key: 'Vencimento', style: 'cursor: pointer;' },
      { key: 'Valor pago', style: 'cursor: pointer;' },
      { key: 'Nº Parcelas', style: 'cursor: pointer;' },
      { key: 'Status', style: 'cursor: pointer;' },
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:30px;' },
      { key: 'expiresView', style: '' },
      { key: 'priceWasPaidInstallment', style: '' },
      { key: 'currentInstallment', style: '' },
      { key: 'status', style: '' },
    ]
  }

  onSelectedMonth(entities: any[], selectedMonth: number, field: string) {
    let result;

    if (selectedMonth != -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear() && new Date(x[field].key).getMonth() == selectedMonth);

      const ordered = this.arrayOrderByDate(result, field);

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

  onClickOrderByFields(field: string, entities$: Observable<ListFinancingsLoansExpensesInstallmentDto[]>) {

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

  showHideFilterMtd($event: any) {
    this.showHideFilter = !this.showHideFilter;
  }

  onClickIcons(obj: OnClickInterface) {

    console.log(obj.entityId)

    if (obj.action.split('|')[0] == 'edit') {
      this.callRouter(`/customer/edit/${obj.entityId}`);
    }

    if (obj.action.split('|')[0] == 'list') {
      this.callRouter(`${this.viewListUrlRoute}/${obj.entityId}`);
      console.log(obj.entityId)
    }

    if (obj.action.split('|')[0] == 'delete')
      this.deleteFake(obj.entityId);

    if (obj.action.split('|')[0] == 'check') {
      const entityFound = this.getEntityById(obj.entityId);
      this.getEntityTopay(entityFound);
    }

  }


  getEntityById = (id: number) => {
    return this.immutableEntitiesFromDb.find(x => x.id == id);
  }

  getEntityTopay(entity: FinancingAndLoanExpenseInstallmentDto) {

    const installment = entity;

    this.pay.entityToPay = installment;

    this.pay.callRoute(this.pay.entityToPay);
  }

  pay = new TriggerPaymentFinancingsLoansInstallment(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  filterRadioSelected: string = '';

  filterClear() {
    this.cleanRadios = !this.cleanRadios
    this.filterRadioSelected = '';
    this.getCurrentPagedInFrontEnd();
  }

  filterView(radio: MatRadioChange) {

    if (radio.source.value == 'expired') {
      this.filter('expired', this.entities, 0, this.pageSize, 'expires', 'wasPaid');
      this.filterRadioSelected = 'expired';
    }

    if (radio.source.value == 'pending') {
      this.filter('pending', this.entities, 0, this.pageSize, 'expires', 'wasPaid');
      this.filterRadioSelected = 'pending';
    }

    if (radio.source.value == 'paid') {
      this.filter('paid', this.entities, 0, this.pageSize, 'expires', 'wasPaid');
      this.filterRadioSelected = 'paid';
    }

  }


  filter(selected: string, entities: any[], currentPage: number, pageSize: number, fieldDateExpires: string, fieldDateWasPaid: string) {

    let result = null;

    if (selected == 'expired') {
      result = entities.filter(x => this.currentDateWithoutHours > new Date(x[fieldDateExpires].key).setHours(0, 0, 0, 0) && new Date(x[fieldDateWasPaid].key).getFullYear() == this.minValue.getFullYear());
      this.entitiesFiltered$ = of(result.slice(currentPage, pageSize));
      console.log(result.length)
    }

    if (selected == 'pending') {
      result = entities.filter(x => this.minValue.getFullYear() == new Date(x[fieldDateWasPaid].key).getFullYear() && this.currentDateWithoutHours < new Date(x[fieldDateExpires].key).setHours(0, 0, 0, 0));
      this.entitiesFiltered$ = of(result.slice(currentPage, pageSize));
      console.log(result.length)
    }

    if (selected == 'paid') {
      result = entities.filter(x => this.minValue.getFullYear() != new Date(x[fieldDateWasPaid].key).getFullYear());
      this.entitiesFiltered$ = of(result.slice(currentPage, pageSize));
      console.log(result.length)
    }
    if (currentPage <= 0) {
      // this?.gridListCommonHelper?.lengthPaginator?.next(result.length)}
    }
  }

  getCurrentPagedInFrontEnd() {
    this.entitiesFiltered$ = of(this.entities);
    // this.gridListCommonHelper.lengthPaginator.next(this.entities.length)
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
  // statusCollection: FinancialSubtitleDto[] = [
  //   { id: 1, name: 'Vencida', squareBgColor: "bg-expired", monthColorName: "text-expired", visible: false },
  //   { id: 2, name: 'Pendente', squareBgColor: "bg-pendding", monthColorName: "text-pendding", visible: false },
  //   { id: 3, name: 'Liquidada', squareBgColor: "bg-paid", monthColorName: "text-paid", visible: false }
  // ]


  supplyItemsGrid = (listFinancingsLoansExpensesInstallment: ListFinancingsLoansExpensesInstallmentDto[], financingsLoansExpensesInstallment: FinancingAndLoanExpenseInstallmentDto) => {


    const items: ListFinancingsLoansExpensesInstallmentDto = new ListFinancingsLoansExpensesInstallmentDto();

    Object.assign(items, {

      id: {
        key: financingsLoansExpensesInstallment.id,
        display: 'icons',
        icons: ['edit|'],
        styleInsideCell: `max-width:30px; color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:30px; display:flex; justify-content: center;',
      },
      expiresView: {
        key: this._ptBrDatePipe.transform(financingsLoansExpensesInstallment.expires, 'Date'),
        styleCell: 'width:100%;',
      },
      priceWasPaidInstallment: {
        key: this._ptBrCurrencyPipe.transform(financingsLoansExpensesInstallment.priceWasPaidInstallment),
        styleCell: 'width:100%;',
      },
      currentInstallment: {
        key: financingsLoansExpensesInstallment.currentInstallment
      },
      status: {
        key: '',
        display: 'icons',
        icons: new Date(financingsLoansExpensesInstallment.wasPaid).getFullYear() == this.minValue.getFullYear() ? ['close| font-size:35px; width:35px; height:35px;'] : ['check| font-size:35px; width:35px; height:35px;'],
        styleCell: 'cursor: pointer;',
        iconClasses: new Date(financingsLoansExpensesInstallment.wasPaid).getFullYear() == this.minValue.getFullYear() ? 'text-expired' : 'text-paid',
      },

      expires: {
        key: financingsLoansExpensesInstallment.expires,
      },
      wasPaid: {
        key: financingsLoansExpensesInstallment.wasPaid,
      },
      wasPaidView: {
        key: financingsLoansExpensesInstallment.wasPaid,
      },
      companyId: {
        key: financingsLoansExpensesInstallment.companyId,
      },
      userId: {
        key: financingsLoansExpensesInstallment.userId,
      },
      bankAccountId: {
        key: financingsLoansExpensesInstallment.bankAccountId,
      },
      deleted: {
        key: financingsLoansExpensesInstallment.deleted,
      },
      cardId: {
        key: financingsLoansExpensesInstallment.cardId,
      },
      pixId: {
        key: financingsLoansExpensesInstallment.pixId,
      },
      interest: {
        key: financingsLoansExpensesInstallment.interest,
      },
      registered: {
        key: financingsLoansExpensesInstallment.registered,
      },
      othersPaymentMethods: {
        key: financingsLoansExpensesInstallment.othersPaymentMethods,
      },
      document: {
        key: financingsLoansExpensesInstallment.document,
      },
      financingAndLoanExpense: {
        key: financingsLoansExpensesInstallment.financingAndLoanExpense,
      },

    })

    listFinancingsLoansExpensesInstallment.push(items);

    return listFinancingsLoansExpensesInstallment;
  }

  startSupply(url: string, cardId: string): Subscription {


    let entities: ListFinancingsLoansExpensesInstallmentDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, cardId).pipe(
      map((x: FinancingAndLoanExpenseInstallmentDto[]) => {

        console.log(x)

        if (x.length <= 0) {
          entities = [];
          this.entities = [];
          this.immutableEntitiesFromDb = [];
          this.entities$ = of([]);
          this.entitiesFiltered$ = of([]);
          this.length = 0;
        }

        entities = [];
        this.entities = [];
        this.entities$ = of([]);
        if (x?.length != 0) {

          this.immutableEntitiesFromDb = x;

          x.forEach(
            (y: FinancingAndLoanExpenseInstallmentDto) => {
              this.entities = this.supplyItemsGrid(entities, y);
              this.entities$ = of(this.entities);
              this.entitiesFiltered$ = this.entities$
              this.length = x.length;
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
}

