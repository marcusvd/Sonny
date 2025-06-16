
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


import { environment } from '../../../../../../environments/environment';
import { ex_month, MonthsDto } from '../../../../../../shared/components/months-select/months-dto';
import { PtBrCurrencyPipe } from '../../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../../shared/pipes/pt-br-date.pipe';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { CreditCardExpenseInvoiceDto } from '../list-invoices/dto/credit-card-expense-invoice-dto';
import { ListCreditCardInvoiceDto } from '../../../credit-card-fixed-expenses/dto/list-credit-card-invoice-dto';
import { ListCreditCardInvoicesService } from './services/list-credit-card-invoices.service';
import { ListDefaultImports, ListDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { ListControlCreditCardInvoices } from '../../../credit-card-fixed-expenses/components/list-invoices/helpers/list-control-credit-card-invoices';
import { TriggerCreditCardsInvoices } from './trigger-credit-cards-invoices';
import { ListCreditCardExpensesImports, ListCreditCardExpensesProviders } from '../list/imports/list-credit-card-expenses.imports';


@Component({
  selector: 'list-credit-card-invoices',
  templateUrl: './list-credit-card-invoices.component.html',
  styleUrls: ['./list-credit-card-invoices.component.scss'],
  standalone: true,
  imports: [
    ListDefaultImports,
    ListCreditCardExpensesImports
  ],
  providers: [
    ListCreditCardExpensesProviders,
    ListDefaultProviders
  ]

})
export class ListCreditCardInvoicesComponent extends ListControlCreditCardInvoices implements OnInit, OnDestroy {

  constructor(
    private _fb: FormBuilder,
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _listCreditCardInvoicesService: ListCreditCardInvoicesService,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,

  ) {
    super(
      _router,
      _http,
      _dialog,
      _listCreditCardInvoicesService,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe
    )
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
  creditCardExpenseInvoiceSubscribe: Subscription;
  cardNick:string = '';


  ngOnDestroy(): void {
    this.creditCardExpenseInvoiceSubscribe?.unsubscribe();
  }


  controllerUrl: string = environment._CREDIT_CARD_EXPENSES_INVOICES.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  override  entities: ListCreditCardInvoiceDto[] = [];
  override entities$: Observable<ListCreditCardInvoiceDto[]>;
  listViewExpensesUrlRoute: string = '/financial/list-credit-card-expenses';
  // override addUrlRoute: string = '/financial/add-credit-card-expenses';






  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;

    if (this.monthFilter.id != -1)
      this.entitiesFiltered$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');


    if (this.monthFilter.id == -1)
      this.entitiesFiltered$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');
  }


  onPageChange(t: any) {

  }

  getCreditCardIdOutput(creditCard: CardDto) {

    this.showDataBank = true;
    this.bankAccount = creditCard.bankAccount;

    const monthFilter = ex_month(new Date().getMonth());

    this.selectedMonth(monthFilter);


    this.cardNick = creditCard.description;

    // console.log(creditCard)
    // this._listGDataService.getAllEntitiesInMemoryPaged$(`${this.controllerUrl}/GetAllByCardIdAsync`, creditCard.id.toString());

    // this._listGDataService?.entities$?.pipe(map(x => {
    //   if (x.length > 0)
    //     console.log('Maior')
    // }))

    this.creditCardExpenseInvoiceSubscribe = this.startSupply(`${this.controllerUrl}/GetAllByCardIdAsync`, creditCard.id.toString());
    // this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllByCardIdAsync`, creditCard.id.toString());

    // this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseInvoiceDto[]) => {
    //   this.cleanGridWhenChangeCard();

    //   x.forEach((xy: CreditCardExpenseInvoiceDto) => {
    //     xy.card = creditCard;
    //     this.listCreditCardExpenseInvoice.push(xy);
    //     this.entities.push(this.makeGridItems(xy));
    //   })

    //   this.getCurrentPagedInFrontEnd();
    // })
  }

  cleanGridWhenChangeCard() {
    this.entities = [];
    this.listCreditCardExpenseInvoice = [];
  }

  // months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  // { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  // { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  // { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]



  bankAccount: BankAccountDto = null;
  showDataBank: boolean = false;

  //   orderBy(field: string) {
  //     if (field.toLowerCase() == 'Vencimento'.toLowerCase())
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });

  //     if (field.toLowerCase() == 'preço'.toLowerCase())
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

  //     if (field.toLowerCase() == 'Compras até:'.toLowerCase())
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'closingDate': new Date() });

  //     if (field.toLowerCase() == 'Descrição'.toLowerCase())
  //       this.entities$ = this.orderByFrontEnd(this.entities$, { 'expires': new Date() });
  //   }


  ngOnInit(): void {

    this.selectedMonth(this.monthFilter);
  }

}
