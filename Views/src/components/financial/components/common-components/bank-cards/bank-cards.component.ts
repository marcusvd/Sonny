
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgFor } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import * as cardValidator from 'card-validator';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BankAccountService } from 'src/components/financial/services/bank-account.service';
import { FinancialValidator } from 'src/components/financial/validators/financial-validator';
import { ValidatorMessagesFinancial } from 'src/components/financial/validators/validators-messages-financial';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BtnAddGComponent } from 'src/shared/components/btn-add-g/btn-add-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';



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
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CurrencyMaskModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    NgFor,
    NgClass,
    SubTitleComponent,
    BtnAddGComponent,
    DescriptionFieldComponent
  ],
  styles: [`
  .middle-space-horizontal-beteween-fields {
         padding-top: 20px;
      }
      .cvc-field{
        width:80px;
      }
      .validate-field{
        width:150px;
      }
      #btn-remove{
        padding-top:5px;
        color:rgb(255, 255, 255);
      }
      #card-icon{
        height: 50px; width: 50px; font-size: 50px;
      }
      .space-description{
        padding-top:50px;
      }

      .without-space-description{
        padding-top:1px;
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

  spaceItem: number = 88;
  spaceCvcField:string;
  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.spaceItem = 90;
            this.spaceCvcField = 'padding-top:25px;';
            console.log('xsmall');
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.spaceItem = 90;
            this.spaceCvcField = 'padding-top:25px;';

            console.log('small');
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 93;
            this.spaceCvcField = null;
            console.log('medium');
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 95;
            this.spaceCvcField = null;
           console.log('large');
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 95.5;
            this.spaceCvcField = null;
             console.log('xlarge');
            break;
          }
        }
      }
    })
  }


  makeSpaceFields() {

    if ((this.subForm.get('validate').hasError('required') || this.subForm.get('validate').hasError('valInValid')) && this.subForm.get('validate').touched
    || (this.subForm.get('cvc').hasError('required') && this.subForm.get('cvc').touched)

    ) return true;
    else
      return false;
  }

  ngOnInit(): void {
    this.screen();
    this.addCard();
    this.makeSpaceFields();
  }


}
