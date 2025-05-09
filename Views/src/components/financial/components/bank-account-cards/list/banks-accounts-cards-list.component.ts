import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { environment } from 'src/environments/environment';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { OnClickInterface } from 'src/shared/components/list-g/list/interfaces/on-click-interface';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ListControlBanksAccountsCards } from '../list/helpers/list-control-banks-accounts-cards';
import { BankAccountCardListDto } from './dto/bank-account-card-list.dto';
import { ImportsListBankAccountCards } from './imports/imports-list-bank-account-cards';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { BankAccountCardsListService } from './services/bank-account-cards-list.service';

@Component({
  selector: 'banks-accounts-cards-list',
  templateUrl: './banks-accounts-cards-list.component.html',
  styleUrls: ['./banks-accounts-cards-list.component.scss'],
  standalone: true,
  imports: [
    ImportsListBankAccountCards
  ],
  providers: [
    PtBrCurrencyPipe,
    AccountTypePipe,
    PtBrDatePipe,
    BankAccountCardsListService
  ]

})
export class BanksAccountsCardsListComponent extends ListControlBanksAccountsCards implements OnInit, OnDestroy {

  controllerUrl: string = environment._BANKSACCOUNTS.split('/')[4];

  public addUrlRoute: string = '/side-nav/financial/create-bank-account-cards';
  private viewUrlRoute: string = '/side-nav/financial/view';
  private editUrlRoute: string = '/side-nav/financial/edit-bank-account-cards';
  private bankAccountsUnsubscribe: Subscription | undefined;

  ngOnDestroy(): void {
    this.bankAccountsUnsubscribe?.unsubscribe();
  }

  ngOnInit(): void {
    this._listGDataService.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFnBankAccount`, this.companyId);
    this.bankAccountsUnsubscribe = this.startSupply(this._ptBrCurrencyPipe, this._accountTypePipe);
  }

  constructor(
    override _router: Router,
    override _http: HttpClient,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _accountTypePipe: AccountTypePipe,
    private _dialog: MatDialog
  ) {

    super(
      _router,
      _http
    )
  }

  private delete(entity: BankAccountCardListDto) {

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

      // if (result.id != null) {
      //   const deleteFake = this._listService.deleteFakeDisable(result.id);
      //   this.entities = this.entities.filter(y => y.id != result.id);

      //   this.entities$ = this.entities$.pipe(
      //     map(x => x.filter(y => y.id != result.id))
      //   )
      //   // this._communicationsAlerts.defaultSnackMsg('1', 1, null, 4);
      // }

    })
  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {
    console.log(obj)
    // ex_callRouteWithObject('/side-nav/stock-product-router/detailed-product', this.products.find(x => x.id == obj.entityId), this._router)
  }

}
