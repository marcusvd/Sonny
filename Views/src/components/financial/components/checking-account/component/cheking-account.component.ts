
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';

//By me
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { CheckingAccountService } from '../../../services/checking-account.service';

//Date
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';

import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';

import { FinancialValidator } from 'src/components/financial/validators/financial-validator';
import { ValidatorMessagesFinancial } from 'src/components/financial/validators/validators-messages-financial';
import { CustomerListService } from 'src/components/main/customer/components/services/customer-list.service';


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
  selector: 'cheking-account',
  templateUrl: './cheking-account.component.html',
  styleUrls: ['./cheking-account.component.css'],
  providers: [CustomerListService,
    {
      // MAT_DATE_LOCALE,
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR',
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ]
})
export class CheckingAccountComponent extends BaseForm implements OnInit {

  agencyAccountTypeaccountCols: number;
  agencyAccountTypeaccountRowHeight: string = '120px';

  holderInstitutionCols: number;
  holderInstitutionRowHeight: string = '120px';

  textCols: number;
  managerRowHeight: string = '120px';

  pixCols: number;
  pixRowHeight: string = '120px';

  flagTypeaccountCols: number;
  flagTypeaccountRowHeight: string = '120px';

  numbercardCheckcodeValidateCols: number;
  numbercardCheckcodeValidateRowHeight: string = '120px';

  cardsRemoveCols: number;
  cardsRemoveRowHeight: string = '80px';

  constructor(
    protected _CheckingAccountService: CheckingAccountService,
   // private dateAdapter: DateAdapter<any>,
    private _Fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  // selectValidator(value: string) {
  //   this.validatorCustom.selectValidator(this.subForm, value, '!=', 'débito', ['number', 'checkCode', 'validate', 'limit', 'flag'])
  // }
  // (selectionChange)="selectValidator($event.value)"

  private valLocal = FinancialValidator;
  get validatorLocal() {
    return this.valLocal
  }

  private valMessagensFiancial = ValidatorMessagesFinancial;
  get validatorMessagesFiancial() {
    return this.valMessagensFiancial
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.agencyAccountTypeaccountCols = 1;

            this.holderInstitutionCols = 1;

            this.pixCols = 1;

            this.textCols = 1;

            this.flagTypeaccountCols = 1;

            this.numbercardCheckcodeValidateCols = 1;

            this.cardsRemoveCols = 1;

            break;
          }
          case 'small': {
            this.agencyAccountTypeaccountCols = 1;

            this.holderInstitutionCols = 1;

            this.pixCols = 1;

            this.textCols = 1;

            this.flagTypeaccountCols = 1;

            this.numbercardCheckcodeValidateCols = 1;

            this.cardsRemoveCols = 1;
            break;
          }
          case 'medium': {
            this.agencyAccountTypeaccountCols = 3;

            this.holderInstitutionCols = 2;

            this.pixCols = 2;

            this.textCols = 2;

            this.flagTypeaccountCols = 2;

            this.numbercardCheckcodeValidateCols = 2;

            this.cardsRemoveCols = 2;
            break;
          }
          case 'large': {
            this.agencyAccountTypeaccountCols = 3;

            this.holderInstitutionCols = 2;

            this.pixCols = 2;

            this.textCols = 2;

            this.flagTypeaccountCols = 2;

            this.numbercardCheckcodeValidateCols = 3;

            this.cardsRemoveCols = 2;
            break;
          }
          case 'xlarge': {
            this.agencyAccountTypeaccountCols = 3;

            this.holderInstitutionCols = 2;

            this.pixCols = 2;

            this.textCols = 2;

            this.flagTypeaccountCols = 2;

            this.numbercardCheckcodeValidateCols = 3;

            this.cardsRemoveCols = 2;
            break;
          }
        }
      }
    })




  }

  date = new UntypedFormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  get getDate(): Date {
    return this._CheckingAccountService.getDate
  }

  get pixArray(): any[] {
    return this._CheckingAccountService.pixArray
  }

  get typeAccountsArray(): any[] {
    return this._CheckingAccountService.typeAccounts
  }

  get typeCardArray(): any[] {
    return this._CheckingAccountService.typeCards
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

    if (this.alertSave(this.formMain)) {
      this._CheckingAccountService.save(this.formMain);
      this.formLoad();
    }

  }

  formLoad() {
    return this.formMain = this._Fb.group({
      holder: ['', [Validators.required, Validators.maxLength(100)]],
      institution: ['', [Validators.required, Validators.maxLength(100)]],
      agency: ['', [Validators.required, Validators.maxLength(20)]],
      managerName: ['', [Validators.maxLength(50)]],
      managerContact: ['', [Validators.maxLength(100)]],
      account: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['CORRENTE', [Validators.required]],
      pix: ['CEL', [Validators.maxLength(100)]],
      balance: ['', [Validators.required]],
      cards: this._Fb.array([]),
      description: ['', [Validators.maxLength(100)]],
    })
  }

  cardsGroup() {
    return this.subForm = this._Fb.group({
      holder: ['', [Validators.required, Validators.maxLength(100)]],
      flag: ['', [Validators.required, Validators.maxLength(50)]],
      type: ['DÉBITO', []],
      number: ['', [Validators.required, Validators.maxLength(20)]],
      checkCode: ['', [Validators.required, Validators.maxLength(10)]],
      validate: [moment(), [Validators.required]],
      limit: [0, []],
      description: ['', [Validators.maxLength(100)]],
    })
  }

  ngOnInit(): void {
    this.screen();
    this.formLoad();
    //this.dateAdapter.setLocale('pt-BR');
  }

}
