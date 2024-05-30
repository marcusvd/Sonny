import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as _moment from 'moment';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnSaveGComponent } from 'src/shared/components/btn-save-g/btn-save-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { FixedExpensesService } from '../../services/fixed-expenses.service';





const moment = _moment;
//
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD',
  },
  display: {
    dateInput: 'DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'fixed-expenses',
  templateUrl: './fixed-expenses-add.component.html',
  styleUrls: ['./fixed-expenses-add.component.css'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    FixedExpensesService,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    CurrencyMaskModule,
    TitleComponent,
    SubTitleComponent,
    BtnSaveGComponent
  ],

})

export class FixedExpensesAddComponent extends BaseForm implements OnInit {

  startDate = new Date();
  screenFieldPosition: string = 'row';
  messageTooltipNameOther = 'Para uma despesa nova, selecione "OUTROS" no menu acima.'

  constructor(
    private _fb: FormBuilder,
    private _fixedExpensesService: FixedExpensesService,
    private _responsive: BreakpointObserver,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }



  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }
  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  cycleArray: any[] = [
    { id: 1, cycle: 'MENSAL' },
    { id: 2, cycle: 'ANUAL' },
    { id: 0, cycle: 'DIÁRIO' },
  ];

  expensesArray: any[] = [
    { id: 0, expense: 'SELECIONE UMA OPÇÃO' },
    { id: 1, expense: 'ALUGUEL' },
    { id: 2, expense: 'ÁGUA' },
    { id: 3, expense: 'LUZ' },
    { id: 4, expense: 'TELEFONE' },
    { id: 5, expense: 'INTERNET' },
    { id: 6, expense: 'CONDOMÍNIO' },
    { id: 7, expense: 'ALIMENTAÇÃO' },
    { id: 8, expense: 'TRANSPORTE' },
    { id: 9, expense: 'SEGUROS' },
    // { id: 10, expense: 'SAÚDE' },
    // { id: 11, expense: 'HIGIENE' },
    { id: 10, expense: 'GÁS' },
    { id: 11, expense: 'IMPOSTOS' },
    { id: 12, expense: 'OUTROS' },

  ];

  expenses(value: string) {
    const selected = value;
    if (selected.toLocaleLowerCase() === 'outros') {
      this.formMain.controls['nameOther'].enable();
      this.matTooltip.enableDisable = true;

    }
    else if (selected.toLocaleLowerCase() != 'outros') {
      this.formMain.get('nameOther').reset();
      this.formMain.controls['nameOther'].disable();
      this.matTooltip.enableDisable = false;

    }
  }

  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      nameOther: ['', [Validators.required, Validators.maxLength(150)]],
      nameIdentification: ['', [Validators.maxLength(150)]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      expiration: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      cyclePayment: [1, [Validators.required]],
      linkCopyBill: ['', [Validators.maxLength(350)]],
      userLinkCopyBill: ['', [Validators.maxLength(50)]],
      passLinkCopyBill: ['', [Validators.maxLength(20)]],
      fixedExpensesTrackings:this._fb.array([])
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

    if (this.alertSave(this.formMain)) {
      this._fixedExpensesService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this.formMain.controls['nameOther'].disable();
  }

}
