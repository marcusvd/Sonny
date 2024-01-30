
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';


//By me
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BankAccountService } from '../../../services/bank-account.service';

//Date
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
// import * as _moment from 'moment';
// import { Moment } from 'moment';

import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';

import { FinancialValidator } from 'src/components/financial/validators/financial-validator';
import { ValidatorMessagesFinancial } from 'src/components/financial/validators/validators-messages-financial';
import { CustomerListService } from 'src/components/main/customer/components/services/customer-list.service';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';


// const moment = _moment;
// //
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'bank-account-cards',
  templateUrl: './bank-account-cards.component.html',
  styleUrls: ['./bank-account-cards.component.css'],
  // providers: [ {
  //     // MAT_DATE_LOCALE,
  //     // provide: MAT_DATE_LOCALE, useValue: 'pt-BR',
  //     // useClass: MomentDateAdapter,
  //     // deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  // ]
})
export class BankAccountCardsComponent extends BaseForm implements OnInit {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'row';

  constructor(
    protected _bankAccountService: BankAccountService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  // selectValidator(value: string) {
  //   this.validatorCustom.selectValidator(this.subForm, value, '!=', 'débito', ['number', 'checkCode', 'validate', 'limit', 'flag'])
  // }
  // (selectionChange)="selectValidator($event.value)"

  // private valLocal = FinancialValidator;
  // get validatorLocal() {
  //   return this.valLocal
  // }

  // private valMessagensFiancial = ValidatorMessagesFinancial;
  // get validatorMessagesFiancial() {
  //   return this.valMessagensFiancial
  // }

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

  // date = new FormControl(moment());

  // chosenYearHandler(normalizedYear: Moment) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.year(normalizedYear.year());
  //   this.date.setValue(ctrlValue);
  // }

  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }



  // date = new FormControl(moment());

  // setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value!;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }

  get getDate(): Date {
    return this._bankAccountService.getDate
  }



  // get typeAccountsArray(): any[] {
  //   return this._bankAccountService.typeAccounts
  // }

  // get typeCardArray(): any[] {
  //   return this._bankAccountService.typeCards
  // }

  // get getCards(): FormArray {
  //   return this.formMain.get('cards') as FormArray
  // }

  // addCard() {
  //   this.getCards.push(this.cardsGroup())
  // }

  // removeCard() {
  //   this.getCards.removeAt(0)
  // }

  save() {
    console.log(this.formMain)
    if (this.alertSave(this.formMain)) {
      this._bankAccountService.save(this.formMain);
      this.formLoad();
    }

  }

  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      holder: ['', [Validators.required, Validators.maxLength(100)]],
      institution: ['', [Validators.required, Validators.maxLength(100)]],
      agency: ['', [Validators.required, Validators.maxLength(20)]],
      managerName: ['', [Validators.maxLength(50)]],
      managerContact: ['', [Validators.maxLength(100)]],
      account: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['CORRENTE', [Validators.required]],
      pix: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      cards: this._fb.array([]),
      description: ['', [Validators.maxLength(100)]],
    })
  }


  /////////////////////////////////////////////////

  //   cardssubFormLoad() {
  //     return this.subForm = this._fb.group({
  //       id:['',[]],
  //       holder: ['', [Validators.required, Validators.maxLength(100)]],
  //       flag: ['', [Validators.required, Validators.maxLength(50)]],
  //       type: ['', []],
  //       number: ['', [Validators.required]],
  //       cvc: ['', [Validators.required, Validators.maxLength(10)]],
  //       validate: [moment(), [Validators.required]],
  //       limit: [0, []],
  //       description: ['', [Validators.maxLength(100)]],
  //     })
  //   }

  //   get getCards(): FormArray {
  //     return this.formMain.get('cards') as FormArray
  //   }
  //  addCard() {
  //     this.getCards.push(this.cardssubFormLoad())
  //   }

  //   removeCard() {
  //     this.getCards.removeAt(0)
  //   }

  ////////////////////////////////////////////////


  ngOnInit(): void {
    this.screen();
    this.formLoad();
    //this.dateAdapter.setLocale('pt-BR');
  }

}
