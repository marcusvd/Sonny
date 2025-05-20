
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule as MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';

import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { ViewBankAccountComponent } from '../../../common-components/view-bank-account/view-bank-account.component';
import { CreditCardExpenseInvoiceDto } from '../list -invoices/dto/credit-card-expense-invoice-dto';
import { CreditCardInvoicesMatSelectSingleComponent } from '../credit-card-invoice/credit-card-invoices-mat-select-single.component';
import { FrontEndListFilterCreditCardInvoices } from './filter-list/front-end-list-filter-credit-card-invoices';
import { ListCreditCardInvoicesService } from './services/list-credit-card-invoices.service';
import { ListCreditCardInvoiceDto } from '../../../credit-card-fixed-expenses/dto/list-credit-card-invoice-dto';

import { TriggerCreditCardsInvoices } from './trigger-credit-cards-invoices';
import { ListGComponent } from 'src/shared/components/list-g/list/list-g.component';
import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { ListControlCreditCardInvoices } from '../../../credit-card-fixed-expenses/components/list -invoices/helpers/list-control-credit-card-invoices';
import { map } from 'rxjs/operators';

@Component({
  selector: 'list-credit-card-invoices',
  templateUrl: './list-credit-card-invoices.component.html',
  styleUrls: ['./list-credit-card-invoices.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,

    MatCheckboxModule,
    MatRadioModule,
    BankCardNumberPipe,
    // GridListCommonComponent,
    // GridListCommonTableComponent,
    // GridListCommonSearchComponent,
    TitleComponent,
    BtnGComponent,
    SubTitleComponent,
    MonthsSelectComponent,
    CreditCardInvoicesMatSelectSingleComponent,
    ViewBankAccountComponent,
    ListGComponent
  ],
  providers: [
    ListCreditCardInvoicesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
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


  ngOnDestroy(): void {
    this.creditCardExpenseInvoiceSubscribe?.unsubscribe();
  }


  controllerUrl: string = environment._CREDIT_CARD_EXPENSES_INVOICES.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  override  entities: ListCreditCardInvoiceDto[] = [];
  override entities$: Observable<ListCreditCardInvoiceDto[]>;
  // override viewUrlRoute: string = '/side-nav/financial-dash/list-credit-card-expenses';
  // override addUrlRoute: string = '/side-nav/financial/add-credit-card-expenses';


  listCreditCardExpenseInvoice: CreditCardExpenseInvoiceDto[] = [];
  // getEntityTopay(entity: ListCreditCardInvoiceDto) {

  //   if (this.currentDate > entity.closingDateBusinessRule) {
  //     const invoice = this.listCreditCardExpenseInvoice.find(x => x.id == entity.id);
  //     this.pay.callRoute(this.pay.entityToPay = invoice)
  //   }
  //   else
  //     alert('Fatura ainda não fechada!')


  // }

  pay = new TriggerCreditCardsInvoices(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );


  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;

    if (this.monthFilter.id != -1)
      this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');


    if (this.monthFilter.id == -1)
      this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');
  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.current(this.entities, 0, this.pageSize, 'expires', false);
  }

  current(entities: any[], currentPage: number, pageSize: number, field: string, withPagination: boolean) {
    let result: any[] = null;

    if (withPagination) {
      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field]).getFullYear()
        && new Date(x[field]).getMonth() == this.currentDate.getMonth())
      return of(result);
    }
    else {
      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field]).getFullYear()
        && new Date(x[field]).getMonth() == this.currentDate.getMonth()

      ).slice(currentPage, pageSize)
    }
    return of(result)
  }

  onPageChange(t: any) {

  }

  getCreditCardIdOutput(creditCard: CardDto) {

    this.showDataBank = true;
    this.bankAccount = creditCard.bankAccount;
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

  months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]



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
