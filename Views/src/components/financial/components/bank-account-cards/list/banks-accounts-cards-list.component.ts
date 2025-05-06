import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';


import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { BankAccountDto } from '../dto/bank-account-dto';
import { BankAccountCardListDto, BankAccountCardListGridDto } from './dto/bank-account-card-list-grid.dto';
import { FrontEndFilterBanksAccountsCardsList } from './filter-list/front-end-filter-banks-accounts-cards-list';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { BankAccountCardsListService } from './services/bank-account-cards-list.service';
import { ListGComponent } from 'src/shared/components/list-g/list/list-g.component';
import { ListMobileComponent } from 'src/shared/components/list-g/list-mobile/list-mobile.component';
import { BaseList } from 'src/shared/components/list-g/extends/base-list';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { TruncatePipe } from 'src/shared/pipes/truncate.pipe';
import { ListGDataService } from 'src/shared/components/list-g/list/data/list-g-data.service';
import { OnClickInterface } from 'src/shared/components/list-g/list/interfaces/on-click-interface';
import { OrderbyInterface } from 'src/shared/components/list-g/list/interfaces/orderby-interface';


@Component({
  selector: 'banks-accounts-cards-list',
  templateUrl: './banks-accounts-cards-list.component.html',
  styleUrls: ['./banks-accounts-cards-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    RouterModule,
    ListGComponent,
    ListMobileComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
  ],
  providers: [
    PtBrCurrencyPipe,
    AccountTypePipe,
    PtBrDatePipe,
    BankAccountCardsListService
  ]

})
export class BanksAccountsCardsListComponent extends BaseList implements OnInit, OnDestroy {


  ngOnDestroy(): void {
    this.bankAccountsUnsubscribe?.unsubscribe();
  }



  constructor(
    override _router: Router,
    private _listService: BankAccountCardsListService,
    private _http: HttpClient,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _accountTypePipe: AccountTypePipe,
    // private _truncatePipe: TruncatePipe,
    private _dialog: MatDialog
  ) {

    super(
      new ListGDataService(_http),
      _router,
    )
  }

  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];
  // private backEndUrl: string = `${this.controllerUrl}/GetAllCreditCardExpensesByCompanyId`;
  private entities: BankAccountCardListGridDto[] = [];
  public entities$: Observable<BankAccountCardListDto[]>;
  private viewUrlRoute: string = '/side-nav/financial/view';
  public addUrlRoute: string = '/side-nav/financial/create-bank-account-cards';
  private editUrlRoute: string = '/side-nav/financial/edit-bank-account-cards';

  private delete(entity: BankAccountCardListGridDto) {

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
        // this._communicationsAlerts.defaultSnackMsg('1', 1, null, 4);
      }

    })
  }

  startSupply(): Subscription {

    let entities: BankAccountCardListDto[] = [];

    return this._listGDataService.entities$.subscribe(
      {
        next: (x: BankAccountDto[]) => {

          x.forEach(
            (y: BankAccountDto) => {
              this.entities$ = of(this.ex_supplyItemsGrid(entities, y, this._accountTypePipe, this._ptBrCurrencyPipe));
            })
        }
      }
    )

  }

  ex_supplyItemsGrid = (bankAccountCardList: BankAccountCardListDto[], bankAccount: BankAccountDto, _accountTypePipe?: AccountTypePipe, _ptBrCurrencyPipe?: PtBrCurrencyPipe) => {

    const items: BankAccountCardListDto = new BankAccountCardListDto();

    Object.assign(items, {

      id: {
        key: bankAccount.id.toString(),
        display: 'icons',
        icons: ['list', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: '',
        route: ''
      },

      institution: {
        key: bankAccount.institution,
        styleCell: 'width:100%;',

      },

      holder: {
        key: bankAccount.holder,
        styleCell: 'width:100%;',
      },

      account: {
        key: bankAccount.account,
        styleCell: 'width:100%;',
      },

      agency: {
        key: bankAccount.agency,
        styleCell: 'width:100%;',
      },

      type: {
        key: _accountTypePipe.transform(bankAccount.type),
        styleCell: 'width:100%;',
      },

      balance: {
        key: _ptBrCurrencyPipe.transform(bankAccount.balance),
        styleCell: 'width:100%;',
      },

      cards: {
        key: bankAccount.cards.filter(x => new Date(x.deleted).getFullYear() == this.minValue.getFullYear()).length.toString(),
        styleCell: 'width:100%;',
      },
    })

    bankAccountCardList.push(items);

    return bankAccountCardList;
  }

  bankAccountsUnsubscribe: Subscription | undefined;

  ngOnInit(): void {
    this._listGDataService.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFnBankAccount`, this.companyId);

    //subscribe entities and make grid list
    this.bankAccountsUnsubscribe = this.startSupply();
  }

  labelHeadersMiddle = () => {
    return [
      { key: '', style: 'cursor: pointer;' },
      { key: 'Banco', style: 'cursor: pointer;' },
      { key: 'Titular', style: 'cursor: pointer;' },
      { key: 'Conta', style: 'cursor: pointer;' },
      { key: 'Agencia', style: 'cursor: pointer;' },
      { key: 'Tipo', style: 'cursor: pointer;' },
      { key: 'Saldo', style: 'cursor: pointer;' },
      { key: 'Cartões', style: 'cursor: pointer;' },

    ]
  }


  fieldsHeadersMiddle = () => {
    return [
      { key: 'id', style: '' },
      { key: 'institution', style: '' },
      { key: 'holder', style: '' },
      { key: 'account', style: '' },
      { key: 'agency', style: '' },
      { key: 'type', style: '' },
      { key: 'balance', style: '' },
      { key: 'cards', style: '' },
    ]
  }

  onClickOrderByFields(field: string, entities$: Observable<BankAccountCardListDto[]>) {
    let header: OrderbyInterface = { key: '', value: '' };
    console.log(field)
    switch (field) {
      // case 'id':
      //   this.entities$ = this.orderByFrontEnd(entities$, makeHeaderToOrder(field));
      //   break;

      case 'institution':

        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' });
        break;

      case 'holder':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' });
        break;

      case 'account':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;

      case 'agency':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;

      case 'type':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' });
        break;

      case 'balance':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;

      case 'cards':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 });
        break;

      // case 'isUsed':
      //   this.entities$ = this.orderByFrontEnd(entities$, makeHeaderToOrder(field));
      //   break;

    }

  }

  onClickButton(field: string) {
    console.log(field)
  }
  onClickIcons(obj: OnClickInterface) {
    console.log(obj)

    // ex_callRouteWithObject('/side-nav/stock-product-router/detailed-product', this.products.find(x => x.id == obj.entityId), this._router)

  }

}
