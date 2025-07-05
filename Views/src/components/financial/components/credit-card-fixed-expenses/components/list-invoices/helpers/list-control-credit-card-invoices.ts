
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


import { BaseList } from '../../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';
import { OnClickInterface } from '../../../../../../../../src/shared/components/list-g/list/interfaces/on-click-interface';
import { ListCreditCardInvoiceDto } from '../../../../credit-card-fixed-expenses/dto/list-credit-card-invoice-dto';
import { ListCreditCardInvoicesService } from '../services/list-credit-card-invoices.service';
import { CardDto } from 'src/components/financial/components/bank-account-cards/dto/card-dto';
import { DeleteServices } from '../../../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../../shared/pipes/pt-br-date.pipe';
import { CreditCardExpenseInvoiceDto } from '../dto/credit-card-expense-invoice-dto';
import { TriggerCreditCardsInvoices } from '../trigger-credit-cards-invoices';
import { ex_month, MonthsDto } from 'src/shared/components/months-select/months-dto';
import { BankAccountDto } from 'src/components/financial/components/bank-account-cards/dto/bank-account-dto';
import { ItemsViewInterface } from 'src/shared/components/view-default/interfaces/items-view.interface';

export class ListControlCreditCardInvoices extends BaseList {

  entities$: Observable<ListCreditCardInvoiceDto[]>;
  entitiesFiltered$: Observable<ListCreditCardInvoiceDto[]>;

  entities: ListCreditCardInvoiceDto[] = [];
  entitiesFiltered: ListCreditCardInvoiceDto[] = [];

  bankAccount: BankAccountDto = null;
  showDataBank: boolean = false;

  listCreditCardExpenseInvoice: CreditCardExpenseInvoiceDto[] = [];
  creditCard!: CardDto;

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();

  length = 0;
  showHideFilter = false;
  cardNick: string = '';

