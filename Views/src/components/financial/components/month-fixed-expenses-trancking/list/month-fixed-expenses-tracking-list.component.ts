import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { BreakpointObserver } from '@angular/cdk/layout';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BtnAddGComponent } from 'src/shared/components/btn-add-g/btn-add-g.component';
import { BtnFilterGComponent } from 'src/shared/components/btn-filter-g/btn-filter-g.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { FinancialResolver } from 'src/shared/components/financial/resolvers/financial.resolver';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { FilterTerms } from 'src/shared/helpers/query/filter-terms';
import { OrderBy } from 'src/shared/helpers/query/order-by';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CyclePaymentPipe } from '../../common-components/pipes/cycle-payment.pipe';
import { MonthFixedExpensesTrackingDto } from '../dto/month-fixed-expenses-tracking-dto';
import { FixedExpensesTrackingListGridDto } from './dto/fixed-expenses-tracking-list-grid-dto';
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
    BtnAddGComponent,
    BtnFilterGComponent,
    MonthsSelectComponent
  ],
  providers: [
    MonthFixedExpensesTrackingListService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
    FinancialResolver,
    CyclePaymentPipe
  ]

})
export class MonthFixedExpensesTrackingListComponent extends BaseForm implements OnInit, AfterViewInit, OnChanges {
  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _listServices: MonthFixedExpensesTrackingListService,
    private _communicationsAlerts: CommunicationAlerts,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _cyclePaymentPipe: CyclePaymentPipe,
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  ngOnChanges(changes: SimpleChanges): void {
    this.entities$ = of(this.entities.filter(x => new Date(x.expiration).getMonth() == this.monthFilter.id));
  }

  pageSize: number = 20;

  headers: string[] = ['', 'Conta', 'Vencimento', 'Preço', 'Ciclo', 'Status'];



  @Input() fieldsInEnglish: string[] = ['fixedExpenses', 'expirationView', 'price', 'cycle'];

  gridListCommonHelper = new GridListCommonHelper(this._http, this._actRoute);

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

  // showHideFilter: boolean;
  // showHideFilterMtd($event: boolean) {
  //   this.showHideFilter = $event
  // }

  getIdEntity($event: { entity: FixedExpensesTrackingListGridDto, id: number, action: string }) {
    if ($event.action == 'visibility')
      this.view($event.id);

    if ($event.action == 'edit')
      this.edit($event.id);

    if ($event.action == 'delete')
      this.delete($event.entity);
  }

  add() {
    this._router.navigateByUrl('/side-nav/partner-dash/create-partner')
  }

  view(id: number) {
    this._router.navigateByUrl(`/side-nav/partner-dash/view/${id}`)
  }

  edit(id: number) {
    this._router.navigateByUrl(`/side-nav/partner-dash/edit-partner/${id}`)
  }

  delete(entity: FixedExpensesTrackingListGridDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.id != null) {
        const deleteFake = this._listServices.deleteFakeDisable(result.id);
        this.entities = this.entities.filter(y => y.id != result.id);

        this.entities$ = this.entities$.pipe(
          map(x => x.filter(y => y.id != result.id))
        )
      }

    })
  }

  toPay(entityGrid: FixedExpensesTrackingListGridDto) {
    this._router.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-to-pay/${entityGrid.id.toString()}`)
    // this._listServices.loadById$<MonthFixedExpensesTrackingDto>('MonthFixedExpensesTracking/GetFixedExpensesTrackingByIdAllIncluded', entityGrid.id.toString())
    //   .subscribe((entity:MonthFixedExpensesTrackingDto) => {
    //     const dialogRef = this._dialog.open(ExpensesToPayComponent, {
    //       width: 'auto',
    //       height: 'auto',
    //       data: { entity: entity, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Efetuar pagamento da despesa `, itemToBePay: `${entity.fixedExpenses.name}` },
    //       // data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity}` },
    //       autoFocus: true,
    //       hasBackdrop: false,
    //       disableClose: true,
    //       panelClass: 'to-pay-dialog-class',

    //     });

    //   })
  }

  backEndUrl: string = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';

  @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  @ViewChild('paginatorBelow') paginatorBelow: MatPaginator


  ngAfterViewInit(): void {

    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.paginatorAbove.page
        .pipe(
          tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, this.filterTerms))
          )).subscribe();

      this.paginatorBelow.page
        .pipe(
          tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorBelow.pageIndex + 1, this.paginatorBelow.pageSize, null, null, this.filterTerms))
          )).subscribe();
    }
  }

  onPageChange($event: PageEvent) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.onPageChangeBack($event);
    else
      this.onPageChangeFront($event);
  }

  onPageChangeBack($event: PageEvent) {
    this.paginatorAbove.pageIndex = $event.pageIndex;
    this.paginatorBelow.pageIndex = $event.pageIndex;
  }

  onPageChangeFront(event: PageEvent) {
    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    if (event.previousPageIndex < event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));

    else if (event.previousPageIndex > event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));
  }





  filterTerms: FilterTerms;
  filter(form: FormGroup) {
    // this.backEndUrl = 'TEST';
    // this.backEndUrl = 'customers/GetAllCustomersByTermSearchPagedAsync';
    const filterTerms: FilterTerms = { ...form.value };
    this.filterTerms = filterTerms;
    this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, filterTerms));
  }

  // today = new Date();

  monthFilter: MonthsDto;
  selectedMonth(month: MonthsDto) {
    this.monthFilter = month;

    if (this.monthFilter.id != -1) {
      this.entities$ = of(this.entities.filter(x => this.checkMonth(x.expiration) && this.checkYear(x.expiration)).slice(0, this.pageSize));
      this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x => this.checkMonth(x.expiration) && this.checkYear(x.expiration)).length)
    }

    if (this.monthFilter.id == -1) {
      this.entities$ = of(this.entities.filter(x =>  this.checkYear(x.expiration)).slice(0, this.pageSize));
      this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x =>  this.checkYear(x.expiration)).length)
    }
  }

  checkYear(expirationDate: Date): boolean {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return today.getFullYear() == expiration.getFullYear();
  }

  checkMonth(expirationDate: Date): boolean {
    const selectedMonth = this.monthFilter.id;
    const expiration = new Date(expirationDate);
    return selectedMonth == expiration.getMonth();
  }

  filterFrontEnd(checkbox: MatCheckboxChange) {
    if (checkbox.source.value == 'expired')
      this.expiredFilter()
    else
      this.getData();
  }

  expired: boolean = false;

  expiredFilter() {
    this.entities$ = this.entities$.pipe(map(entities => entities.filter(x => new Date(x.expiration) < new Date() && new Date(x.wasPaid).getFullYear() == this.minValue.getFullYear())))

    this.entities$.pipe(map(entities => this.gridListCommonHelper.lengthPaginator.next(entities.length))).subscribe();
  }

  isdescending = true;
  orderBy(field: string) {
    this.isdescending = !this.isdescending;
    this.backEndUrl = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
    const value = field;
    const orderBy = new OrderBy();

    switch (value) {
      case '#':
        orderBy.orderbyfield = 'Id';
        break;
      case 'Cliente':
        orderBy.orderbyfield = 'Name';
        break;
      case 'Assegurado':
        orderBy.orderbyfield = 'Assured';
        break;
      case 'Responsável':
        orderBy.orderbyfield = 'Responsible';
        break;
    }
    orderBy.isdescending = this.isdescending;
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, null, orderBy));

  }

  queryFieldOutput($event: FormControl) {
    this.paginatorBelow.pageIndex = 0;
    this.paginatorAbove.pageIndex = 0;
    this.backEndUrl = 'MonthFixedExpensesTracking/GetAllFixedExpensesTrackingPagedAsync';
    this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, $event, null));
  }

  entities: FixedExpensesTrackingListGridDto[] = [];
  entities$: Observable<FixedExpensesTrackingListGridDto[]>;

  getData() {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.getPagedBackEnd();
    else
      this.getPagedFrontEnd();
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

      this.entities$ = of(this.entities.filter(x =>  this.checkMonth(x.expiration) &&  this.checkYear(x.expiration)).slice(0, this.pageSize));
      this.gridListCommonHelper.lengthPaginator.next(this.entities.filter(x =>  this.checkMonth(x.expiration) &&  this.checkYear(x.expiration)).slice(0, this.pageSize).length)
    })
    //
  }

  minValue = new Date('0001-01-01T00:00:00');
  statusStyle: boolean[] = [];

  makeGridItems(xy: MonthFixedExpensesTrackingDto) {
    const wasPaid: Date = new Date(xy.wasPaid)

    const viewDto = new FixedExpensesTrackingListGridDto;
    viewDto.wasPaid = xy.wasPaid;

    viewDto.id = xy.id;
    // viewDto.fixedExpenses = xy.monthFixedExpenses.name.expensesName;
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
    this.screen();
    const m = new MonthsDto();
    m.id = new Date().getMonth();
    this.selectedMonth(m)
    // this.entities$ = of(this.entities.slice(0, this.pageSize).filter(h => new Date(h.expiration).getMonth() == this.monthFilter.id));
    // this._listServices.loadAll$('MonthFixedExpensesTracking/AddEssentialExpensesTest/12')
  }

}
