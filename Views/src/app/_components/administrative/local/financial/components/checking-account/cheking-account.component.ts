
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { CardDto } from '../card/dto/card-dto';
import { CrudCardService } from '../card/services/crud-card.service';
import { CheckingAccountDto } from './dto/checking-account-dto';
import { CrudCheckingAccount } from './services/crud-checking-account';

@Component({
  selector: 'cheking-account',
  templateUrl: './cheking-account.component.html',
  styleUrls: ['./cheking-account.component.css']
})
export class CheckingAccountComponent implements OnInit {

  public _formChekingAccount: FormGroup;
  public _cards: CardDto[] = [];
  public _addCard: boolean = false;
  public _formCard: FormGroup;
  constructor(
    private _FormBuilder: FormBuilder,
    protected _CrudCCount: CrudCheckingAccount,
    private _SnackBar: MsgOperation,
    private _CrudCard: CrudCardService,
    public _ValidationMsg: ValidatorsService,
  ) { }
  save() {
    const toSave: CheckingAccountDto = { ... this._formChekingAccount.value };
    console.log(this._formChekingAccount.value)
    this._CrudCCount.add$<CheckingAccountDto>(toSave).subscribe((x) => {
      this._SnackBar.msgCenterTop(`Conta Bancaria - ${x.institution}`, 0, 5);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formChekingAccount);
    })
  }

  get getCards(): FormArray {
    return this._formChekingAccount.get('cards') as FormArray
  }

  addCard() {
    this.getCards.push(this._cardsGroup())
  }
  removeCard() {

    this.getCards.removeAt(0)
  }

  _form() {
    return this._formChekingAccount = this._FormBuilder.group({
      institution: ['', []],
      holder: ['', []],
      agency: ['', []],
      account: ['', []],
      pix: ['', []],
      typeaccount: ['', []],
      cards: this._FormBuilder.array([]),
      description: ['', []],
    })
  }

  _cardsGroup() {
    return this._FormBuilder.group({
      holder: ['', []],
      nickname: ['', []],
      institution: ['', []],
      agency: ['', []],
      numbercard: ['', []],
      checkcode: ['', []],
      validate: ['', []],
      typeaccount: ['', []],
    })
  }


  showCard() {
    if (this._addCard) {
      this.removeCard();
    }

    if (!this._addCard) {
      this.addCard();
    }
    this._addCard = !this._addCard;
    // this.getCards.push(this._MakerValidators())

  }

  loadCards() {
    this._CrudCard.loadAll$<CardDto>().subscribe((_Cards: CardDto[]) => {

      this._cards = _Cards
      _Cards.map(console.log)


    })
  }

  ngOnInit(): void {
    this._form();
    this.loadCards();
  }

}
