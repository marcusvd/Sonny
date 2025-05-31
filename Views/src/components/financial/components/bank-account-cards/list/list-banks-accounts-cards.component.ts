import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { environment } from '../../../../../environments/environment';
import { PtBrCurrencyPipe } from '../../../../../shared/pipes/pt-br-currency.pipe';
import { ListControlBanksAccountsCards } from '../list/helpers/list-control-banks-accounts-cards';
import { ListBankAccountCardsImports, ListBankAccountCardsProviders } from './imports/list-bank-account-cards.imports';


import { ListDefaultImports, ListDefaultProviders } from '../../../../../components/imports/components-default.imports';
import { DeleteServices } from '../../../../../shared/components/delete-dialog/services/delete.services';
import { BankAccountCardsListService } from './services/bank-account-cards-list.service';
import { AccountTypePipe } from './pipes/account-type.pipe';

@Component({
  selector: 'list-banks-accounts-cards',
  templateUrl: './list-banks-accounts-cards.component.html',
  styleUrls: ['./list-banks-accounts-cards.component.scss'],
  standalone: true,
  imports: [
    ListBankAccountCardsImports,
    ListDefaultImports
  ],
  providers: [
    ListDefaultProviders,
    ListBankAccountCardsProviders
  ]

})
export class ListBanksAccountsCardsComponent extends ListControlBanksAccountsCards implements OnInit, OnDestroy {

  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];

  public addUrlRoute: string = '/financial/create-bank-account-cards';
  private viewUrlRoute: string = '/financial/view';

  private bankAccountsUnsubscribe: Subscription | undefined;

  ngOnDestroy(): void {
    this.bankAccountsUnsubscribe?.unsubscribe();
  }

  ngOnInit(): void {
    this.bankAccountsUnsubscribe = this.startSupply(`${this.controllerUrl}/GetAllFnBankAccount`, this.companyId.toString());
  }

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _deleteServices: DeleteServices,
    override _bankAccountCardsListService: BankAccountCardsListService,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _accountTypePipe: AccountTypePipe,
    private _dialog: MatDialog,
  ) {

    super(
      _router,
      _http,
      _deleteServices,
      _bankAccountCardsListService,
      _ptBrCurrencyPipe,
      _accountTypePipe,
    )
  }

  // private delete(entity: BankAccountCardListDto) {

  //   const dialogRef = this._dialog.open(DeleteDialogComponent, {
  //     width: 'auto',
  //     height: 'auto',
  //     data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.institution}` },
  //     autoFocus: true,
  //     hasBackdrop: false,
  //     disableClose: true,
  //     panelClass: 'delete-dialog-class',

  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //     // if (result.id != null) {
  //     //   const deleteFake = this._listService.deleteFakeDisable(result.id);
  //     //   this.entities = this.entities.filter(y => y.id != result.id);

  //     //   this.entities$ = this.entities$.pipe(
  //     //     map(x => x.filter(y => y.id != result.id))
  //     //   )
  //     //   // this._communicationsAlerts.defaultSnackMsg('1', 1, null, 4);
  //     // }

  //   })
  // }



}
