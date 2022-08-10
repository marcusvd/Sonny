
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { CardDto } from '../card/dto/card-dto';
import { CrudCardService } from '../card/services/crud-card.service';
import { CheckingAccountDto } from './dto/checking-account-dto';
import { CheckingAccountService } from './services/checking-account.service';

//Date

import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
// import { default as _rollupMoment, Moment } from 'moment';
import { Moment } from 'moment';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'cheking-account',
  templateUrl: './cheking-account.component.html',
  styleUrls: ['./cheking-account.component.css'],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'pt-BR',
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CheckingAccountComponent implements OnInit {


  defaultSelected = 'CEL';

  constructor(
    protected _CheckingAccountService: CheckingAccountService,
    private dateAdapter: DateAdapter<any>

  ) { }

  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  get getCards(): FormArray {
    return this._CheckingAccountService.getCards
  }
  get getDate(): Date {
    return this._CheckingAccountService.getDate
  }
  get pixArray(): any[] {
    return this._CheckingAccountService.pixArray
  }
  get form(): FormGroup {
    return this._CheckingAccountService.formGet
  }

  addCard() {
    this._CheckingAccountService.addCard();

  }
  removeCard(i: number) {

    this.getCards.removeAt(i)
  }

  // showCard() {
  //   if (this._CheckingAccountService.addCardBool) {
  //     // this.removeCard();
  //   }

  //   if (!this._CheckingAccountService.addCardBool) {
  //     this.addCard();
  //   }
  //   this._CheckingAccountService.addCardBool = !this.addCard;
  // }

  save() {
    this._CheckingAccountService.save();
  }
  // loadCards() {
  //   this._CrudCard.loadAll$<CardDto>().subscribe((_Cards: CardDto[]) => {

  //     this._cards = _Cards
  //     _Cards.map(console.log)


  //   })
  // }

  ngOnInit(): void {
    this._CheckingAccountService.formLoad();
    this.dateAdapter.setLocale('pt-BR');

  }

}
