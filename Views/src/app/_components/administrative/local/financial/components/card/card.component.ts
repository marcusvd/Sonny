import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { CardDto } from './dto/card-dto';
import { CrudCardService } from './services/crud-card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public _formCard: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder,
    protected _CrudCard: CrudCardService,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,

  ) { }

  save() {
    const recordToSave: CardDto = { ... this._formCard.value };

    this._CrudCard.add$<CardDto>(recordToSave).subscribe((x) => {
      this._SnackBar.msgCenterTop(`Cartão`, 0, 5);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formCard);
    })

  }


  _MakerValidators() {
    return this._formCard = this._FormBuilder.group({
      holder: ['', []],
      nickname:['',[]],
      institution: ['', []],
      agency: ['', []],
      numbercard: ['', []],
      checkcode: ['', []],
      validate: ['', []],
      typeaccount: ['', []],
    })
  }

  ngOnInit(): void {
    this._MakerValidators();
  }

}
