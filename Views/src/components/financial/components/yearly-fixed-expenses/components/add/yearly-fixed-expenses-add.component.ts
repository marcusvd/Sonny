import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as _moment from 'moment';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { Observable } from 'rxjs/internal/Observable';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { YearlyFixedExpensesDto } from '../../dto/yearly-fixed-expenses-dto';
import { YearlyFixedExpensesFillersDto } from '../../dto/yearly-fixed-expenses-fillers-dto';
import { yearlyFixedExpensesFillersService } from './services/yearly-fixed-expenses-fillers.service';
import { YearlyFixedExpensesService } from './services/yearly-fixed-expenses.service';
import { YearlyFixedExpensesAddValidator } from './validators/yearly-fixed-expenses-add.validator';








const moment = _moment;
//
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'DD',
//   },
//   display: {
//     dateInput: 'DD',
//     yearlyYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     yearlyYearA11yLabel: 'MMMM YYYY',
//   },
// };

// providers: [{
//   provide: DateAdapter,
//   useClass: MomentDateAdapter,
//   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
// },
// { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
//   YearlyFixedExpensesService,
//   yearlyFixedExpensesFillersService
// ]
@Component({
  selector: 'yearly-fixed-expenses',
  templateUrl: './yearly-fixed-expenses-add.component.html',
  styleUrls: ['./yearly-fixed-expenses-add.component.css'],
  providers: [
    YearlyFixedExpensesService,
    yearlyFixedExpensesFillersService
  ],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    CurrencyMaskModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,

  ],

})

export class YearlyFixedExpensesAddComponent extends Add implements OnInit {

  startDate = new Date();
  screenFieldPosition: string = 'row';
  messageTooltipNameOther = 'Para uma despesa nova, selecione "INCLUIR" na caixa de seleção acima.'

  constructor(
    private _fb: FormBuilder,
    private _yearlyFixedExpensesService: YearlyFixedExpensesService,
    private _fillersService: yearlyFixedExpensesFillersService,
    private _responsive: BreakpointObserver,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }



  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valYearlyAction = YearlyFixedExpensesAddValidator;
  get validatorYearlyAction() {
    return this.valYearlyAction
  }

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }



  fillersExpenses = new Observable<YearlyFixedExpensesFillersDto[]>();

  includeMtd(value: boolean) {
    if (value) {
      this.validation('nameNew', true)
      this.validation('nameId', false)
      this.messageTooltipNameOther = '';
    }
    if (!value) {
      this.validation('nameNew', false)
      this.validation('nameId', true)
      this.messageTooltipNameOther = 'Para uma despesa nova, selecione "INCLUIR" na caixa de seleção acima.'
    }
  }


  validation(field: string, addRemove: boolean) {
    if (addRemove) {
      this.formMain.get(field).addValidators(Validators.required);
      this.formMain.get(field).updateValueAndValidity();
    }

    if (!addRemove) {
      this.formMain.get(field).setValue(null);
      this.formMain.get(field).removeValidators(Validators.required);
      this.formMain.get(field).updateValueAndValidity();
    }
  }



  selectedExpenses(value: boolean) {

  }

  formLoad() {
    this.formMain = this._fb.group({
      nameId: ['', [Validators.maxLength(150)]],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      nameNew: ['', [Validators.maxLength(150)]],
      nameIdentification: ['', [Validators.maxLength(150)]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      expiration: ['', [Validators.required]],
      start: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      autoRenew: [false, []],
      linkCopyBill: ['', [Validators.maxLength(350)]],
      userLinkCopyBill: ['', [Validators.maxLength(50)]],
      passLinkCopyBill: ['', [Validators.maxLength(20)]],
      fixedExpensesTrackings: this._fb.array([])
    })
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'

            break;
          }
        }
      }
    })


  }


  makeSpaceFields() {

    if (this.screenFieldPosition === 'row') {
      if (
        (this?.formMain?.get('expiration')?.hasError('required') || this?.formMain?.get('expiration')?.hasError('min') || this?.formMain?.get('expiration')?.hasError('max')) && this?.formMain?.get('expiration')?.touched
        ||
        (this?.formMain?.get('numberInstallment')?.hasError('required') || this?.formMain?.get('numberInstallment')?.hasError('max')) && this?.formMain?.get('numberInstallment')?.touched
      )
        return true;
      else
        return false;
    }
    else
      return false;

  }


  save() {

    if (this.alertSave(this.formMain))
      console.log(this.formMain.value as YearlyFixedExpensesDto)
    this._yearlyFixedExpensesService.save(this.formMain);

  }



  // minDate: Date;
  // maxDate: Date;

  ngOnInit(): void {
    this.fillersExpenses = this._fillersService.getFillers();
    this.formLoad();
    this.screen();
    this.validation('nameId', true);

    // this.minDate = new Date(this.currentDate.getFullYear() - 20, 0, 1);
    // this.maxDate = new Date(this.currentDate.getFullYear() + 1, 11, 31);
  }

}
