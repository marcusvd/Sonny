
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

//By me
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { CheckingAccountService } from '../../../services/checking-account.service';
import { ClientListService } from 'src/components/client/client-list/services/client-list.service';

//Date
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
import { BreakpointObserver } from '@angular/cdk/layout';


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
  providers: [ClientListService,
    {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR',
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CheckingAccountComponent extends BaseForm implements OnInit {

  // private _formChekingAccount: FormGroup;

  defaultSelected = 'CEL';

  constructor(
    protected _CheckingAccountService: CheckingAccountService,
    private dateAdapter: DateAdapter<any>,
    private _Fb: FormBuilder,
    override _validatorsService: ValidatorsService,
     override _breakpointObserver: BreakpointObserver,

  ) { super(_validatorsService, _breakpointObserver) }

  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  // get getCards(): FormArray {
  //   return this._CheckingAccountService.getCards
  // }
  get getDate(): Date {
    return this._CheckingAccountService.getDate
  }
  get pixArray(): any[] {
    return this._CheckingAccountService.pixArray
  }
  // get form(): FormGroup {
  //   return this.formMain
  // }

  // addCard() {
  //   this._CheckingAccountService.addCard();

  // }
  // removeCard(i: number) {

  //   this.getCards.removeAt(i)
  // }



  private _formCard: FormGroup;
  formLoad() {
    return this.formMain = this._Fb.group({
      institution: ['', []],
      holder: ['', []],
      agency: ['', []],
      account: ['', []],
      manager: ['', []],
      pix: ['', []],
      balance: ['', []],
      typeaccount: ['', []],
      cards: this._Fb.array([]),
      description: ['', []],
    })
  }

  cardsGroup() {
    return this._formCard = this._Fb.group({
      holder: ['', []],
      flag: ['', []],
      typeaccount: ['', []],
      numbercard: ['', []],
      checkcode: ['', []],
      description: ['', []],
      limit: ['', []],
      validate: ['', []],
    })
  }


  get getCards(): FormArray {
    return this.formMain.get('cards') as FormArray
  }

  addCard() {
    this.getCards.push(this.cardsGroup())
  }
  removeCard() {
    this.getCards.removeAt(0)
  }


  save() {
    this._CheckingAccountService.save(this.formMain);
  }


  ngOnInit(): void {
    this.formLoad();
    this.dateAdapter.setLocale('pt-BR');
  }

}
