import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';


import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { List } from 'src/shared/components/inheritance/list/list';
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
    BtnGComponent,
  ],
  providers: [
    PtBrCurrencyPipe,
    AccountTypePipe,
    BankAccountCardsListService
  ]

})
export class BanksAccountsCardsListComponent extends List implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
    override _dialog: MatDialog,
    override _actRoute: ActivatedRoute,
    override _router: Router,
    override _breakpointObserver: BreakpointObserver,
    private _ptBrCurrency: PtBrCurrencyPipe,
    private _accountTypePipe: AccountTypePipe,
    private _communicationsAlerts: CommunicationAlerts,
    private _listService: BankAccountCardsListService,

  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Banco', 'Titular', 'Conta', 'Agencia', 'Tipo', 'Saldo', 'Cartões'],
      ['institution', 'holder', 'account', 'agency', 'type', 'balance', 'cards'],
      _breakpointObserver,
      _listService
    )

  }
  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  // override  entities: ListGridCreditCardExpensesDto[] = [];
  // override entities$: Observable<ListGridCreditCardExpensesDto[]>;
  override entities: BankAccountCardListGridDto[] = [];
  override entities$: Observable<BankAccountCardListGridDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view';
  override addUrlRoute: string = '/side-nav/financial-dash/create-bank-account-cards';
  override editUrlRoute: string = '/side-nav/financial-dash/edit-bank-account-cards';

 


  // @Input() fieldsInEnglish: string[] = ;

  // gridListCommonHelper = new GridListCommonHelper(this._http);

  // getIdEntity($event: { entity: BankAccountCardListGridDto, id: number, action: string }) {
  //   if ($event.action == 'visibility')
  //     this.view($event.id);

  //   if ($event.action == 'edit')
  //     this.edit($event.id);

  //   if ($event.action == 'delete')
  //     this.delete($event.entity);
  // }

  // override add() {
  //   this._router.navigateByUrl('/side-nav/financial-dash/create-bank-account-cards')
  // }

  //  view(id: number) {
  //   this._router.navigateByUrl(`/side-nav/financial-dash/view/${id}`)
  // }

  //   edit(id: number) {
  //   this._router.navigateByUrl(`/side-nav/financial-dash/edit-bank-account-cards/${id}`)
  // }

  override delete(entity: BankAccountCardListGridDto) {

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




  getData() {

    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFnBankAccount`, this.companyId);
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: BankAccountDto[]) => {
      this.entities = [];
      x.forEach((xy: BankAccountDto) => {
        this.makeViewDto(xy);
      })
      this.entities$ = of(this.entities)
    })

  }

  viewDto: BankAccountCardListGridDto;
  makeViewDto(xy: BankAccountDto) {
    this.viewDto = new BankAccountCardListGridDto;
    this.viewDto.id = xy.id;
    this.viewDto.holder = xy.holder;
    this.viewDto.institution = xy.institution;
    this.viewDto.account = xy.account;
    this.viewDto.agency = xy.agency;
    this.viewDto.cards = xy.cards.filter(x => x.deleted != true).length.toString();
    this.viewDto.balance = this._ptBrCurrency.transform(xy.balance);
    this.viewDto.type = this._accountTypePipe.transform(xy.type);
    this.entities.push(this.viewDto);
  }

  ngOnInit(): void {
    this.getData();
  }

}