  itemsToView: ItemsViewInterface[] =[];

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
      { key: '', style: 'max-width:70px' },
      { key: 'Compras até:', style: '' },
      { key: 'Vencimento', style: '' },
      { key: 'Preço', style: '' },
      { key: 'Situação', style: '' },
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
      { key: 'closingDateView', style: '' },
      { key: 'expiresView', style: '' },
      { key: 'priceView', style: '' },
      { key: 'statusView', style: '' },
    ]
  }

 
  banckAccountSelected(bank: BankAccountDto) {
    this.itemsToView = [];
    this.itemsToView.push({ key: 'Banco:', value: bank.institution, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Conta:', value: bank.account, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Agência:', value: bank.agency, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Titular:', value: bank.holder, classValue: 'font-bold' });
  }
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;

    if (this.monthFilter.id != -1)
      this.entitiesFiltered$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');


    if (this.monthFilter.id == -1)
      this.entitiesFiltered$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');
  }

  onSelectedMonth(entities: any[], selectedMonth: number, field: string) {
    let result;

    if (selectedMonth != -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear() && new Date(x[field].key).getMonth() == selectedMonth);

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field].key).getFullYear());

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize));
    }
    return result;
  }

  arrayOrderByDate(entities: any[], field: string): any[] {
    return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  }

  onClickOrderByFields(field: string, entities$: Observable<ListCreditCardInvoiceDto[]>) {

    switch (field) {
      case 'closingDateView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'closingDate', value: new Date() }) as Observable<ListCreditCardInvoiceDto[]>;
        this.entitiesFiltered$.subscribe(X => console.log(X))
        break;

      case 'expiresView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'expires', value: new Date() }) as Observable<ListCreditCardInvoiceDto[]>;
        this.entitiesFiltered$.subscribe(X => console.log(X))
        break;

      case 'priceView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'price', value: 0 }) as Observable<ListCreditCardInvoiceDto[]>;
        this.entitiesFiltered$.subscribe(X => console.log(X))
        break;

      case 'statusView':
        this.entitiesFiltered$ = this.orderByFrontEnd(entities$, { key: 'status', value: new Date() }) as Observable<ListCreditCardInvoiceDto[]>;
        this.entitiesFiltered$.subscribe(X => console.log(X))
        break;
    }
  }

  onClickIcons(obj: OnClickInterface) {

    if (obj.action.split('|')[0] == 'close')
      this.getEntityTopay(obj.entityId, this.creditCard);

    if (obj.action.split('|')[0] == 'list') {
      this.callRouter(`/financial/list-credit-card-expenses/${obj.entityId}`);
    }

  }

  getCreditCardIdOutput(creditCard: CardDto) {
    //O erro de ter que clicar duas vezes para conseguir acessar qualquer outra rota pelos icones seja o de pagar ou o de detalhes etc... esta ligado a o codigo dessa função
    //era a linha de baixo,porem substituida por codigos mais abaixo dessa linha abaixo o error persiste.

    this.creditCard = creditCard;

    this.listCreditCardExpenseInvoice = creditCard.creditCardExpensesInvoices.filter(x => x.cardId == creditCard.id);

    const entities: ListCreditCardInvoiceDto[] = [];

    this.listCreditCardExpenseInvoice.forEach(

      (y: CreditCardExpenseInvoiceDto) => {
        this.entities = this.supplyItemsGrid(entities, y);
        this.entities$ = of(this.entities);
        this.entitiesFiltered$ = this.entities$
        this.length = this.listCreditCardExpenseInvoice.length;
      })

      this.showDataBank = true;
      
      this.bankAccount = creditCard.bankAccount;
      this.banckAccountSelected(this.bankAccount);

    const monthFilter = ex_month(new Date().getMonth());

    this.selectedMonth(monthFilter);

    this.cardNick = creditCard.description;

  }

  getEntityTopay(entityId: number, creditCard: CardDto) {

    const invoice = this.listCreditCardExpenseInvoice.find(x => x.id == entityId);
    invoice.card = creditCard;

    if (this.currentDate > new Date(invoice.closingDate))
      this.pay.callRouter('/financial/payment-credit-card-expenses', this.pay.entityToPay = invoice)
    else
      alert('Fatura não fechada!')

  }

  pay = new TriggerCreditCardsInvoices();

  supplyItemsGrid = (listCreditCardExpenseInvoice: ListCreditCardInvoiceDto[], creditCardexpenseInvoice: CreditCardExpenseInvoiceDto) => {

    const items: ListCreditCardInvoiceDto = new ListCreditCardInvoiceDto();

    Object.assign(items, {

      id: {
        key: creditCardexpenseInvoice.id,
        display: 'icons',
        icons: ['list|margin-right:10px;', 'edit|'],
        styleInsideCell: `max-width:30px; color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:30px; display:flex; justify-content: center;',
      },

      description: {
        key: creditCardexpenseInvoice.description,
        styleCell: 'width:100%;'
      },

      closingDate: {
        key: creditCardexpenseInvoice.closingDate,
      },
      closingDateView: {
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
      priceView: {
        key: this._ptBrCurrencyPipe.transform(Number(creditCardexpenseInvoice.price)),
        styleCell: 'width:100%;',
      },
      statusView: {
        key: '',
        display: 'icons',
        icons: new Date(creditCardexpenseInvoice.wasPaid).getFullYear() == this.minValue.getFullYear() ? ['close| font-size:35px; width:35px; height:35px;'] : ['check| font-size:35px; width:35px; height:35px;'],
        styleCell: 'cursor: pointer;',
        iconClasses: new Date(creditCardexpenseInvoice.wasPaid).getFullYear() == this.minValue.getFullYear() ? 'text-expired' : 'text-paid',
      },
      price: {
        keyN: creditCardexpenseInvoice.price,
      },
      status: {
        key: creditCardexpenseInvoice.wasPaid,
      },
    })

    listCreditCardExpenseInvoice.push(items);

    return listCreditCardExpenseInvoice;
  }

}