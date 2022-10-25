
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
import { IScreen } from 'src/shared/helpers/responsive/iscreen';


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

  defaultSelected = 'CEL';

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

  constructor(
    protected _CheckingAccountService: CheckingAccountService,
    private dateAdapter: DateAdapter<any>,
    private _Fb: FormBuilder,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }


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

            break;
          }
          case 'small': {
            this.agencyAccountTypeaccountCols = 1;

            this.holderInstitutionCols = 1;

            this.pixCols = 1;

            this.textCols = 1;

            this.flagTypeaccountCols = 1;

            this.numbercardCheckcodeValidateCols = 1;
            break;
          }
          case 'medium': {
            this.agencyAccountTypeaccountCols = 3;

            this.holderInstitutionCols = 2;

            this.pixCols = 2;

            this.textCols = 2;

            this.flagTypeaccountCols = 2;

            this.numbercardCheckcodeValidateCols = 2;
            break;
          }
          case 'large': {
            this.agencyAccountTypeaccountCols = 3;

            this.holderInstitutionCols = 2;

            this.pixCols = 2;

            this.textCols = 2;

            this.flagTypeaccountCols = 2;

            this.numbercardCheckcodeValidateCols = 3;
            break;
          }
          case 'xlarge': {
            this.agencyAccountTypeaccountCols = 3;

            this.holderInstitutionCols = 2;

            this.pixCols = 2;

            this.textCols = 2;

            this.flagTypeaccountCols = 2;

            this.numbercardCheckcodeValidateCols = 3;
            break;
          }
        }
      }
    })




  }


  date = new FormControl(moment());

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
    this.screen();
    this.formLoad();
    this.dateAdapter.setLocale('pt-BR');
  }

}
