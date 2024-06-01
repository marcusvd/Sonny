
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgxMaskModule } from 'ngx-mask';
import { FinancialValidator } from 'src/components/financial/validators/financial-validator';
import { ValidatorMessagesFinancial } from 'src/components/financial/validators/validators-messages-financial';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BtnAddGComponent } from 'src/shared/components/btn-add-g/btn-add-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CardDto } from '../../bank-account-cards/dto/card-dto';
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
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CurrencyMaskModule,
    NgxMaskModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    NgFor,
    NgIf,
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
export class BankCardsComponent extends BaseForm implements OnInit, OnChanges {

  public type: any[] = [];
  public cardnumber: any;
  public cardnum: any = '';

  cardNumInput(value: number) {

    this.cardnum = value
    this.numberMaskCard(value);
    this.enableDisableCvcField(value);

  }

  updateCard(index: number) {

    this.subForm.get('flag').setValue(this.type[index]?.card?.niceType);

    this.cardnumber = this.cardnum.split(/[\_\s]+/ig).join('');

    this.type[index] = cardValidator.number(this.cardnumber)

    if (!this.type[index].isValid)
      this.subForm.get('number').setErrors({ 'isInvalid': true })

    else {
      this.subForm.get('number').setErrors(null)
      this.subForm.get('number').updateValueAndValidity();
    }
    this.cvcMask(index);
    //console.log(cardValidator.number(347197294224999).card)//american express
    // console.log(cardValidator.number(36347343862150).card)//dinners club

  }

  mask: string = '';
  numberMaskCard(value: any) {
    if (/^3[47]\d{0,13}$/.test(value)) { // American Express
      this.mask = '0000-000000-00000';
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) { // Diner's Club
      this.mask = '0000-000000-0000';
    } else if (/^\d{0,16}$/.test(value)) { // Other Credit Cards
      this.mask = '0000-0000-0000-0000';
    }
  }

  maskCvc: string = '';
  cvcMask(index: number) {
    // console.log(index)

    if (this.type[index]?.card?.code?.size === 3)
      this.maskCvc = '000';

    if (this.type[index]?.card?.code?.size === 4)
      this.maskCvc = '0000';


    // for (let i = 0; i < this.type[index]?.card?.code?.size; i++) {
    //   this.maskCvc += "0";
    // }
    // console.log(this.type[index]?.card?.code?.size)
    // console.log('2306-5007-4387-9500')
    // console.log(this.maskCvc)
  }


  // function validateCVV(creditCard, cvv) {
  //   // remove all non digit characters
  //   var creditCard = creditCard.replace(/\D/g, '');
  //   var cvv = cvv.replace(/\D/g, '');
  //   // american express and cvv is 4 digits
  //   if ((acceptedCreditCards.amex).test(creditCard)) {
  //     if((/^\d{4}$/).test(cvv))
  //       return true;
  //   } else if ((/^\d{3}$/).test(cvv)) { // other card & cvv is 3 digits
  //     return true;
  //   }
  //   return false;
  // }



  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  @Input() edit: boolean = false;
  @Input() override formMain: FormGroup;
  @Input() cards: CardDto[] = [];


  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder
  ) { super(_breakpointObserver) }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.edit)
      this.addCardEdit(this.cards);
  }

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
  }


  public typeCards: any[] = [
    { id: 0, typeCard: 'DÉBITO' },
    { id: 1, typeCard: 'CRÉDITO' },
    { id: 2, typeCard: 'CRÉDITO E DÉBITO' },
  ];


  // typeCards = Object.keys(TypeCardDtoEnum).filter((key: any) => !isNaN(Number(TypeCardDtoEnum[key])));

  public businesslineArray: any[] = [
    { id: 6, businessLine: 'SELECIONE UMA OPÇÃO' },
    { id: 0, businessLine: 'MOTOBOY / TRANSPORTADOR' },
    { id: 1, businessLine: 'FORNECEDOR HARDWARE' },
    { id: 2, businessLine: 'REPARO ELETÔNICA GERAL' },
    { id: 3, businessLine: 'TÉCNICO DE INFORMÁTICA' },
    { id: 4, businessLine: 'REDE FÍSICA' },
    { id: 5, businessLine: 'OUTROS' },
  ];

  get getCards(): FormArray {
    return this.formMain.get('cards') as FormArray
  }

  cardssubFormLoad(cards?: CardDto) {
    return this.subForm = this._fb.group({
      id: [cards?.id || 0, []],
      holder: [cards?.holder || '', [Validators.required, Validators.maxLength(100)]],
      flag: [cards?.flag || '', [Validators.required, Validators.maxLength(50)]],
      type: [cards?.type, []],
      number: [cards?.number || '', [Validators.required]],
      cvc: new FormControl({ value: '', disabled: true }, [Validators.required]),
      validate: [cards?.validate || '', [Validators.required]],
      limit: [cards?.limit || 0, []],
      description: [cards?.description || '', [Validators.maxLength(100)]],
    })
  }


  enableDisableCvcField(nCard: number) {

    if (cardValidator.number(nCard).isValid)
      this.subForm.get('cvc').enable();
    else
      this.subForm.get('cvc').disable();

  }

  addCard() {
    this.getCards.push(this.cardssubFormLoad());
    this.type.push(cardValidator.number(cardValidator.number(null)));
  }

  addCardEdit(cards: CardDto[]) {
    this.cards.forEach(x => {
      this.getCards.push(this.cardssubFormLoad(x));
    })
    // this.getCards.push(this.cardssubFormLoad());
    // this.type.push(cardValidator.number(cardValidator.number(null)));
  }

  removeCard() {
    this.getCards.removeAt(0)
  }


  spaceItem: number = 88;
  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.spaceItem = 90;
            // console.log('xsmall');
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.spaceItem = 90;

            // console.log('small');
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 93;
            // console.log('medium');
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 95;
            //  console.log('large');
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 95.5;
            //  console.log('xlarge');
            break;
          }
        }
      }
    })
  }

  makeSpaceFields() {

    if ((this?.subForm?.get('validate')?.hasError('required') || this?.subForm?.get('validate')?.hasError('valInValid')) && this?.subForm?.get('validate')?.touched
      || (this?.subForm?.get('cvc')?.hasError('required') && this?.subForm?.get('cvc')?.touched)

    ) return true;
    else
      return false;
  }


  ngOnInit(): void {
    this.screen();

    if (!this.edit)
      this.addCard();

    this.makeSpaceFields();

  }


}
