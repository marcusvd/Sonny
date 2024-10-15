import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { List } from 'src/shared/components/inheritance/list/list';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';


import { HtmlDataInfoDto } from '../../../common-components/screen-data-info/dtos/html-data-info-dto';
import { ScreenDataInfoComponent } from '../../../common-components/screen-data-info/screen-data-info.component';
import { FinancingAndLoanExpenseInstallmentDto } from '../../dto/financing-and-loan-expense-installment-dto';
import { ListGridFinancingsLoansExpensesInstallmentDto } from './dto/list-grid-financings-loans-expenses-installment-dto';
import { BackEndListFilterFinancingsLoansExpensesInstallment } from './filter-list/back-end-list-filter-financings-loans-expenses-installment';
import { FrontEndListFilterFinancingsLoansExpensesInstallment } from './filter-list/front-end-list-filter-financings-loans-expenses-installment';
import { ListFinancingsLoansExpensesInstallmentService } from './services/list-financings-loans-expenses-installment.service';
import { TriggerPaymentFinancingsLoansInstallment } from './trigger-payment-financings-loans-installment';


@Component({
  selector: 'list-financings-loans-expenses-installment',
  templateUrl: './list-financings-loans-expenses-installment.component.html',
  styleUrls: ['./list-financings-loans-expenses-installment.component.css'],
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
    FilterBtnRadioComponent,
    ScreenDataInfoComponent
  ],
  providers: [
    ListFinancingsLoansExpensesInstallmentService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListFinancingsLoansExpensesInstallmentComponent extends List implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListFinancingsLoansExpensesInstallmentService
  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Vencimento', 'Valor pago', 'Nº Parcelas', 'Status'],
      ['expirationView', 'priceWasPaidInstallment', 'currentInstallment'],
      // ['', 'Despesa', 'Categoria', 'Subcategoria', 'Vencimento', 'Preço', 'Status'],
      // ['name', 'category', 'subcategory', 'expirationView', 'price'],
      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment._FINANCINGS_LOANS_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/FinancingsAndLoansGetAllExpensesPagedAsync`;
  override  entities: ListGridFinancingsLoansExpensesInstallmentDto[] = [];
  override entities$: Observable<ListGridFinancingsLoansExpensesInstallmentDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-yearly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/add-financings-loans-expenses';

  workingFrontEnd = new FrontEndListFilterFinancingsLoansExpensesInstallment();
  workingBackEnd = new BackEndListFilterFinancingsLoansExpensesInstallment();

  pay = new TriggerPaymentFinancingsLoansInstallment(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );


  financingsLoansExpenses: FinancingAndLoanExpenseInstallmentDto[] = [];
  getEntityTopay(entity: FinancingAndLoanExpenseInstallmentDto) {
    const installment = this.financingsLoansExpenses.find(x => x.id == entity.id);

     this.pay.entityToPay = installment;

    this.pay.callRoute(this.pay.entityToPay);
  }

  screenFieldPosition: string = 'row';
  searchFieldYearlySelect: number = 50;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';

            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';

            break;
          }
        }
      }
    })
  }

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  clearRadios() {
    if (this.radioExpired && this.radioPedding && this.radioPaid) {
      this.radioExpired.checked = false;
      this.radioPedding.checked = false;
      this.radioPaid.checked = false;
    }
  }

  filterClear() {
    this.clearRadios();
    this.getCurrentPagedInFrontEnd();
  }

  filter(checkbox: MatCheckboxChange) {
    if (this.gridListCommonHelper.pgIsBackEnd) {
      if (checkbox.source.value == 'expired') {
        this.workingBackEnd.isExpires()
      }

      if (checkbox.source.value == 'pending') {
        this.workingBackEnd.isPending()
      }

      if (checkbox.source.value == 'paid') {
        this.workingBackEnd.isPaid()
      }
    }
    else {
      if (checkbox.source.value == 'expired') {

        // this.entities$ = this.workingFrontEnd.isExpires(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }

      if (checkbox.source.value == 'pending') {

        // this.entities$ = this.workingFrontEnd.isPending(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();

      }

      if (checkbox.source.value == 'paid') {
        // this.entities$ = this.workingFrontEnd.isPaid(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();

      }
    }

  }

  termSearched: string = null;
  queryFieldOutput($event: FormControl) {
    this.termSearched = $event.value
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.workingBackEnd.searchField();
    }
    else {
      //frontEnd
      //this.entities$ = this.workingFrontEnd.searchField(this.entities, 0, this.pageSize, $event.value);
      this.entities$.pipe(
        map(x => {
          this.gridListCommonHelper.lengthPaginator.next(x.length)
        })).subscribe();

      if ($event.value.length > 0)
        this.clearRadios();
    }
  }

  orderBy(field: string) {

    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    // else
    //   this.entities$ = this.workingFrontEnd.orderByFrontEnd(this.entities$, field)

  }

  // getData() {
  //   if (this.gridListCommonHelper.pgIsBackEnd)
  //     this.getCurrentEntitiesFromBackEndPaged();
  //   else {
  //     this.getCurrentEntitiesFromBackEnd();
  //   }
  // }

  fields: HtmlDataInfoDto[] = [];
  alreadyPaid: number = 0;
  // makeInfoScreenData(entity?: FinancingsLoansExpensesDto): FieldsScreenPayment[] {

  //   const obj = [
  //     { label: 'Descrição', value: entity?.name, order: 1 },
  //      { label: 'Parcela', value: entity?.currentInstallment, order: 2 },
  //     { label: 'Início', value: this._ptBrDatePipe.transform(entity?.start, 'Date'), order: 2 },
  //     { label: 'Fim', value: this._ptBrDatePipe.transform(entity?.end, 'Date'), order: 3 },
  //     { label: 'Liquidado', value: `${this._ptBrCurrencyPipe.transform(this.alreadyPaid)} / ${this._ptBrCurrencyPipe.transform(entity?.totalPriceToBePaid)}`, order: 5 },
  //     // { label: 'Subcategoria', value: entity?.subcategoryExpense?.name, order: 6 },
  //     { label: 'Valor financiado', value: this._ptBrCurrencyPipe.transform(entity?.totalPriceFinancingOrLoan), order: 7 },
  //     { label: 'Total a ser pago', value: this._ptBrCurrencyPipe.transform(entity?.totalPriceToBePaid), order: 8 }
  //   ]

  //   return obj
  // }



  // getCurrentEntitiesFromBackEndPaged() {
  //   this.backEndUrl = `${this.controllerUrl}/GetAllFinancingsAndLoansExpensesByCompanyId`;
  //   this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
  //   this.gridListCommonHelper.entities$.subscribe((x: FinancingsLoansExpensesDto[]) => {
  //     x.forEach((xy: FinancingsLoansExpensesDto) => {
  //       this.financingsLoansExpenses.push(xy)
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

  getCurrentEntitiesFromBackEnd(id: number) {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetInstallmentsByFinancingsAndLoansExpensesId`, id.toString());
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: FinancingAndLoanExpenseInstallmentDto[]) => {

      x.forEach((xy: FinancingAndLoanExpenseInstallmentDto) => {
        this.financingsLoansExpenses.push(xy);

        this.calcPaidOfTotalToBePaid(xy);

        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
     // this.fields = this.makeInfoScreenData(x[0]?.financingAndLoanExpense);
    })
  }



  calcPaidOfTotalToBePaid(xy: FinancingAndLoanExpenseInstallmentDto) {
    const wasPaid = new Date(xy.wasPaid);

    // if (wasPaid.getFullYear() != this.minValue.getFullYear())
    this.alreadyPaid += xy.priceWasPaidInstallment;

  }

  // statusStyle: boolean[] = [];
  makeGridItems(xy: FinancingAndLoanExpenseInstallmentDto) {
    let currentStallment: string[] = [];

    if (xy?.currentInstallment)
      currentStallment = xy.currentInstallment.split('/');

    const viewDto = new ListGridFinancingsLoansExpensesInstallmentDto;
    viewDto.id = xy.id
    viewDto.currentInstallment = `${currentStallment[0]} de ${currentStallment[1]}`
    viewDto.expirationView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    viewDto.expiration = xy.expires;
    viewDto.priceWasPaidInstallment = this._ptBrCurrencyPipe.transform(xy.priceWasPaidInstallment);
    
    viewDto.companyId = xy.companyId;
    viewDto.userId = xy.userId;
    viewDto.bankAccountId = xy.bankAccountId;
    viewDto.deleted = xy.deleted;
    viewDto.cardId = xy.cardId;
    viewDto.pixId = xy.pixId;
    viewDto.interest = xy.interest;
    viewDto.registered = xy.registered;
    viewDto.othersPaymentMethods = xy.othersPaymentMethods;
    viewDto.wasPaid = xy.wasPaid;
    viewDto.document = xy.document;
    viewDto.financingAndLoanExpense = xy.financingAndLoanExpense


console.log(xy.financingAndLoanExpense)


    
    // const wasPaid: Date = new Date(xy.wasPaid);
    //  this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear());

    return viewDto;
  }

  // calcAmount(financingsLoansExpenses: FinancingsLoansExpensesDto) {
  //   const amount = financingsLoansExpenses.installmentNumber * financingsLoansExpenses.price;

  // }



  ngOnInit(): void {

    const id = this._actRoute.snapshot.params['id'];

    this.getCurrentEntitiesFromBackEnd(id);
    // this.screen();
    // this._actRoute.data.subscribe(x => {
    //   this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    // })
    // this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
  }

}
