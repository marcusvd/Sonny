import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';


import { map } from 'rxjs/operators';
import { BtnAddGComponent } from 'src/shared/components/btn-add-g/btn-add-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FixedExpensesDto } from '../../dto/fixed-expenses-dto';
import { FixedExpensesListGridDto } from './dto/fixed-expenses-list-grid-dto';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { FixedExpensesListService } from './services/fixed-expenses-list.service';

@Component({
  selector: 'fixed-expenses-list',
  templateUrl: './fixed-expenses-list.component.html',
  styleUrls: ['./fixed-expenses-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule,
    FlexLayoutModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnAddGComponent,
    PtBrDatePipe
  ],
  providers: [
    PtBrDatePipe,
    AccountTypePipe,
    FixedExpensesListService
  ]

})
export class FixedExpensesListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _accountTypePipe: AccountTypePipe,
    private _communicationsAlerts: CommunicationAlerts,
    private _listService: FixedExpensesListService,

  ) { }

  pageSize: number = 20;

  headers: string[] = ['',
    'Nome',
    'Vencimento',
    // 'Prestações',
    'Ciclo de pagamento',
  ];

  @Input() fieldsInEnglish: string[] = [
    'name',
    'expiration',
    // 'numberInstallment',
    'cyclePayment'
  ];

  gridListCommonHelper = new GridListCommonHelper(this._http, this._route);

  getIdEntity($event: { entity: FixedExpensesListGridDto, id: number, action: string }) {
    if ($event.action == 'visibility')
      this.view($event.id);

    if ($event.action == 'edit')
      this.edit($event.id);

    if ($event.action == 'delete')
      this.delete($event.entity);
  }

  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/fixed-expenses-add')
  }

  view(id: number) {
    this._router.navigateByUrl(`/side-nav/financial-dash/view/${id}`)
  }

  edit(id: number) {
    this._router.navigateByUrl(`/side-nav/financial-dash/edit-bank-account-cards/${id}`)
  }

  delete(entity: FixedExpensesListGridDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.name}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.id != null) {
        const deleteFake = this._listService.deleteFakeDisable(result.id);
        this.entities = this.entities.filter(y => y.id != result.id);

        this.entities$ = this.entities$.pipe(
          map(x => x.filter(y => y.id != result.id))
        )
        this._communicationsAlerts.defaultSnackMsg('1', 1, null, 4);
      }

    })
  }



  entities: FixedExpensesListGridDto[] = [];
  entities$: Observable<FixedExpensesListGridDto[]>;
  viewDto: FixedExpensesListGridDto;
  getData() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged('FnFixedExpenses/GetAllFixedExpensesByCompanyId', JSON.parse(localStorage.getItem('companyId')));
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: FixedExpensesDto[]) => {
      this.entities = [];
      x.forEach((xy: FixedExpensesDto) => {
        this.makeViewDto(xy);
      })
      this.entities$ = of(this.entities)
    })

  }


  cyclePayment(value: number) {

    switch (value) {
      case 0: {
        return 'DIÁRIO';
        break;
      }
      case 1: {
        return 'MENSAL';
        break;
      }
      case 2: {
        return 'ANUAL';
        break;
      }
    }
    return 'error'
  }

  makeViewDto(xy: FixedExpensesDto) {
    this.viewDto = new FixedExpensesListGridDto;
    this.viewDto.id = xy.id;
    this.viewDto.name = xy.name;
    this.viewDto.expiration = this._ptBrDatePipe.transform(xy.expiration, 'Date');
    // this.viewDto.numberInstallment = xy.numberInstallment;
    this.viewDto.cyclePayment = this.cyclePayment(xy.cyclePayment);

    // this.viewDto.cards = xy.cards.length.toString();
    // this.viewDto.balance = this._ptBrCurrency.transform(xy.balance);
    // this.viewDto.type = this._accountTypePipe.transform(xy.type);
    this.entities.push(this.viewDto);
  }

  ngOnInit(): void {
    this.getData();
  }

}
