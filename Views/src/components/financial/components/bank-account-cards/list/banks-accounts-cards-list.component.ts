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
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { BankAccountDto } from '../dto/bank-account-dto';
import { BankAccountCardListGridDto } from './dto/bank-account-card-list-grid.dto';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { BankAccountCardsListService } from './services/bank-account-cards-list.service';

@Component({
  selector: 'banks-accounts-cards-list',
  templateUrl: './banks-accounts-cards-list.component.html',
  styleUrls: ['./banks-accounts-cards-list.component.css'],
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
  ],
  providers: [
    PtBrCurrencyPipe,
    AccountTypePipe,
    BankAccountCardsListService
  ]

})
export class BanksAccountsCardsListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _ptBrCurrency: PtBrCurrencyPipe,
    private _accountTypePipe: AccountTypePipe,
    private _communicationsAlerts: CommunicationAlerts,
    private _listService: BankAccountCardsListService,

  ) { }

  pageSize: number = 20;

  headers: string[] = ['',
  'Banco',
  'Titular',
  'Conta',
  'Agencia',
  'Tipo',
  'Saldo',
  'Cartões'];

  @Input() fieldsInEnglish: string[] = [
    'institution',
    'holder',
    'account',
    'agency',
    'type',
    'balance',
    'cards'
  ];

  gridListCommonHelper = new GridListCommonHelper(this._http, this._route);

  getIdEntity($event: { entity: BankAccountCardListGridDto, id: number, action: string }) {
    if ($event.action == 'visibility')
      this.view($event.id);

    if ($event.action == 'edit')
      this.edit($event.id);

    if ($event.action == 'delete')
      this.delete($event.entity);
  }

  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/create-bank-account-cards')
  }

  view(id: number) {
    this._router.navigateByUrl(`/side-nav/financial-dash/view/${id}`)
  }

  edit(id: number) {
    this._router.navigateByUrl(`/side-nav/financial-dash/edit-bank-account-cards/${id}`)
  }

  delete(entity: BankAccountCardListGridDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.institution}` },
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



  entities: BankAccountCardListGridDto[] = [];
  entities$: Observable<BankAccountCardListGridDto[]>;
  viewDto: BankAccountCardListGridDto;
  getData() {
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged('FnBanksAccounts/GetAllFnBankAccount', JSON.parse(localStorage.getItem('companyId')));
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: BankAccountDto[]) => {
      this.entities = [];
      x.forEach((xy: BankAccountDto) => {
        this.makeViewDto(xy);
      })
      this.entities$ = of(this.entities)
    })

  }

  makeViewDto(xy: BankAccountDto) {
    this.viewDto = new BankAccountCardListGridDto;
    this.viewDto.id = xy.id;
    this.viewDto.holder = xy.holder;
    this.viewDto.institution = xy.institution;
    this.viewDto.account = xy.account;
    this.viewDto.agency = xy.agency;
    this.viewDto.cards =xy.cards.filter(x=> x.deleted != true).length.toString();
    this.viewDto.balance = this._ptBrCurrency.transform(xy.balance);
    this.viewDto.type = this._accountTypePipe.transform(xy.type);
    this.entities.push(this.viewDto);
  }

  ngOnInit(): void {
    this.getData();
  }

}
