
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
import { CurrencyMaskModule } from 'ng2-currency-mask';


import * as cardValidator from 'card-validator';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { NgxMaskModule } from 'ngx-mask';
import { FinancialValidator } from 'src/components/financial/validators/financial-validator';
import { ValidatorMessagesFinancial } from 'src/components/financial/validators/validators-messages-financial';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { CardDto } from '../../bank-account-cards/dto/card-dto';
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
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    BankCardNumberPipe
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
    BtnGComponent,
    DescriptionFieldComponent,
    BankCardNumberPipe
  ],
  styles: [`
  dle-sphorizontal-beteween-fields {
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
        margin-top:-20px;
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

  public titleBarStyle: string = `
  background-color: rgb(16, 86, 90);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  height:35px;
  margin-top:-35px;
  margin-right:-16px;
  margin-left:-16px;
  top:18px`;

  cardNumberKeyUp(index: number) {

    this.subForm.get('flag').setValue(this?.type[index]?.card?.niceType);

    this.type[index] = cardValidator.number(this?.formMain?.get('cards')?.get(index.toString())?.get('number').value);

    this.cvcMask(index);

    this.validationCardNumber(index);
    this.enableDisableCvcField(index);
    this.numberMaskCard(this?.formMain?.get('cards')?.get(index.toString())?.get('number').value, index);
  }

  validationCardNumber(index: number) {
    this.type[index] = cardValidator.number(this?.formMain?.get('cards')?.get(index.toString())?.get('number').value);

    if (!this.type[index].isValid)
      this?.formMain?.get('cards')?.get(index.toString())?.get('number').setErrors({ 'isInvalid': true })
    else {
      this?.formMain?.get('cards')?.get(index.toString())?.get('number').setErrors(null);
      this?.formMain?.get('cards')?.get(index.toString())?.get('number').updateValueAndValidity();
    }

  }

  enableDisableCvcField(index: number) {

    if (this?.formMain?.get('cards')?.get(index.toString())?.get('number').valid)
      this?.formMain?.get('cards')?.get(index.toString())?.get('cvc').enable();
    else
      this?.formMain?.get('cards')?.get(index.toString())?.get('cvc').disable();

  }

  initEnableDisableCvcField() {
    const forms = this?.formMain?.get('cards') as FormArray;
    forms?.controls?.forEach((x, index) => {
      if (x.get('number').valid) {
        x.get('cvc').enable();
        this.cvcMask(index);
      }

    })
  }


  maskCardNumber: string = null;
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
    const value = this?.formMain?.get('cards')?.get(index.toString())?.get('number').value;

    if (value.length == 15)
      this.maskCardNumber = '0000-000000-00000';

    if (value.length == 14)
      this.maskCardNumber = '0000-000000-0000';

    if (value.length == 16)
      this.maskCardNumber = '0000-0000-0000-0000';
  }



  maskCvc: string = null;
  cvcMask(index: number) {
    const times: number = this.type[index]?.card?.code?.size;
    this.maskCvc = ("0").repeat(times);
  }

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  @Input() edit: boolean = false;
  @Input() mainIcon: string;
  @Input() mainTitle: string;
  @Input() override formMain: FormGroup;
  @Input() cards: CardDto[] = [];


  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder,
    private _bankCardNumberPipe: BankCardNumberPipe
  ) { super(_breakpointObserver) }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.edit) {
      this.addCardEdit(this.cards);
      this?.getCards?.controls?.forEach((value, index) => {

        this.validationCardNumber(index);
        this.enableDisableCvcField(index);
      })
    }
    this.initEnableDisableCvcField();
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
    return this?.formMain?.get('cards') as FormArray
  }

  cardssubFormLoad(cards?: CardDto) {
    return this.subForm = this._fb.group({
      id: [cards?.id || 0, []],
      holder: [cards?.holder || '', [Validators.required, Validators.maxLength(100)]],
      flag: [cards?.flag || '', [Validators.required, Validators.maxLength(50)]],
      type: [cards?.type, []],
      number: [cards?.number || '', []],
      cvc: new FormControl({ value: cards?.cvc || '', disabled: true }, [Validators.required]),
      validate: [cards?.validate || '', [Validators.required]],
      deleted: [cards?.deleted || false, []],
      limit: [cards?.limit || 0, [Validators.required]],
      description: [cards?.description || '', [Validators.maxLength(100)]],
    })

  }

  addCard() {
    this.getCards.push(this.cardssubFormLoad());
  }

  addCardEdit(cards: CardDto[]) {
    this.cards.forEach((x, index) => {
      this.getCards.push(this.cardssubFormLoad(x));
      this?.formMain?.get('cards')?.get(index.toString())?.get('number').setValue(this?._bankCardNumberPipe?.transform(x?.number));
    })
  }

  removeCard(index: number) {
    this.getCards.controls.forEach((value, ind) => {
      if (index == ind) {

        value.get('deleted').setValue(true);

        if (!value.valid)
          this.getCards.removeAt(index);

        if (value.valid && value.value.id == 0)
          this.getCards.removeAt(index);

      }

    })
  }

  spaceItem: number = 88;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.spaceItem = 90;

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.spaceItem = 90;


            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 93;

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 95;

            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.spaceItem = 95.5;

            break;
          }
        }
      }
    })
  }

  makeSpaceFields(form: FormGroup) {
    if ((form?.get('validate')?.hasError('required') || form?.get('validate')?.hasError('valInValid')) && form?.get('validate')?.touched
      || (form?.get('cvc')?.hasError('required') && form?.get('cvc')?.touched || (form?.get('limit')?.hasError('required') && form?.get('limit')?.touched))
    ) return true;
    else
      return false;
  }
  ngOnInit(): void {
    if (!this.edit)
      this.addCard();

    this.screen();
  }

}
