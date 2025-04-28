import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormBuilder, FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { ViewBankAccountComponent } from '../../../common-components/view-bank-account/view-bank-account.component';
import { CreditCardExpenseInvoiceDto } from '../../dto/credit-card-expense-invoice-dto';
import { CreditCardInvoicesMatSelectSingleComponent } from '../credit-card-invoice/credit-card-invoices-mat-select-single.component';
import { ListGridCreditCardInvoiceDto } from './dto/list-grid-credit-card-invoice-dto';
import { FrontEndListFilterCreditCardInvoices } from './filter-list/front-end-list-filter-credit-card-invoices';
import { ListCreditCardInvoicesService } from './services/list-credit-card-invoices.service';
import { TriggerCreditCardsInvoices } from './trigger-credit-cards-invoices';

@Component({
    selector: 'list-credit-card-invoices',
    templateUrl: './list-credit-card-invoices.component.html',
    styleUrls: ['./list-credit-card-invoices.component.css'],
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
export class ListCreditCardInvoicesComponent extends FrontEndListFilterCreditCardInvoices implements OnInit, AfterViewInit {
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
        'expiresView',
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

    if (this.monthFilter.id != -1)
      this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');


    if (this.monthFilter.id == -1)
      this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'expires');
  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.current(this.entities, 0, this.pageSize, 'expires', false);
  }

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
    viewDto.expires = xy.expires;
    viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    viewDto.interest = xy.interest.toString();

    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    this.selectedMonth(this.monthFilter);
  }

}
