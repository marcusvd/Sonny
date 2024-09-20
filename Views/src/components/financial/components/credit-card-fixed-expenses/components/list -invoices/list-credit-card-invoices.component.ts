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
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from '@angular/router';
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
import { ViewBankAccountComponent } from '../../../common-components/bank-account/view-bank-account.component';
import { FinancialSubtitleComponent } from '../../../common-components/subtitle/financial-subtitle.component';
import { CreditCardExpenseInvoiceDto } from '../../dto/credit-card-expense-invoice-dto';
import { CreditCardInvoicesMatSelectSingleComponent } from '../credit-card-invoice/credit-card-invoices-mat-select-single.component';
import { ListGridCreditCardInvoiceDto } from './dto/list-grid-credit-card-invoice-dto';
import { BackEndListFilterCreditCardInvoices } from './filter-list/back-end-list-filter-credit-card-invoices';
import { FrontEndListFilterCreditCardInvoices } from './filter-list/front-end-list-filter-credit-card-invoices';
import { PaymentCreditCardsInvoices } from './payment-credit-cards-invoices';
import { ListCreditCardInvoicesService } from './services/list-credit-card-invoices.service';


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
    FinancialSubtitleComponent
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
      ['', 'Descrição', 'Compras até:', 'Vencimento', 'Preço', 'Status'],
      ['description', 'closingDate', 'expirationView', 'price'],
      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment.CREDIT_CARD_EXPENSES_INVOICES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  override  entities: ListGridCreditCardInvoiceDto[] = [];
  override entities$: Observable<ListGridCreditCardInvoiceDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/list-credit-card-expenses';
  override addUrlRoute: string = '/side-nav/financial-dash/add-credit-card-expenses';

  workingFrontEnd = new FrontEndListFilterCreditCardInvoices();
  workingBackEnd = new BackEndListFilterCreditCardInvoices();

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.workingBackEnd.selectedMonth();
    }
    else {
      if (this.monthFilter.id != -1) {
        this.entities$ = this.workingFrontEnd.selectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }

      if (this.monthFilter.id == -1) {
        this.entities$ = this.workingFrontEnd.getAllLessThanOrEqualCurrentDate(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }
    }
  }
  pay = new PaymentCreditCardsInvoices(
    this._listServices,
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

  // @ViewChild('radioExpired') radioExpired: MatRadioButton;
  // @ViewChild('radioPedding') radioPedding: MatRadioButton;
  // @ViewChild('radioPaid') radioPaid: MatRadioButton;

  // clearRadios() {
  //   if (this.radioExpired && this.radioPedding && this.radioPaid) {
  //     this.radioExpired.checked = false;
  //     this.radioPedding.checked = false;
  //     this.radioPaid.checked = false;
  //   }
  // }

  // months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  // { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  // { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  // { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]

  // filterClear() {
  //   this.clearRadios();
  //   this.getCurrentPagedInFrontEnd();
  //   this.monthFilter = new MonthsDto();
  //   this.monthFilter.id = this.months[this.currentDate.getMonth()].id;
  //   this.monthFilter.name = this.months[this.currentDate.getMonth()].name;
  //   this.monthHideShowPendingRadio = this.monthFilter;
  // }

  // monthFilter = new MonthsDto();
  // monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  // selectedMonth(month: MonthsDto) {
  //   this.monthFilter = null;
  //   this.clearRadios();
  //   this.monthFilter = month;
  //   this.monthHideShowPendingRadio = month;
  //   if (this.gridListCommonHelper.pgIsBackEnd) {
  //     this.workingBackEnd.selectedMonth();
  //   }
  //   else {
  //     if (this.monthFilter.id != -1) {
  //       this.entities$ = this.workingFrontEnd.selectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id);

  //       this.entities$.pipe(
  //         map(x => {
  //           this.gridListCommonHelper.lengthPaginator.next(x.length)
  //         })).subscribe();
  //     }

  //     if (this.monthFilter.id == -1) {
  //       this.entities$ = this.workingFrontEnd.getAllLessThanOrEqualCurrentDate(this.entities, 0, this.pageSize);

  //       this.entities$.pipe(
  //         map(x => {
  //           this.gridListCommonHelper.lengthPaginator.next(x.length)
  //         })).subscribe();
  //     }
  //   }
  // }

  // getCreditCardIdOutput(creditCardId:number) {

  //   const result = this._listServices.getAllByCardIdAsync(creditCardId)
  //   result.subscribe(x=>console.log(x))

  // }

  // filter(checkbox: MatCheckboxChange) {
  //   if (this.gridListCommonHelper.pgIsBackEnd) {
  //     if (checkbox.source.value == 'expired') {
  //       this.workingBackEnd.isExpires()
  //     }

  //     if (checkbox.source.value == 'pending') {
  //       this.workingBackEnd.isPending()
  //     }

  //     if (checkbox.source.value == 'paid') {
  //       this.workingBackEnd.isPaid()
  //     }
  //   }
  //   else {
  //     if (checkbox.source.value == 'expired') {

  //       this.entities$ = this.workingFrontEnd.isExpires(this.entities, this.monthFilter.id, 0, this.pageSize);

  //       this.entities$.pipe(
  //         map(x => {
  //           this.gridListCommonHelper.lengthPaginator.next(x.length)
  //         })).subscribe();
  //     }

  //     if (checkbox.source.value == 'pending') {

  //       this.entities$ = this.workingFrontEnd.isPending(this.entities, this.monthFilter.id, 0, this.pageSize);

  //       this.entities$.pipe(
  //         map(x => {
  //           this.gridListCommonHelper.lengthPaginator.next(x.length)
  //         })).subscribe();

  //     }

  //     if (checkbox.source.value == 'paid') {
  //       this.entities$ = this.workingFrontEnd.isPaid(this.entities, this.monthFilter.id, 0, this.pageSize);

  //       this.entities$.pipe(
  //         map(x => {
  //           this.gridListCommonHelper.lengthPaginator.next(x.length)
  //         })).subscribe();

  //     }
  //   }

  // }

  // termSearched: string = null;
  // queryFieldOutput($event: FormControl) {
  //   this.termSearched = $event.value
  //   if (this.gridListCommonHelper.pgIsBackEnd) {
  //     this.workingBackEnd.searchField();
  //   }
  //   else {
  //     //frontEnd
  //     this.entities$ = this.workingFrontEnd.searchField(this.entities, this.monthFilter.id, 0, this.pageSize, $event.value);
  //     this.entities$.pipe(
  //       map(x => {
  //         this.gridListCommonHelper.lengthPaginator.next(x.length)
  //       })).subscribe();

  //     if ($event.value.length > 0)
  //       this.clearRadios();
  //   }
  // }

  // get pedingRadioHide() {
  //   if (this.monthHideShowPendingRadio.id == -1)
  //     return false;

  //   return this.monthHideShowPendingRadio.id < this.currentDate.getMonth();
  // }

  // orderBy(field: string) {

  //   if (this.gridListCommonHelper.pgIsBackEnd)
  //     this.workingBackEnd.orderByFrontEnd();
  //   else
  //     this.entities$ = this.workingFrontEnd.orderByFrontEnd(this.entities$, field)

  // }

  // getData() {
  //   if (this.gridListCommonHelper.pgIsBackEnd)
  //     this.getCurrentEntitiesFromBackEndPaged();
  //   else
  //     this.getCurrentEntitiesFromBackEnd();

  // }

  // getCreditCardIdOutput(creditCardId:number) {

  //   this.backEndUrl = `${this.controllerUrl}/GetAllByCardIdAsync`;
  //   this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
  //   this.gridListCommonHelper.entities$.subscribe((x: CreditCardExpenseInvoiceDto[]) => {
  //     x.forEach((xy: CreditCardExpenseInvoiceDto) => {
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.entities$ = of(this.entities)
  //   })
  // }
  // getCurrentEntitiesFromBackEndPaged() {

  //   this.backEndUrl = `${this.controllerUrl}/GetAllFixedExpensesByCompanyIdPagedAsync`;
  //   this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
  //   this.gridListCommonHelper.entities$.subscribe((x: CreditCardExpenseDto[]) => {
  //     x.forEach((xy: CreditCardExpenseDto) => {
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.entities$ = of(this.entities)
  //   })
  // }


  getCurrentPagedInFrontEnd() {

    this.entities$ = this.workingFrontEnd.current(this.entities, 0, this.pageSize)
    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length)
      })).subscribe();

  }


  bankAccount: BankAccountDto = null;
  showDataBank: boolean = false;
  getCreditCardIdOutput(creditCard: CardDto) {
    this.showDataBank = true;
    this.bankAccount = creditCard.bankAccount;
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllByCardIdAsync`, creditCard.id.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseInvoiceDto[]) => {

      this.entities = [];
      x.forEach((xy: CreditCardExpenseInvoiceDto) => {
        this.entities.push(this.makeGridItems(xy));
      })

      this.getCurrentPagedInFrontEnd();
    })
  }
  // getCurrentEntitiesFromBackEnd() {
  //   const comapanyId: number = JSON.parse(localStorage.getItem('companyId'))
  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`, comapanyId.toString());

  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseDto[]) => {

  //     x.forEach((xy: CreditCardExpenseDto) => {
  //       this.entities.push(this.makeGridItems(xy));
  //     })
  //     this.getCurrentPagedInFrontEnd();
  //   })
  // }

  statusStyle: boolean[] = [];

  makeGridItems(xy: CreditCardExpenseInvoiceDto) {

    const viewDto = new ListGridCreditCardInvoiceDto;
    viewDto.id = xy.id;
    const wasPaid: Date = new Date(xy.wasPaid);
    viewDto.wasPaid = xy.wasPaid;
    viewDto.description = xy.description;
    viewDto.closingDate = this._ptBrDatePipe.transform(xy.closingDate, 'Date');
    viewDto.expiration = xy.expires;
    viewDto.expirationView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear());
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.amountPrice);

    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    // this._actRoute.data.subscribe(x => {
    //   this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    // })
    // this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
    // this.getData();
  }

}