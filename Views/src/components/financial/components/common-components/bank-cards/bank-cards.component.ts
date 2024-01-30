
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { BreakpointObserver } from '@angular/cdk/layout';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { FinancialValidator } from 'src/components/financial/validators/financial-validator';
import { ValidatorMessagesFinancial } from 'src/components/financial/validators/validators-messages-financial';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { BankAccountService } from 'src/components/financial/services/bank-account.service';
import * as cardValidator from 'card-validator';
import { BankAccountCardsComponent } from '../../bank-account-cards/add/bank-account-cards.component';



const moment = _moment;
//
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
  selector: 'bank-cards',
  templateUrl: './bank-cards.component.html',
  providers: [{
    // MAT_DATE_LOCALE,
    // provide: MAT_DATE_LOCALE, useValue: 'pt-BR',
    // useClass: MomentDateAdapter,
    // deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  styles: [`
      .middle-space-horizontal-beteween-fields {
         padding-top: 20px;
      }
      .cvc-field{
        width:80px;
      }
      .validate-field{
        width:100px;
      }
  `],
})
export class BankCardsComponent extends BaseForm implements OnInit {

  public type: any[] = [];
  public cardnumber: any;
  public cardnum: any = '';
  public mask = {
    mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ',
      /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  }


  cardNumInput(value: number) {

    this.cardnum = value
  }

  updateCard(index: number) {

    this.subForm.get('flag').setValue(this.type[index]?.card?.niceType);

    this.cardnumber = this.cardnum.split(/[\_\s]+/ig).join('');

    this.type[index] = cardValidator.number(this.cardnumber)

    if (!this.type[index].isValid) {
      this.subForm.get('number').setErrors({ 'isInvalid': true })
    }
    else {
      this.subForm.get('number').setErrors(null)
      this.subForm.get('number').updateValueAndValidity();
    }

  }


  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  @Input() override formMain: FormGroup;

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _bankAccountService: BankAccountService,
    private _fb: FormBuilder
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valLocal = FinancialValidator;
  get validatorLocal() {
    return this.valLocal
  }

  private valMessagensFiancial = ValidatorMessagesFinancial;
  get validatorMessagesFiancial() {
    return this.valMessagensFiancial
  }

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.subForm.get('validate').setValue(ctrlValue);
    this.validateValidation();
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.subForm.get('validate').setValue(ctrlValue);
    this.validateValidation();
    datepicker.close();
  }

  validateValidation() {
    if (new Date(moment.now()) > new Date(this.subForm.get('validate').value))
      this.subForm.get('validate').setErrors({ 'valInValid': true });
    else {
      this.subForm.get('validate').setErrors(null);
      this.subForm.get('validate').updateValueAndValidity();
    }

    console.log(this.subForm)
  }

  get typeCardArray(): any[] {
    return this._bankAccountService.typeCards
  }

  get getCards(): FormArray {
    return this.formMain.get('cards') as FormArray
  }

  cardssubFormLoad() {
    return this.subForm = this._fb.group({
      holder: ['', [Validators.required, Validators.maxLength(100)]],
      flag: ['', [Validators.required, Validators.maxLength(50)]],
      type: ['', []],
      number: ['', [Validators.required]],
      cvc: ['', [Validators.required, Validators.maxLength(10)]],
      validate: ['', [Validators.required]],
      // validate: [moment().month(1), [Validators.required]],
      limit: [0, []],
      description: ['', [Validators.maxLength(100)]],
    })
  }

  addCard() {
    this.getCards.push(this.cardssubFormLoad());
    this.type.push(cardValidator.number(cardValidator.number(null)));

  }

  removeCard() {
    this.getCards.removeAt(0)
  }

  maskCvc: string = null;
  cvcMask(index: number) {

    this.maskCvc = '';

    for (let i = 0; i < this.type[index]?.card?.code?.size; i++) {
      this.maskCvc += "0";
    }

    return this.maskCvc;
  }

  cardNumMask: string = null;
  cardNumberMask(index: number) {

    this.cardNumMask = '';

    for (let i = 0; i < this.type[index]?.card?.lengths[index] / 4; i++) {
      this.cardNumMask += "0000 ";
    }

    return this.cardNumMask.trim();
  }

  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.screen();

  }


}
