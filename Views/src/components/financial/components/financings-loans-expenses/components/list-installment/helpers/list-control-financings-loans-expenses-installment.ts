
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';


import { map } from 'rxjs/operators';

import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';
import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { FinancingAndLoanExpenseInstallmentDto } from '../../../dto/financing-and-loan-expense-installment-dto';
import { ListFinancingsLoansExpensesInstallmentDto } from '../dto/list-financings-loans-expenses-installment-dto';
import { TriggerPaymentFinancingsLoansInstallment } from '../trigger-payment-financings-loans-installment';
import { environment } from 'src/environments/environment';
import { DetailsValuesInterface } from '../financing-values/dto/details-values.interface';
import { FinancingsLoansExpensesDto } from '../../../dto/financings-loans-expenses-dto';


export class ListControlListFinancingsLoansExpensesInstallment extends BaseList {

  immutableEntitiesFromDb: FinancingAndLoanExpenseInstallmentDto[] = [];
  entities$: Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
  entities: ListFinancingsLoansExpensesInstallmentDto[] = [];
  entitiesFiltered$: Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
  entitiesFiltered: ListFinancingsLoansExpensesInstallmentDto[] = [];

  cleanRadios = false;
  showHideFilter = false;
  showHideDetails = false;

  viewListUrlRoute: string = '/financial/list-financings-loans-expenses-installment';
  addUrlRoute: string = '/financial/add-financings-loans-expenses';
  controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];
  filterRadioSelected: string = '';

  idFinancingsLoansExpenses = '';
  length = 0;

  paid: number = 0;
  valuesFinancing: DetailsValuesInterface = {
    totalPriceToBePaid: 0,
    totalPriceInterest: 0,
    totalPercentageInterest: 0,
    installmentPrice: 0,
    totalPaid: 0,
    remainderToBePaid: 0,
    installmentsQuantity: '0',
  };

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
      { key: 'priceWasPaidInstallmentView', style: '' },
      { key: 'currentInstallment', style: '' },
      { key: 'status', style: '' },
    ]
  }

  pay = new TriggerPaymentFinancingsLoansInstallment(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

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
      expires: {
        key: financingsLoansExpensesInstallment.expires,
      },
      priceWasPaidInstallmentView: {
        key: this._ptBrCurrencyPipe.transform(financingsLoansExpensesInstallment.priceWasPaidInstallment),
        styleCell: 'width:100%;',
      },
      priceWasPaidInstallment: {
        keyN: financingsLoansExpensesInstallment.priceWasPaidInstallment,
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

  startSupply(url: string, id: string): Subscription {
    this.idFinancingsLoansExpenses = id;
    let entities: ListFinancingsLoansExpensesInstallmentDto[] = [];

    return this._listGDataService?.getAllEntitiesInMemoryPaged$(url, id).pipe(
      map((x: FinancingAndLoanExpenseInstallmentDto[]) => {

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
              this.totalInstallmentsPaid(y);

            })

          this.calcs(this.entities);
        }
      })).subscribe();
  }

  totalInstallmentsPaid(y: FinancingAndLoanExpenseInstallmentDto) {
    if (new Date(y.wasPaid).getFullYear() != this.minValue.getFullYear()) {
      this.valuesFinancing.totalPaid++;
      this.valuesFinancing.installmentsQuantity = this.valuesFinancing.totalPaid.toString();
    }
    else
      this.valuesFinancing.remainderToBePaid++;
  }

  // onSelectedMonth(entities: any[], selectedMonth: number, field: string) {
  //   let result;

  //   if (selectedMonth != -1) {

  //     result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear() && new Date(x[field].key).getMonth() == selectedMonth);

  //     const ordered = this.arrayOrderByDate(result, field);

  //     result = of(ordered.slice(0, this.pageSize))
  //   }

  //   if (selectedMonth == -1) {

  //     result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear())

  //     const ordered = this.arrayOrderByDate(result, field)

  //     result = of(ordered.slice(0, this.pageSize));
  //   }
  //   return result;
  // }

  // arrayOrderByDate(entities: any[], field: string): any[] {
  //   return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  // }

  onClickOrderByFields(field: string, entities$: Observable<ListFinancingsLoansExpensesInstallmentDto[]>) {

    switch (field) {
      case 'expiresView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'expires', value: new Date() }) as Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
        break;

      case 'priceWasPaidInstallmentView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'priceWasPaidInstallment', value: 0 }) as Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
        break;

      case 'currentInstallment':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'expires', value: new Date() }) as Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
        break;

      case 'status':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'wasPaid', value: new Date() }) as Observable<ListFinancingsLoansExpensesInstallmentDto[]>;
        break;
    }

  }

  showHideFilterMtd() {
    this.showHideFilter = !this.showHideFilter;

    if (!this.showHideFilter)
      this.filterClear();
  }

  showHideDetailsMtd() {
    this.showHideDetails = !this.showHideDetails;

    if (this.showHideFilter)
      this.filterClear();

  }

  onClickIcons(obj: OnClickInterface) {
    console.log(obj.action.split('|')[0])

    if (obj.action.split('|')[0] == 'edit')
      this.callRouter(`/customer/edit/${obj.entityId}`);

    if (obj.action.split('|')[0] == 'list')
      this.callRouter(`${this.viewListUrlRoute}/${obj.entityId}`);

    if (obj.action.split('|')[0] == 'close')
      this.pay.callRoute(this.pay.entityToPay = this.immutableEntitiesFromDb.find(x => x.id == obj.entityId))
  }

  filterClear() {
    this.cleanRadios = !this.cleanRadios
    this.filterRadioSelected = '';
    this.entitiesFiltered$ = of(this.entities);
  }

  filterView(radio: MatRadioChange) {

    if (radio.source.value == 'expired') {
      this.filter('expired', this.entities, 0, this.pageSize);
      this.filterRadioSelected = 'expired';
    }

    // if (radio.source.value == 'pending') {
    //   this.filter('pending', this.entities, 0, this.pageSize);
    //   this.filterRadioSelected = 'pending';
    // }

    if (radio.source.value == 'paid') {
      this.filter('paid', this.entities, 0, this.pageSize);
      this.filterRadioSelected = 'paid';
    }

  }

  filter(selected: string, entities: ListFinancingsLoansExpensesInstallmentDto[], currentPage: number, pageSize: number) {

    let result = null;

    if (selected == 'expired') {
      result = entities.filter(x => this.currentDateWithoutHours > new Date(x.expires.key).setHours(0, 0, 0, 0) && new Date(x.wasPaid.key).getFullYear() == this.minValue.getFullYear());
      this.entitiesFiltered$ = of(result.slice(currentPage, pageSize));
    }

    // if (selected == 'pending') {
    //   result = entities.filter(x => this.minValue.getFullYear() == new Date(x['wasPaid'].key).getFullYear() && this.currentDateWithoutHours < new Date(x['expires'].key).setHours(0, 0, 0, 0));
    //   this.entitiesFiltered$ = of(result.slice(currentPage, pageSize));
    // }

    if (selected == 'paid') {
      result = entities.filter(x => this.minValue.getFullYear() != new Date(x.wasPaid.key).getFullYear());
      this.entitiesFiltered$ = of(result.slice(currentPage, pageSize));
    }
  }

  calcs(entities: ListFinancingsLoansExpensesInstallmentDto[]) {

    const entitiesPaid = entities.filter(x => new Date(x.wasPaid.key).getFullYear() != this.minValue.getFullYear());
    this.paid = entitiesPaid.reduce((x, y) => x + y.priceWasPaidInstallment.keyN, 0);


    this._listGDataService?.loadById$<FinancingsLoansExpensesDto>(`${this.controllerUrl}/GetFinancingsAndLoansGetExpensesByIdAllIncluded`, this.idFinancingsLoansExpenses)
      .pipe(
        map(x => {
          this.valuesFinancing.totalPriceToBePaid = x.totalPriceToBePaid;
          this.valuesFinancing.totalPriceInterest = x.totalPriceInterest;
          this.valuesFinancing.totalPercentageInterest = x.totalPercentageInterest;
          this.valuesFinancing.installmentPrice = x.installmentPrice;
          this.valuesFinancing.totalPaid = this.valuesFinancing.totalPaid * this.valuesFinancing.installmentPrice;
          this.valuesFinancing.remainderToBePaid = this.valuesFinancing.remainderToBePaid * this.valuesFinancing.installmentPrice;
          this.valuesFinancing.installmentsQuantity = `${this.valuesFinancing.installmentsQuantity ?? 0}/${x.installmentsQuantity.toString()}`;
        })
      ).subscribe();
  }
}
