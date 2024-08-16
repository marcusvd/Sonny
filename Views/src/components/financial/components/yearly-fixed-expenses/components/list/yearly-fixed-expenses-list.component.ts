import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';


import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

import { BreakpointObserver } from '@angular/cdk/layout';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { List } from 'src/shared/components/inheritance/list/list';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { YearlyFixedExpensesListGridDto } from './dto/yearly-fixed-expenses-list-grid-dto';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { YearlyFixedExpensesListService } from './services/yearly-fixed-expenses-list.service';
import { YearlyFixedExpenseDto } from '../../dto/yearly-fixed-expense-dto';


@Component({
  selector: 'yearly-fixed-expenses-list',
  templateUrl: './yearly-fixed-expenses-list.component.html',
  styleUrls: ['./yearly-fixed-expenses-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule,
    FlexLayoutModule,
    PtBrDatePipe,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
  ],
  providers: [
    PtBrDatePipe,
    AccountTypePipe,
    PtBrCurrencyPipe,
    YearlyFixedExpensesListService
  ]

})
export class YearlyFixedExpensesListComponent extends List implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _communicationsAlerts: CommunicationAlerts,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: YearlyFixedExpensesListService,

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Despesa',
        'Categoria',
        'Subcategoria',
        'Início',
        'Vencimento',
        'Valor estimado'],

      ['description',
        'category',
        'subcategory',
        'start',
        'expiration',
        'price'],
      _breakpointObserver,
      _listServices
    )
  }

  override addUrlRoute: string = '/side-nav/financial-dash/yearly-fixed-expenses-add';
  override viewUrlRoute: string = 'need to be override at the main class.';
  override editUrlRoute: string = 'need to be override at the main class.';

  getIdEntity($event: { entity: YearlyFixedExpensesListGridDto, id: number, action: string }) {
    // if ($event.action == 'visibility')
    //   this.view($event.id);

    // if ($event.action == 'edit')
    //   this.edit($event.id);

    // if ($event.action == 'delete')
    //   this.delete($event.entity);
  }

  // add() {
  //   this._router.navigateByUrl('')
  // }

  // view(id: number) {
  //   this._router.navigateByUrl(`/side-nav/financial-dash/view/${id}`)
  // }

  // edit(id: number) {
  //   this._router.navigateByUrl(`/side-nav/financial-dash/edit-bank-account-cards/${id}`)
  // }

  // delete(entity: YearlyFixedExpensesListGridDto) {

  //   const dialogRef = this._dialog.open(DeleteDialogComponent, {
  //     width: 'auto',
  //     height: 'auto',
  //     data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.name}` },
  //     autoFocus: true,
  //     hasBackdrop: false,
  //     disableClose: true,
  //     panelClass: 'delete-dialog-class',

  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result.id != null) {
  //       const deleteFake = this._listService.deleteFakeDisable(result.id);
  //       this.entities = this.entities.filter(y => y.id != result.id);

  //       this.entities$ = this.entities$.pipe(
  //         map(x => x.filter(y => y.id != result.id))
  //       )
  //       this._communicationsAlerts.defaultSnackMsg('1', 1, null, 4);
  //     }

  //   })
  // }


  viewDto: YearlyFixedExpensesListGridDto;
  getData() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged('YearlyFixedExpenses/GetAllYearlyFixedExpensesByCompanyId', JSON.parse(localStorage.getItem('companyId')));
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: YearlyFixedExpenseDto[]) => {
      this.entities = [];
      x.forEach((xy: YearlyFixedExpenseDto) => {
        this.makeViewDto(xy);
      })
      this.entities$ = of(this.entities)
    })

  }

  makeViewDto(xy: YearlyFixedExpenseDto) {

    const start:Date = new Date(xy.start);
    const expiration:Date = new Date(xy.expiration);

    this.viewDto = new YearlyFixedExpensesListGridDto;
    this.viewDto.id = xy.id;
    this.viewDto.description = xy.description;
    this.viewDto.category = xy.categoryExpenses.name;
    this.viewDto.subcategory = xy.subcategoryExpenses.name;
    this.viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);
    this.viewDto.start = this._ptBrDatePipe.transform(start, 'Date');
    this.viewDto.expiration = this._ptBrDatePipe.transform(expiration, 'Date');
    this.entities.push(this.viewDto);
  }

  ngOnInit(): void {
    this.getData();
  }

}
