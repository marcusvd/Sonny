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
import { Observable, of } from 'rxjs';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CollectDeliverDto } from '../../dto/collect-deliver-dto';
import { ListGridMonthCollectDeliverDto } from './dto/list-grid-month-collect-deliver-dto';
import { FrontEndListFilterMonthCollectDeliver } from './filter-list/front-end-list-filter-month-collect-deliver';
import { ListCollectDeliverMonthService } from './services/list-collect-deliver-month.service';
import { TriggerCollectDeliverMonth } from './trigger-collect-deliver-month';


@Component({
  selector: 'list-collect-deliver-month',
  templateUrl: './list-collect-deliver-month.component.html',
  styleUrls: ['./list-collect-deliver-month.component.css'],
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
    PtBrCurrencyPipe
  ],
  providers: [
    ListCollectDeliverMonthService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListCollectDeliverMonthComponent extends FrontEndListFilterMonthCollectDeliver implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListCollectDeliverMonthService
  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Mês', 'R$ Total'],
      ['month', 'price'],
      _breakpointObserver,
      _listServices
    )

  }


  controllerUrl: string = environment._COLLECT_DELIVER.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllByCompanyIdCollectDeliverAsync`;
  override  entities: ListGridMonthCollectDeliverDto[] = [];
  override entities$: Observable<ListGridMonthCollectDeliverDto[]>;
  // override viewUrlRoute: string = '/side-nav/financial-dash/list-credit-card-expenses';
  override viewListUrlRoute: string = '/side-nav/outsourced-dash/list-collect-deliver-by-month';  
  override addUrlRoute: string = '/side-nav/outsourced-dash/add-collect-deliver';
  titleGrid = `Coletas entregas: ${this.currentDate.getFullYear()}`;

  listCreditCardExpenseInvoice: CollectDeliverDto[] = [];
  getEntityTopay(entity: ListGridMonthCollectDeliverDto) {

    // if (this.currentDate > entity.closingDateBusinessRule) {
    //   const invoice = this.listCreditCardExpenseInvoice.find(x => x.id == entity.id);
    //   this.pay.callRoute(this.pay.entityToPay = invoice)
    // }
    // else
    //   alert('Fatura ainda não fechada!')


  }

  pay = new TriggerCollectDeliverMonth(
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

  // getEntity($event : IEntityGridAction, itemWillDeleted?: string) {

  // }

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;

    if (this.monthFilter.id != -1)
      this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'start');

    if (this.monthFilter.id == -1)
      this.entities$ = this.onSelectedMonth(this.entities, this.monthFilter.id, 'start');
  }

  getCurrentPagedInFrontEnd() {
    this.entities$ = this.current(this.entities, 0, this.pageSize, 'start', false);
  }

  getData() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.backEndUrl}`, this.companyId);

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CollectDeliverDto[]) => {
      //this.cleanGridWhenChangeCard();
      this.makeGridItems(x, this.makeMonths())
       this.getCurrentPagedInFrontEnd();
    })
  }

  cleanGridWhenChangeCard() {
    this.entities = [];
    this.listCreditCardExpenseInvoice = [];
  }

  makeMonths() {
    const monthsView: ListGridMonthCollectDeliverDto[] = [];
    let viewDto: ListGridMonthCollectDeliverDto = null;

    this.months.forEach((m: MonthsDto) => {
      viewDto = new ListGridMonthCollectDeliverDto();
      if (m.name != 'TODOS') {
        viewDto.month = m.name;
        viewDto.idMonth = m.id;
        viewDto.id = m.id;
        viewDto.price = this._ptBrCurrencyPipe.transform(0);
        viewDto.start = new Date(this.currentDate.getFullYear(), m.id,1);
        monthsView.push(viewDto)
      }
    });

    return monthsView;
  }

  amountYear = 0;
  makeGridItems(entities: CollectDeliverDto[], grid: ListGridMonthCollectDeliverDto[]) {
    const itemsGrid = grid;
    const entitiesFromDb = entities;

    const currentYear = entitiesFromDb.filter(fromDb => new Date(fromDb.start).getFullYear() == this.currentDate.getFullYear());

    const comparedMonths = currentYear.filter(fromDb => itemsGrid.filter(gd => new Date(gd.idMonth).getMonth() == new Date(fromDb.start).getMonth()))

    const amountYear = currentYear.reduce((x, y) => x + y.price, 0);

    this.amountYear = amountYear;

    comparedMonths.forEach((fromDb: CollectDeliverDto) => {

      const indexGridMonth = new Date(fromDb.start).getMonth();

      if (indexGridMonth == itemsGrid[indexGridMonth].idMonth) {

        const result = itemsGrid[indexGridMonth].amountPrice += fromDb.price
        itemsGrid[indexGridMonth].price = this._ptBrCurrencyPipe.transform(result);
        itemsGrid[indexGridMonth].start = fromDb.start;
      }
    })
    this.entities = itemsGrid;

    this.entities$ = of(this.entities);
  }

  ngOnInit(): void {
    this.getData();
    this.screen();
    this.selectedMonth(this.monthFilter);
  }

}
