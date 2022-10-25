import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";

@Injectable()
export class EssentialExpensesService extends BackEndService<any, number> {

  get EssentialExpensesArray(): any[] {
    return this._essentialExpensesArray
  }

  private _essentialExpensesArray: any[] = [
  { id: 0, expense: 'ALUGUEL' },
  { id: 1, expense: 'ÁGUA' },
  { id: 2, expense: 'LUZ' },
  { id: 3, expense: 'TELEFONE' },
  { id: 4, expense: 'INTERNET' },
  { id: 5, expense: 'CONDOMÍNIO' },
  { id: 6, expense: 'GÁS' },
  { id: 7, expense: 'ALIMENTAÇÃO' },
  { id: 8, expense: 'TRANSPORTE' },
  { id: 9, expense: 'SEGUROS' },
  { id: 10, expense: 'SAÚDE' },
  { id: 11, expense: 'HIGIENE' },
  { id: 12, expense: 'IMPOSTOS' },

];

get expirationCycleArray(): any[] {
  return this._expirationCycleArray
}

private _expirationCycleArray: any[] = [
  { id: 0, expiration: 'MENSAL' },
  { id: 1, expiration: 'ANUAL' },
  { id: 2, expiration: 'DIÁRIO' },
];














  // private _cards: CardDto[] = [];
  // private _addCard: boolean = false;
  // private _today = new Date();



  constructor(
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,

    protected _Http: HttpClient
  ) { super(_Http, environment._CHEKINGACCOUNTS) }

  // get getDate(): Date {
  //   return this._today
  // }
  // get addCardBool(): boolean {
  //   return this._addCard
  // }

  // get pixArray(): any[] {
  //   return this._pixArray
  // }
  // set addCardBool(c: boolean) {
  //   this._addCard = c
  // }




  save(form: FormGroup) {
    // const toSave: CheckingAccountDto = { ... form.value};

    // this.add$<CheckingAccountDto>(toSave).subscribe((x) => {
    //   this._SnackBar.msgCenterTop(`Conta Bancaria - ${x.institution}`, 0, 5);

    // })
  }
}
