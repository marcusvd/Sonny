import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CardDto } from "../components/card/dto/card-dto";
import { CheckingAccountDto } from "../dto/checking-account-dto";

@Injectable()
export class CheckingAccountService extends BackEndService<CheckingAccountDto, number> {

  private _pixArray: any[] = [
    { id: 0, kindPix: 'CEL' },
    { id: 1, kindPix: 'E-MAIL' },
    { id: 2, kindPix: 'CPF' },
    { id: 3, kindPix: 'CNPJ' }
  ];

  get pixArray(): any[] {
    return this._pixArray
  }

  private _typeAccounts: any[] = [
    { id: 0, typeAccount: 'POUPANÇA' },
    { id: 1, typeAccount: 'CORRENTE' },
    { id: 2, typeAccount: 'SALÁRIO' },
  ];

  get typeAccounts(): any[] {
    return this._typeAccounts
  }

  private _typeCards: any[] = [
    { id: 0, typeCard: 'CRÉDITO' },
    { id: 1, typeCard: 'DÉBITO' },
    { id: 2, typeCard: 'CRÉDITO E DÉBITO' },
  ];

  get typeCards(): any[] {
    return this._typeCards
  }


  //
  private _cards: CardDto[] = [];
  private _addCard: boolean = false;
  private _today = new Date();

  constructor(
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,

    protected _Http: HttpClient
  ) { super(_Http, environment._CHEKINGACCOUNTS) }

  get getDate(): Date {
    return this._today
  }
  get addCardBool(): boolean {
    return this._addCard
  }


  set addCardBool(c: boolean) {
    this._addCard = c
  }




  save(form: FormGroup) {
    const toSave: CheckingAccountDto = { ...form.value };

    this.add$<CheckingAccountDto>(toSave).subscribe((x) => {
      this._SnackBar.msgCenterTop(`Conta Bancaria - ${x.institution}`, 0, 5);

    })
  }
}
