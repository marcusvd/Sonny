import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { BankAccountDto } from "../../dto/bank-account-dto";


@Injectable()
export class BankAccountAddService extends BackEndService<BankAccountDto> {

  constructor(
    private _communicationsAlerts: CommunicationAlerts,
    override _http: HttpClient,
    private _route: Router,
  ) { super(_http, environment._BANKSACCOUNTS) }

  // private _typeAccounts: any[] = [
  //   { id: 0, typeAccount: 'POUPANÇA' },
  //   { id: 1, typeAccount: 'CORRENTE' },
  // ];

  // get typeAccounts(): any[] {
  //   return this._typeAccounts
  // }

  // private _typeCards: any[] = [
  //   { id: 0, typeCard: 'CRÉDITO' },
  //   { id: 1, typeCard: 'DÉBITO' },
  //   { id: 2, typeCard: 'CRÉDITO E DÉBITO' },
  // ];

  // get typeCards(): any[] {
  //   return this._typeCards
  // }

  // private _cards: FinancialCardDto[] = [];
  // private _addCard: boolean = false;
  // private _today = new Date();


  // get getDate(): Date {
  //   return this._today
  // }
  // get addCardBool(): boolean {
  //   return this._addCard
  // }

  // set addCardBool(c: boolean) {
  //   this._addCard = c
  // }

  save(form: FormGroup) {

    const toSave: BankAccountDto = { ...form.value };

    // toSave.cards.forEach(x => {
    //   switch (x.type.toString()) {
    //     case 'DÉBITO': {
    //       x.type = 0;
    //       break;
    //     }
    //     case 'CRÉDITO': {
    //       x.type = 1;
    //       break;
    //     }
    //     case 'CRÉDITO E DÉBITO': {
    //       x.type = 2;
    //       break;
    //     }
    //   }
    // })

    // if (toSave.type.toString() == 'CORRENTE')
    //   toSave.type = 0;
    // else
    //   toSave.type = 1;

    // companyId: number = JSON.parse(localStorage.getItem('companyId'));

    this.add$<BankAccountDto>(toSave, 'AddABankAccount').subscribe({
      next: (checkingAccountDto: BankAccountDto) => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
         this._route.navigateByUrl(`/side-nav/financial-dash/list-bank-account-cards`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }
}
