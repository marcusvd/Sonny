

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';


import * as cardValidator from 'card-validator';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { NgxMaskModule } from 'ngx-mask';
import { CreditLimitValidator, FinancialValidator } from '../../../../../../components/financial/validators/financial-validator';
import { ValidatorMessagesFinancial } from '../../../../../../components/financial/validators/validators-messages-financial';
import { DateJustDayComponent } from '../../../../../../shared/components/date-just-day/date-just-day.component';

import { AddDefaultImports } from '../../../../../../components/imports/components-default.imports';
import { BaseForm } from '../../../../../../shared/components/inheritance/forms/base-form';
import { BankCardNumberPipe } from '../../../../../../shared/pipes/bank-card-number.pipe';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
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
  selector: 'bank-cards',
  templateUrl: './bank-cards.component.html',
  styleUrl: './bank-cards.component.scss',
  standalone: true,
  imports: [
    AddDefaultImports,
    NgxMaskModule,
    DateJustDayComponent
  ],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    BankCardNumberPipe
  ],
})


export class BankCardsComponent extends BaseForm implements OnInit, OnChanges {

  @Input() edit: boolean = false;
  @Input() mainIcon: string;
  @Input() mainTitle: string;
  @Input() override formMain: FormGroup = new FormGroup({});
  @Input() cards: CardDto[] = [];
  date = new FormControl(moment());

  type: any[] = [];
  maskCardNumber: string | null = null;
  maskCvc: string | null = null;

  typeCards: any[] = [
    { id: 0, typeCard: 'DÉBITO' },
    { id: 1, typeCard: 'CRÉDITO' },
    { id: 2, typeCard: 'CRÉDITO E DÉBITO' },
  ];

