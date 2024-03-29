import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FinancialExpensesService } from '../../services/financial-expenses.service';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { Moment } from 'moment';
import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';


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
  selector: 'financial-expenses',
  templateUrl: './financial-expenses.component.html',
  styleUrls: ['./financial-expenses.component.css'],
  providers: [ {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

]

})

export class FinancialExpensesComponent extends BaseForm implements OnInit {

  startDate = new Date();
  screenFieldPosition: string = 'row';
  messageTooltipNameOther = 'Para uma despesa nova, selecione "OUTROS" no menu acima.'

  constructor(
    private _fb: FormBuilder,
    private _financialExpensesService: FinancialExpensesService,
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
    { id: 0, cycle: 'MENSAL' },
    { id: 1, cycle: 'ANUAL' },
    { id: 2, cycle: 'DIÁRIO' },
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
      numberInstallment: [1, [Validators.required, Validators.min(1)]],
      cyclePayment: ['MENSAL', [Validators.required]],
      linkCopyBill: ['', [Validators.maxLength(350)]],
      userLinkCopyBill: ['', [Validators.maxLength(50)]],
      passLinkCopyBill: ['', [Validators.maxLength(20)]]
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

  save() {

    if (this.alertSave(this.formMain)) {
      this._financialExpensesService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this.formMain.controls['nameOther'].disable();
  }

}
