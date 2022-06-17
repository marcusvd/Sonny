import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CardDto } from "../../card/dto/card-dto";
import { CheckingAccountDto } from "../dto/checking-account-dto";

@Injectable()

export class CheckingAccountService extends BackEndService<CheckingAccountDto, number> {
  private _pixArray: any[] = [{ id: 0, kindPix: 'CEL' }, { id: 1, kindPix: 'E-MAIL' }, { id: 2, kindPix: 'CPF' }, { id: 3, kindPix: 'CNPJ' }];



  private _formChekingAccount: FormGroup;
  private _cards: CardDto[] = [];
  private _addCard: boolean = false;
  private _today = new Date();
  private _formCard: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,
    private _ValidationMsg: ValidatorsService,
    protected _Http: HttpClient
  ) { super(_Http, environment._CHEKINGACCOUNTS) }

  get getDate(): Date {
    return this._today
  }
  get addCardBool(): boolean {
    return this._addCard
  }
  get formGet(): FormGroup {
    return this._formChekingAccount
  }
  get pixArray(): any[] {
    return this._pixArray
  }
  set addCardBool(c: boolean) {
    this._addCard = c
  }
  get getCards(): FormArray {
    return this._formChekingAccount.get('cards') as FormArray
  }

  addCard() {
    this.getCards.push(this.cardsGroup())
  }
  removeCard() {
    this.getCards.removeAt(0)
  }

  formLoad() {
    return this._formChekingAccount = this._FormBuilder.group({
      institution: ['', []],
      holder: ['', []],
      agency: ['', []],
      account: ['', []],
      manager: ['', []],
      pix: ['', []],
      typeaccount: ['', []],
      cards: this._FormBuilder.array([]),
      description: ['', []],
    })
  }

  cardsGroup() {
    return this._formCard = this._FormBuilder.group({
      holder: ['', []],
      flag: ['', []],
      typeaccount: ['', []],
      numbercard: ['', []],
      checkcode: ['', []],
      description: ['', []],
      validate: ['', []],
    })
  }

  save() {
    const toSave: CheckingAccountDto = { ... this._formChekingAccount.value };
    console.log(this.formGet.value)
    this.add$<CheckingAccountDto>(toSave).subscribe((x) => {
      this._SnackBar.msgCenterTop(`Conta Bancaria - ${x.institution}`, 0, 5);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formChekingAccount);
    })
  }
}
