import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { YearlyFixedExpenseDto } from '../../dto/yearly-fixed-expense-dto';
import { ListGridYearlyFixedExpenseDto } from './dto/list-grid-yearly-fixed-expense-dto';
import { BackEndListFilterYearlyExpenses } from './filter-list/back-end-list-filter-yearly-expenses';
import { FrontEndListFilterYearlyExpenses } from './filter-list/front-end-list-filter-yearly-expenses';
import { ListYearlyFixedExpensesService } from './services/list-yearly-fixed-expenses.service';
import { TriggerPaymentYearly } from './trigger-payment-yearly';

@Component({
  selector: 'list-yearly-fixed-expenses',
  templateUrl: './list-yearly-fixed-expenses.component.html',
  styleUrls: ['./list-yearly-fixed-expenses.component.css'],
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
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    BtnGComponent,
    SubTitleComponent,
    FilterBtnRadioComponent
  ],
  providers: [
    ListYearlyFixedExpensesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListYearlyFixedExpensesComponent extends FrontEndListFilterYearlyExpenses implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    private _fb: FormBuilder,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListYearlyFixedExpensesService

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['',
        'Descrição',
        'Vencimento',
        'Preço',
        'Status'],
      ['description',
        'expiresView',
        'price'],
      _breakpointObserver,
      _listServices
    )
  }
  controllerUrl: string = environment._YEARLY_FIXED_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllFixedExpensesTrackingPagedAsync`;
  override  entities: ListGridYearlyFixedExpenseDto[] = [];
  override entities$: Observable<ListGridYearlyFixedExpenseDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-yearly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/yearly-fixed-expenses-add';

  // workingFrontEnd = new FrontEndListFilterYearlyExpenses();
  workingBackEnd = new BackEndListFilterYearlyExpenses();

  pay = new TriggerPaymentYearly(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  listYearlyFixedExpense: YearlyFixedExpenseDto[] = [];
  getEntityTopay(entity: ListGridYearlyFixedExpenseDto) {
    const yearlyExpense = this.listYearlyFixedExpense.find(x => x.id == entity.id);

    this.pay.entityToPay = yearlyExpense;

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

  clearSearchField = false;
  cleanRadios = false;
  filterClear() {
    this.clearSearchField = !this.clearSearchField;
    this.cleanRadios = !this.cleanRadios;
    this.filterCheckBoxSelected = null;
    this.getCurrentPagedInFrontEnd();
  }

  queryFieldOutput($event: FormControl) {
    this.entities$ = this.query($event);
  }

  getCurrentEntitiesFromBackEndPaged() {
    this.backEndUrl = `${this.controllerUrl}/GetAllYearlyFixedExpensesByCompanyId`;
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: YearlyFixedExpenseDto[]) => {
      x.forEach((xy: YearlyFixedExpenseDto) => {
        this.listYearlyFixedExpense.push(xy);
        this.entities.push(this.makeGridItems(xy));
      })
      this.entities$ = of(this.entities)
    })
  }

  getCurrentPagedInFrontEnd() {

    this.entities$ = of(this.entities)
    this.entities$.pipe(
      map(x => {
        this.gridListCommonHelper.lengthPaginator.next(x.length)
      })).subscribe();

  }

  getCurrentEntitiesFromBackEnd() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllYearlyFixedExpensesByCompanyId`, this.companyId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: YearlyFixedExpenseDto[]) => {

      x.forEach((xy: YearlyFixedExpenseDto) => {
        this.listYearlyFixedExpense.push(xy);
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }

  makeGridItems(xy: YearlyFixedExpenseDto) {
    const viewDto = new ListGridYearlyFixedExpenseDto;
    const wasPaid: Date = new Date(xy.wasPaid)
    viewDto.id = xy.id
    viewDto.start = this._ptBrDatePipe.transform(xy.start, 'Date');
    viewDto.expires = xy.expires;
    viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    viewDto.description = xy.name;
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    viewDto.wasPaid = xy.wasPaid;

    if (wasPaid.getFullYear() == this.minValue.getFullYear())
      viewDto.wasPaidView = 'Não efetuado'
    else
      viewDto.wasPaidView = this._ptBrDatePipe.transform(xy.wasPaid, 'Date');

    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    this.getCurrentEntitiesFromBackEnd();
  }

}