   businesslineArray: any[] = [
    { id: 6, businessLine: 'SELECIONE UMA OPÇÃO' },
    { id: 0, businessLine: 'MOTOBOY / TRANSPORTADOR' },
    { id: 1, businessLine: 'FORNECEDOR HARDWARE' },
    { id: 2, businessLine: 'REPARO ELETÔNICA GERAL' },
    { id: 3, businessLine: 'TÉCNICO DE INFORMÁTICA' },
    { id: 4, businessLine: 'REDE FÍSICA' },
    { id: 5, businessLine: 'OUTROS' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _bankCardNumberPipe: BankCardNumberPipe
  ) { super() }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.edit) {
      this.addEditCard(this.cards);
      this?.getCards?.controls?.forEach((value, index) => {
        this.validationCardNumber(index);
        this.enableDisableCvcField(index);
      })
    }
    this.initEnableDisableCvcField();
  }

  cardNumberKeyUp(index: number) {

    this.subForm.get('flag')?.setValue(this?.type[index]?.card?.niceType);

    this.type[index] = cardValidator.number(this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.value);

    this.cvcMask(index);

    this.validationCardNumber(index);
    this.enableDisableCvcField(index);
    this.numberMaskCard(this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.value, index);
  }

  validationCardNumber(index: number) {
    this.type[index] = cardValidator.number(this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.value);

    if (!this.type[index].isValid)
      this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.setErrors({ 'isInvalid': true })
    else {
      this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.setErrors(null);
      this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.updateValueAndValidity();
    }
  }

  enableDisableCvcField(index: number) {

    if (this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.valid)
      this?.formMain?.get('cards')?.get(index.toString())?.get('cvc')?.enable();
    else
      this?.formMain?.get('cards')?.get(index.toString())?.get('cvc')?.disable();

  }

  initEnableDisableCvcField() {
    const forms = this?.formMain?.get('cards') as FormArray;
    forms?.controls?.forEach((x, index) => {
      if (x.get('number')?.valid) {
        x.get('cvc')?.enable();
        this.cvcMask(index);
      }
    })
  }

  numberMaskCard(value: string, index: number) {

    if (value.length == 15 && this.type[index].isValid)
      this.maskCardNumber = '0000-000000-00000';

    else if (value.length == 14 && this.type[index].isValid)
      this.maskCardNumber = '0000-000000-0000';

    else if (value.length == 16 && this.type[index].isValid)
      this.maskCardNumber = '0000-0000-0000-0000';

    else
      this.maskCardNumber = null;
  }

  onLoadNumberMaskCard(index: number) {
    const value = this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.value;

    if (value.length == 15)
      this.maskCardNumber = '0000-000000-00000';

    if (value.length == 14)
      this.maskCardNumber = '0000-000000-0000';

    if (value.length == 16)
      this.maskCardNumber = '0000-0000-0000-0000';
  }

  cvcMask(index: number) {
    const times: number = this.type[index]?.card?.code?.size;
    this.maskCvc = ("0").repeat(times);
  }

  private valLocal = FinancialValidator;
  get validatorLocal() {
    return this.valLocal
  }

  private valMessagensFiancial = ValidatorMessagesFinancial;
  get validatorMessagesFiancial() {
    return this.valMessagensFiancial
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.subForm.get('validate')?.setValue(ctrlValue);
    this.validateValidation();
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue?.month(normalizedMonth.month());
    this.subForm.get('validate')?.setValue(ctrlValue);
    this.validateValidation();
    datepicker.close();
  }

  validateValidation() {
    if (new Date(moment.now()) > new Date(this.subForm.get('validate')?.value))
      this.subForm.get('validate')?.setErrors({ 'valInValid': true });
    else {
      this.subForm.get('validate')?.setErrors(null);
      this.subForm.get('validate')?.updateValueAndValidity();
    }
  }

  get getCards(): FormArray {
    return this?.formMain?.get('cards') as FormArray
  }

  cardsSubFormLoad(card?: CardDto) {
    return this.subForm = this._fb.group({
      id: [card?.id || 0, []],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      bankAccountId: [card?.bankAccountId ?? 0, [Validators.required]],
      holder: [card?.holder || '', [Validators.required, Validators.maxLength(100)]],
      flag: [card?.flag || '', [Validators.required, Validators.maxLength(50)]],
      type: [card?.type, [Validators.required]],
      number: [card?.number ?? '', []],
      cvc: new FormControl({ value: card?.cvc || '', disabled: true }, [Validators.required]),
      validate: [card?.validate || '', [Validators.required]],
      closingDate: [card?.closingDate || '', [Validators.required]],
      expiresDate: [card?.expiresDate || '', [Validators.required]],
      deleted: [card?.deleted ?? this.minValue, []],
      creditLimit: [card?.creditLimit || 0, [Validators.required]],
      creditCardLimitOperation: this._fb.group({
        id: [card?.creditCardLimitOperation?.id || 0, []],
        userId: [this.userId, []],
        companyId: [this.companyId, []],
        limitCreditUsed: [card?.creditCardLimitOperation?.limitCreditUsed || 0, []],
        priceOfLastPayment: [card?.creditCardLimitOperation?.priceOfLastPayment || 0, []],
        lastPayment: [card?.creditCardLimitOperation?.lastPayment || this.minValue, []],
      }),
      description: [card?.description || '', [Validators.maxLength(100)]],
    }, { validators: CreditLimitValidator() })
  }

  addCard() {
    this.getCards.push(this.cardsSubFormLoad());
  }

  addEditCard(cards: CardDto[]) {
    this.cards.forEach((x, index) => {
      this.getCards.push(this.cardsSubFormLoad(x));
      this?.formMain?.get('cards')?.get(index.toString())?.get('number')?.setValue(this?._bankCardNumberPipe?.transform(x?.number));
    })
  }

  removeCard(index: number) {
    this.getCards.controls.forEach((value, ind) => {
      if (index == ind) {

        value.get('deleted')?.setValue(true);

        if (!value.valid)
          this.getCards.removeAt(index);

        if (value.valid && value.value.id == 0)
          this.getCards.removeAt(index);

      }

    })
  }

  spaceItem: number = 88;
  // closingDate: string = '73';
  // expiresDate: string = '73';
  layoutColumnRowDateJustDay = 'column';
  spaceClosingExpires: boolean = false;

  ngOnInit(): void {
    if (!this.edit)
      this.addCard();
  }

}
