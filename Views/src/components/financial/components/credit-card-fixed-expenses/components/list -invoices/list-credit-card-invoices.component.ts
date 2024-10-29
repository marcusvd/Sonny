import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
// import { FinancialResolver } from 'src/shared/components/financial/resolvers/financial.resolver';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { List } from 'src/shared/components/inheritance/list/list';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
// import { MonthExpensesTrackingListFilter } from '../../common-components/static-business-rule/static-business-rule';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { ViewBankAccountComponent } from '../../../common-components/view-bank-account/view-bank-account.component';
import { CreditCardExpenseInvoiceDto } from '../../dto/credit-card-expense-invoice-dto';
import { CreditCardInvoicesMatSelectSingleComponent } from '../credit-card-invoice/credit-card-invoices-mat-select-single.component';
import { ListGridCreditCardInvoiceDto } from './dto/list-grid-credit-card-invoice-dto';
import { BackEndListFilterCreditCardInvoices } from './filter-list/back-end-list-filter-credit-card-invoices';
import { FrontEndListFilterCreditCardInvoices } from './filter-list/front-end-list-filter-credit-card-invoices';
import { ListCreditCardInvoicesService } from './services/list-credit-card-invoices.service';
import { TriggerCreditCardsInvoices } from './trigger-credit-cards-invoices';

@Component({
  selector: 'list-credit-card-invoices',
  templateUrl: './list-credit-card-invoices.component.html',
  styleUrls: ['./list-credit-card-invoices.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    BankCardNumberPipe,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    BtnGComponent,
    SubTitleComponent,
    MonthsSelectComponent,
    CreditCardInvoicesMatSelectSingleComponent,
    ViewBankAccountComponent,
  ],
  providers: [
    ListCreditCardInvoicesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListCreditCardInvoicesComponent extends List implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListCreditCardInvoicesService
  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['',
        'Descrição',
        'Compras até:',
        'Vencimento',
        'Preço',],
      ['description',
        'closingDate',
        'expirationView',
        'price'],
      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment._CREDIT_CARD_EXPENSES_INVOICES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  override  entities: ListGridCreditCardInvoiceDto[] = [];
  override entities$: Observable<ListGridCreditCardInvoiceDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/list-credit-card-expenses';
  override addUrlRoute: string = '/side-nav/financial-dash/add-credit-card-expenses';

  workingFrontEnd = new FrontEndListFilterCreditCardInvoices();
  workingBackEnd = new BackEndListFilterCreditCardInvoices();


  listCreditCardExpenseInvoice: CreditCardExpenseInvoiceDto[] = [];
  getEntityTopay(entity: ListGridCreditCardInvoiceDto) {

    if (this.currentDate > entity.closingDateBusinessRule) {
      const invoice = this.listCreditCardExpenseInvoice.find(x => x.id == entity.id);
      this.pay.callRoute(this.pay.entityToPay = invoice)
    }
    else
      alert('Fatura ainda não fechada!')


  }

  pay = new TriggerCreditCardsInvoices(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  screenFieldPosition: string = 'row';
  searchFieldMonthSelect: number = 90;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.searchFieldMonthSelect = 50;
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.searchFieldMonthSelect = 50;
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 70;
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 90;
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 90;
            break;
          }
        }
      }
    })
  }

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.selectedMonth();
    else {
      if (this.monthFilter.id != -1) {
      //  this.entities$ = this.onSelectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id, 'expiration');
        this.paginatorLength();
      }

      if (this.monthFilter.id == -1) {
       // this.entities$ = this.getByCurrentYear(this.entities, 0, this.pageSize, 'expiration');
        this.paginatorLength();
      }
    }

  }

  paginatorLength() {
    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length)
      })).subscribe();
  }

  orderBy(field: string) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else {
      if (field.toLowerCase() == 'Vencimento'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'expiration': new Date() });

      if (field.toLowerCase() == 'preço'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

      if (field.toLowerCase() == 'Compras até:'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'closingDate': new Date() });

      if (field.toLowerCase() == 'Descrição'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'expiration': new Date() });
    }

  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.workingFrontEnd.current(this.entities, 0, this.pageSize);
    this.selectedMonth(this.monthFilter)
  }

  bankAccount: BankAccountDto = null;
  showDataBank: boolean = false;

  getCreditCardIdOutput(creditCard: CardDto) {
    this.showDataBank = true;
    this.bankAccount = creditCard.bankAccount;

    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllByCardIdAsync`, creditCard.id.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseInvoiceDto[]) => {
      this.cleanGridWhenChangeCard();

      x.forEach((xy: CreditCardExpenseInvoiceDto) => {
        xy.card = creditCard;
        this.listCreditCardExpenseInvoice.push(xy);
        this.entities.push(this.makeGridItems(xy));
      })

      this.getCurrentPagedInFrontEnd();
    })
  }

  cleanGridWhenChangeCard() {
    this.entities = [];
    this.listCreditCardExpenseInvoice = [];
  }

  statusStyle: boolean[] = [];
  makeGridItems(xy: CreditCardExpenseInvoiceDto) {

    const viewDto = new ListGridCreditCardInvoiceDto;
    viewDto.id = xy.id;
    const wasPaid: Date = new Date(xy.wasPaid);
    const expires: Date = new Date(xy.expires);
    viewDto.wasPaid = xy.wasPaid;
    viewDto.userId = xy.userId.toString();

    const monthName = this.months[expires.getMonth()].name;
    viewDto.description = monthName.toUpperCase();
    viewDto.closingDate = this._ptBrDatePipe.transform(xy.closingDate, 'Date');
    viewDto.closingDateBusinessRule = new Date(xy.closingDate);
    viewDto.expiration = xy.expires;
    viewDto.expirationView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear());
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    viewDto.interest = xy.interest.toString();

    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    this.selectedMonth(this.monthFilter);
  }

}
