import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';


import { MatPaginatorModule } from '@angular/material/paginator';


import { BtnAddGComponent } from 'src/shared/components/btn-add-g/btn-add-g.component';
import { BtnFilterGComponent } from 'src/shared/components/btn-filter-g/btn-filter-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { BankAccountDto } from '../dto/bank-account-dto';

import { MatDialog } from '@angular/material/dialog';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { BankAccountCardListGridDto } from './dto/bank-account-card-list-grid.dto';

@Component({
  selector: 'customers-list',
  templateUrl: './banks-accounts-cards-list.component.html',
  styleUrls: ['./banks-accounts-cards-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    FlexLayoutModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnAddGComponent,
    BtnFilterGComponent,
  ],
  providers: [
    PtBrCurrencyPipe
  ]

})
export class BanksAccountsCardsListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _ptBrCurrency: PtBrCurrencyPipe,
    // private _customerServices: CustomerListService,
    private _communicationsAlerts: CommunicationAlerts,

  ) { }

  pageSize: number = 20;

  headers: string[] = ['', 'Titular', 'Banco', 'Conta', 'Agencia', 'Gerente', 'Contato gerente','Saldo','Tipo'];

  @Input() fieldsInEnglish: string[] = ['holder',
    'institution',
    'account',
    'agency',
    'managerName',
    'managerContact',
    'balance',
    'type'];

  gridListCommonHelper = new GridListCommonHelper(this._http, this._route);

  showHideFilter: boolean;

  showHideFilterMtd($event: boolean) {
    this.showHideFilter = $event
  }

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
    this._router.navigateByUrl(`/side-nav/financial-dash/edit/${id}`)
  }

  delete(entity: BankAccountCardListGridDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      // data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.name}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      // if (result.id != null) {
      //   // const deleteFake = this._customerServices.deleteFakeDisable(result.id);
      //   this.entities = this.entities.filter(y => y.id != result.id);

      //   this.entities$ = this.entities$.pipe(
      //     map(x => x.filter(y => y.id != result.id))
      //   )
      //   this._communicationsAlerts.defaultSnackMsg('1', 1);
      // }

    })
  }

  backEndUrl: string = 'FnBanksAccounts/GetAllFnBankAccount';


  entities: BankAccountCardListGridDto[] = [];
  entities$: Observable<BankAccountCardListGridDto[]>;

  getData() {

    // this.backEndUrl = 'customers/GetAllFnBankAccount';

const companyId = JSON.parse(localStorage.getItem('companyId'));
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(this.backEndUrl, companyId);
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: BankAccountDto[]) => {
      console.log(x)
      this.entities = [];
      let viewDto: BankAccountCardListGridDto;

      x.forEach((xy: BankAccountDto) => {
        viewDto = new BankAccountCardListGridDto;

        viewDto.holder = xy.holder;
        viewDto.institution = xy.institution;
        viewDto.account = xy.account;
        viewDto.agency = xy.agency;
        viewDto.managerName = xy.managerName;
        viewDto.managerContact = xy.managerContact;
        viewDto.balance = this._ptBrCurrency.transform(xy.balance);
        viewDto.type = xy.type;
        this.entities.push(viewDto);
      })

      this.entities$ = of(this.entities)
    })

  }

  ngOnInit(): void {
    this.getData();
  }

}
