import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
// import { FinancialResolver } from 'src/shared/components/financial/resolvers/financial.resolver';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
// import { MonthExpensesTrackingListFilter } from '../../common-components/static-business-rule/static-business-rule';

import { environment } from 'src/environments/environment';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { FinancialSubtitleDto } from '../../../common-components/subtitle/financial-subtitle-dto';
import { FinancialSubtitleComponent } from '../../../common-components/subtitle/financial-subtitle.component';
import { CreditCardExpenseDto } from '../../dto/credit-card-expense-dto';
import { ListGridCreditCardExpensesDto } from './dto/list-grid-credit-card-expenses-dto';
import { BackEndListFilterCreditCardExpenses } from './filter-list/back-end-list-filter-credit-card-expenses';
import { FrontEndListFilterCreditCardExpenses } from './filter-list/front-end-list-filter-credit-card-expenses';
import { PaymentMonthlyFixedExpense } from './payment-monthly-fixed-expense';
import { ListCreditCardExpensesService } from './services/list-credit-card-expenses.service';


@Component({
  selector: 'list-credit-card-expenses',
  templateUrl: './list-credit-card-expenses.component.html',
  styleUrls: ['./list-credit-card-expenses.component.css'],
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
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    BtnGComponent,
    SubTitleComponent,
    MonthsSelectComponent,
    FilterBtnRadioComponent,
    FinancialSubtitleComponent,
  ],
  providers: [
    ListCreditCardExpensesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListCreditCardExpensesComponent extends FrontEndListFilterCreditCardExpenses implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListCreditCardExpensesService

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Local Despesa', 'Dia da despesa', 'Preço', 'Parcela'],
      ['name', 'expenseDay', 'installmentPrice', 'currentInstallment'],
      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment._CREDIT_CARD_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  override  entities: ListGridCreditCardExpensesDto[] = [];
  override entities$: Observable<ListGridCreditCardExpensesDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-monthly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/add-credit-card-expenses';

  // workingFrontEnd = new FrontEndListFilterCreditCardExpenses();
  workingBackEnd = new BackEndListFilterCreditCardExpenses();

  pay = new PaymentMonthlyFixedExpense(
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



  queryFieldOutput($event: FormControl) {
    this.entities$ = this.query($event, new Date(this.entities[0].expires).getMonth());
  }



  orderBy(field: string) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else {
      if (field == 'Local Despesa')
        this.entities$ = this.orderByFrontEnd(this.entities$, { name: 'name' });

      if (field == 'Dia da despesa')
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayBusinessRule': new Date() });

      if (field == 'Preço')
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'installmentPrice': 0 });

      if (field == 'Parcela')
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'expenseDayBusinessRule': new Date() });
    }

  }



  // getCurrentPagedInFrontEnd() {

  //   const expires = new Date(this.entities[0]?.expenseDayBusinessRule).getMonth();

  //   const result: Observable<ListGridCreditCardExpensesDto[]> = this.onSelectedMonth(this.entities, this?.months[expires]?.id)
  //   this.entities$ = result;


  // //  this.paginatorLength(result);
  // }

  paginatorLength(entities: Observable<ListGridCreditCardExpensesDto[]>) {
    entities.pipe(
      map(x => this.gridListCommonHelper.lengthPaginator.next(x.length))
    ).subscribe();
  }

  statusCollection: FinancialSubtitleDto[] = [
    { id: 1, name: 'Vencida', squareBgColor: 'bg-color-expired', monthColorName: 'monthColorNameExpired', visible: false },
    { id: 2, name: 'Pendente', squareBgColor: 'bg-color-will-expire', monthColorName: 'monthColorNameExpire', visible: false },
    { id: 3, name: 'Liquidada', squareBgColor: 'bg-color-paid', monthColorName: 'monthColorNamePaid', visible: false }
  ]

  expensesMonth: string = null;
  getCurrentEntitiesFromBackEnd(credCardInvoiceId: number) {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetCreditCardExpensesByIdInvoice`, credCardInvoiceId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CreditCardExpenseDto[]) => {
    this.gridListCommonHelper.lengthPaginator.next(x.length);
      x.forEach((xy: CreditCardExpenseDto) => {

        if (x.length != 0) {
          this.entities.push(this.makeGridItems(xy));
          this.paymentStatus(x[0])
          const expires = new Date(x[0].expires).getMonth();
          this.expensesMonth = this.months[expires].name;
        }
      })
      this.entities$ = of(this.entities)
      // this.getCurrentPagedInFrontEnd();
    })


  }


  paymentStatus(creditCardExpense: CreditCardExpenseDto) {
    const expire = new Date(creditCardExpense.expires).getMonth();
    //PAID
    this.isPaid(this.entities, expire, 0, this.pageSize).subscribe(
      x => {
        if (x.length) {

          this.statusCollection.find(x => x.id == 3).visible = true;
        }
      }
    )
    //EXPIRED
    this.isExpires(this.entities, expire, 0, this.pageSize).subscribe(
      x => {
        if (x.length) {
          this.statusCollection.find(x => x.id == 1).visible = true;
        }
      }
    )
    //WILL EXPIRES
    this.isPending(this.entities, expire, 0, this.pageSize).subscribe(
      x => {
        if (x.length) {
          this.statusCollection.find(x => x.id == 2).visible = true;
        }
      }
    )

  }

  makeGridItems(xy: CreditCardExpenseDto) {
    const currentStallment = xy?.currentInstallment?.split('/');
    const wasPaid: Date = new Date(xy.wasPaid);
    const viewDto = new ListGridCreditCardExpensesDto;
    viewDto.wasPaid = xy.wasPaid;
    viewDto.id = xy.id;
    viewDto.category = xy.categoryExpense.name.toUpperCase();
    viewDto.subcategory = xy.subcategoryExpense.name.toUpperCase();
    viewDto.name = xy.name;
    viewDto.expires = xy.expires;
    viewDto.expenseDay = this._ptBrDatePipe.transform(xy.expenseDay, 'Date');
    viewDto.expenseDayBusinessRule = xy.expenseDay;
    viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    viewDto.installmentPrice = this._ptBrCurrencyPipe.transform(xy.installmentPrice);
    viewDto.currentInstallment = `${currentStallment[0]} de ${currentStallment[1]}`
    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    this.getCurrentEntitiesFromBackEnd(this._actRoute.snapshot.params['id'] as number);
  }

}
