import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { FinancialResolver } from 'src/shared/components/financial/resolvers/financial.resolver';
import { FinancialStaticBusinessRule } from 'src/shared/components/financial/static-business-rule/static-business-rule';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { List } from 'src/shared/components/inheritance/list/list';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { MonthFixedExpensesTrackingDto } from '../dto/month-fixed-expenses-tracking-dto';
import { FormBase } from '../pay-fixed-bills/models/form-base';
import { InputField } from '../pay-fixed-bills/models/input-field';
import { FieldsScreenPayment } from './dto/fields-screen-payment';
import { MonthFixedExpensesTrackingListGridDto } from './dto/month-fixed-expenses-tracking-list-grid-dto';
import { MonthFixedExpensesTrackingListService } from './services/month-fixed-expenses-tracking-list.service';



@Component({
  selector: 'month-fixed-expenses-tracking-list',
  templateUrl: './month-fixed-expenses-tracking-list.component.html',
  styleUrls: ['./month-fixed-expenses-tracking-list.component.css'],
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
    MonthsSelectComponent
  ],
  providers: [
    MonthFixedExpensesTrackingListService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
    FinancialResolver,
  ]

})
export class MonthFixedExpensesTrackingListComponent extends List implements OnInit, AfterViewInit, OnChanges {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _communicationsAlerts: CommunicationAlerts,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: MonthFixedExpensesTrackingListService

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Descrição', 'Categoria', 'Subcategoria', 'Vencimento', 'Preço', 'Status'],
      ['description', 'category', 'subcategory', 'expirationView', 'price'],
      _breakpointObserver,
      _listServices
    )
  }


  override backEndUrl: string = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
  override  entities: MonthFixedExpensesTrackingListGridDto[] = [];
  override entities$: Observable<MonthFixedExpensesTrackingListGridDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-month-fixed-expenses-tracking';

  ngOnChanges(changes: SimpleChanges): void {
    // this.entities$ = of(this.entities.filter(x => new Date(x.expiration).getMonth() == this.monthFilter.id));
    // this.screen();
    // console.log(this.resetMonth.id)
  }

  screenFieldPosition: string = 'row';
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

  toPay(entityGrid: MonthFixedExpensesTrackingListGridDto) {

    this._listServices.loadById$<MonthFixedExpensesTrackingDto>('GetFixedExpensesTrackingByIdAllIncluded', entityGrid.id.toString())
      .subscribe((x: MonthFixedExpensesTrackingDto) => {
        this.callRoute(x);

      })


  }


  callRoute(entity: MonthFixedExpensesTrackingDto) {

    const objectRoute: NavigationExtras = {
      state: {
        entity: {
          'screenInfoFields': this.makeInfoScreenData(entity),
          form: this.dynamicForm(entity),
          urlBackend: 'MonthFixedExpensesTracking/UpdateFnFixedExpensesTracking'
        }
      }
    };

    this._router.navigate(['/side-nav/financial-dash/month-fixed-expenses-to-pay'], objectRoute);
  }

  makeInfoScreenData(entity: MonthFixedExpensesTrackingDto): FieldsScreenPayment[] {
    const obj = [
      { label: 'Descrição', value: entity.monthFixedExpenses.description, order: 2 },
      { label: 'Categoria', value: entity.monthFixedExpenses.categoryExpenses.name, order: 3 },
      { label: 'Subcategoria', value: entity.monthFixedExpenses.subcategoryExpenses.name, order: 4 },
      { label: 'Vencimento', value: this._ptBrDatePipe.transform(entity.monthFixedExpenses.expiration, 'Date'), order: 5 },
      { label: 'Valor', value: this._ptBrCurrencyPipe.transform(entity.monthFixedExpenses.price), order: 6 }
    ]
    return obj
  }

  dynamicForm(entity: MonthFixedExpensesTrackingDto) {


    const questions: FormBase<string>[] = [

      new InputField({
        key: 'id',
        // label: 'First name',
        value: entity?.id?.toString(),
        required: true,
        order: 1
      }),

      new InputField({
        key: 'companyId',
        // label: 'First name',
        value: JSON.parse(localStorage.getItem('companyId')),
        required: true,
        order: 2
      }),

      new InputField({
        key: 'userId',
        // label: 'First name',
        value: JSON.parse(localStorage.getItem('userId')),
        required: true,
        order: 3
      }),

      new InputField({
        key: 'monthFixedExpensesId',
        // label: 'First name',
        value: entity?.monthFixedExpensesId?.toString(),
        required: true,
        order: 4
      }),

      new InputField({
        key: 'bankAccountId',
        // label: 'First name',
        value: entity?.bankAccountId?.toString(),
        required: true,
        order: 5
      }),

      new InputField({
        key: 'pixId',
        // label: 'First name',
        value: entity?.pixId?.toString(),
        required: false,
        order: 6
      }),

      new InputField({
        key: 'othersPaymentMethods',
        // label: 'First name',
        value: entity?.othersPaymentMethods,
        required: false,
        order: 7
      }),

      new InputField({
        key: 'cardId',
        // label: 'First name',
        value: entity?.cardId?.toString(),
        required: false,
        order: 8
      }),

      new InputField({
        key: 'wasPaid',
        // label: 'First name',
        value: new Date().toDateString(),
        required: true,
        order: 9
      }),

      new InputField({
        key: 'expiration',
        // label: 'First name',
        value: entity?.expiration?.toString(),
        required: true,
        order: 10
      }),

      new InputField({
        key: 'price',
        label: 'Valor Despesa',
        value: entity?.price?.toString(),
        required: true,
        order: 11
      }),

      new InputField({
        key: 'interest',
        label: 'Juros',
        value: entity?.interest?.toString(),
        required: false,
        order: 12
      }),


    ];

    // return of(questions.sort((a, b) => a.order - b.order));
    return questions

  }




  // return this.formMain = this._fb.group({
  //   id: [entity.id, [Validators.required]],
  //   companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
  //   userId: [JSON.parse(localStorage.getItem('userId')), [Validators.required] || 0, []],
  //   monthFixedExpensesId: [entity?.monthFixedExpensesId, []],
  //   bankAccountId: [entity?.bankAccountId, []],
  //   pixId: [entity?.pixId || null, []],
  //   othersPaymentMethods: [entity?.othersPaymentMethods || 0, []],
  //   cardId: [entity?.cardId || null, []],
  //   wasPaid: [new Date(), []],
  //   expiration: [entity.expiration, [Validators.required]],
  //   price: [entity?.price, [Validators.required, Validators.min(1)]],
  //   interest: [entity?.interest || 0, [Validators.min(0)]],
  // })


  formLoad(entity?: MonthFixedExpensesTrackingDto) {
    return this.formMain = this._fb.group({
      id: [entity.id, [Validators.required]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      userId: [JSON.parse(localStorage.getItem('userId')), [Validators.required] || 0, []],
      monthFixedExpensesId: [entity?.monthFixedExpensesId, []],
      bankAccountId: [entity?.bankAccountId, []],
      pixId: [entity?.pixId || null, []],
      othersPaymentMethods: [entity?.othersPaymentMethods || 0, []],
      cardId: [entity?.cardId || null, []],
      wasPaid: [new Date(), []],
      expiration: [entity.expiration, [Validators.required]],
      price: [entity?.price, [Validators.required, Validators.min(1)]],
      interest: [entity?.interest || 0, [Validators.min(0)]],
    })
  }











  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  resetMonth: MonthsDto;
  clearRadios() {
    if (this.radioExpired && this.radioPedding && this.radioPaid) {
      this.radioExpired.checked = false;
      this.radioPedding.checked = false;
      this.radioPaid.checked = false;
    }
  }

  filterClear() {

    this.clearRadios();
    this.getAllLessThanOrEqualCurrentDate();

    this.resetMonth = new MonthsDto();
    this.resetMonth.id = -1;
    this.resetMonth.name = 'TODOS';
    this.monthHideShowPendingRadio = this.resetMonth;
  }

  monthFilter: MonthsDto;
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {

    this.clearRadios();
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    if (this.monthFilter.id != -1) {
      this.entities$ = of(this.entities.filter(x => this.checkMonth(x.expiration) && FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())).slice(0, this.pageSize));
      this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => this.checkMonth(x.expiration) && FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())).length)
    }

    if (this.monthFilter.id == -1)
      this.getAllLessThanOrEqualCurrentDate();

  }

  getAllLessThanOrEqualCurrentDate() {
    this.entities$ = of(this.entities.filter(x => FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())).slice(0, this.pageSize));
    this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())).length)
  }


  checkMonth(expirationDate: Date): boolean {
    const selectedMonth = this.monthFilter.id;
    const expiration = new Date(expirationDate);
    if (selectedMonth == -1)
      return true;

    return selectedMonth == expiration.getMonth();
  }

  checkExpired(x: MonthFixedExpensesTrackingListGridDto) {
    return FinancialStaticBusinessRule.isExpired(x.expiration.toString(), x.wasPaid.toString())
  }

  checkPedding(x: MonthFixedExpensesTrackingListGridDto) {
    return FinancialStaticBusinessRule.isPending(x.expiration.toString(), x.wasPaid.toString())
  }

  checkYearAndMonthIsCurrent(x: MonthFixedExpensesTrackingListGridDto) {
    return FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())
  }

  checkPaid(x: MonthFixedExpensesTrackingListGridDto) {
    return FinancialStaticBusinessRule.isPaid(x.wasPaid.toString())
  }

  filterFrontEnd(checkbox: MatCheckboxChange) {
    if (checkbox.source.value == 'expired')
      this.expiredFilter()

    if (checkbox.source.value == 'pending')
      this.pedingFilter();

    if (checkbox.source.value == 'paid')
      this.paidFilter();
  }

  expired: boolean = false;
  expiredFilter() {
    this.entities$ = of(this.entities.filter(x => this.checkExpired(x) && this.checkYearAndMonthIsCurrent(x)).slice(0, this.pageSize));
    this.entities$.pipe(map(entities => this.gridListCommonHelper.lengthPaginator.next(entities.length))).subscribe();
  }

  pedingFilter() {
    this.entities$ = of(this.entities.filter(x => this.checkPedding(x) && this.checkYearAndMonthIsCurrent(x)).slice(0, this.pageSize));
    this.entities$.pipe(map(entities => this.gridListCommonHelper.lengthPaginator.next(entities.length))).subscribe();
  }

  get pedingRadioHide() {
    if (this.monthHideShowPendingRadio.id == -1)
      return false;

    return this.monthHideShowPendingRadio.id < FinancialStaticBusinessRule.currentDate.getMonth();
  }


  paidFilter() {
    this.entities$ = of(this.entities.filter(x => this.checkPaid(x) && this.checkMonth(x.expiration) && FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())).slice(0, this.pageSize));
    this.entities$.pipe(map(entities => this.gridListCommonHelper.lengthPaginator.next(entities.length))).subscribe();
  }

  isdescending = true;
  orderBy(field: string) {

    if (this.gridListCommonHelper.pgIsBackEnd)
      this.orderByBackEnd(field);
    else
      this.orderByFrontEnd(field);

  }

  orderByBackEnd(field: string) {
    this.isdescending = !this.isdescending;
    this.backEndUrl = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
    const value = field;

    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, null, {}));
  }

  orderByFrontEnd(field: string) {
    this.isdescending = !this.isdescending;

    if (field.toLowerCase() === 'subcategoria') {
      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => x.category.localeCompare(y.category))));
    }
    if (field.toLowerCase() === 'categoria') {
      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => x.category.localeCompare(y.category))));
    }

    if (field.toLowerCase() === 'descrição') {

      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return x.description.localeCompare(field)
        else
          return y.description.localeCompare(field)
      })))

    }
    if (field.toLowerCase() === 'vencimento') {

      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.expiration).getTime() - new Date(y.expiration).getTime();
        else
          return new Date(y.expiration).getTime() - new Date(x.expiration).getTime();
      })))

    }
    if (field.toLowerCase() === 'preço') {
      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          console.log(priceX)
          return priceX - priceY;
        }
        else {
          const priceX: number = this.removeNonNumericAndConvertToNumber(x.price);
          const priceY: number = this.removeNonNumericAndConvertToNumber(y.price);
          return priceY - priceX;
        }
      })))

    }
    if (field.toLowerCase() === 'status') {
      this.entities$ = this.entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x.wasPaid).getTime() - this.minValue.getTime();
        else
          return this.minValue.getTime() - new Date(x.wasPaid).getTime();
      })))

    }

  }

  queryFieldOutput($event: FormControl) {

    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.paginatorBelow.pageIndex = 0;
      this.paginatorAbove.pageIndex = 0;
      this.backEndUrl = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
      this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, $event, null));
    }
    else {
      //frontEnd
      this.entities$ = of(this.entities.filter(x => this.queryHandledFront(x, $event.value)));
      this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => this.queryHandledFront(x, $event.value)).length)

      if ($event.value.length === 1)
        this.filterClear()
    }
  }

  queryHandledFront(x: MonthFixedExpensesTrackingListGridDto, term: string) {
    return (this.removeAccentsSpecialCharacters(x.category.toLowerCase()).includes(this.removeAccentsSpecialCharacters(term).toLowerCase()) || this.removeAccentsSpecialCharacters(x.description.toLowerCase()).includes(this.removeAccentsSpecialCharacters(term).toLowerCase())) && FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString());
  }


  getData() {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.getPagedBackEnd();
    else {
      this.getPagedFrontEnd();
    }
  }

  getPagedBackEnd() {
    this.backEndUrl = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: MonthFixedExpensesTrackingDto[]) => {
      x.forEach((xy: MonthFixedExpensesTrackingDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.entities$ = of(this.entities)
    })
  }

  getPagedFrontEnd() {

    const comapanyId: number = JSON.parse(localStorage.getItem('companyId'))
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged('MonthFixedExpensesTracking/GetAllFixedExpensesTrackingByIdCompanyAsync', comapanyId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: MonthFixedExpensesTrackingDto[]) => {

      x.forEach((xy: MonthFixedExpensesTrackingDto) => {
        this.entities.push(this.makeGridItems(xy));
      })

      this.entities$ = of(this.entities.filter(x => this.checkMonth(x.expiration) && FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())).slice(0, this.pageSize));
      this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => this.checkMonth(x.expiration) && FinancialStaticBusinessRule.checkYearAndMonthIsCurrent(x.expiration.toString())).slice(0, this.pageSize).length)
    })
    //
  }

  statusStyle: boolean[] = [];

  makeGridItems(xy: MonthFixedExpensesTrackingDto) {
    const wasPaid: Date = new Date(xy.wasPaid)
    const viewDto = new MonthFixedExpensesTrackingListGridDto;
    viewDto.wasPaid = xy.wasPaid;
    viewDto.id = xy.id;
    viewDto.category = xy.monthFixedExpenses.categoryExpenses.name.toUpperCase();
    viewDto.subcategory = xy.monthFixedExpenses.subcategoryExpenses.name.toUpperCase();
    viewDto.description = xy.monthFixedExpenses.description;
    viewDto.expiration = xy.expiration
    viewDto.expirationView = this._ptBrDatePipe.transform(xy.expiration, 'Date');
    this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear())
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);

    return viewDto;
  }

  ngOnInit(): void {
    this._actRoute.data.subscribe(x => {
      this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    })
    this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
    this.getData();

  }


}
