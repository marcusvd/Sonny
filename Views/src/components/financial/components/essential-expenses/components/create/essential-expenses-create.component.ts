import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CommunicationAlerts, ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { FixedExpensesDto } from '../../../fixed-expenses/dto/fixed-expenses-dto';
import { EssentialExpenseDto } from '../../dto/essential-expense-dto';
import { EssentialExpensesService } from '../../services/essential-expenses-service';
@Component({
  selector: 'essential-expenses-create',
  templateUrl: './essential-expenses-create.component.html',
  styleUrls: ['./essential-expenses-create.component.css'],
  providers: [EssentialExpensesService],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
})
export class EssentialExpensesCreateComponent extends BaseForm implements OnInit {

  screenFieldPosition: string = 'row';
  errorMsg: string;

  get essentialExpensesArray(): any[] {
    return this._essentialExpensesService.EssentialExpensesArray
  }

  defaultSelectedCycle = 'MENSAL';
  get expirationCycleArray(): any[] {
    return null;
    // return this._essentialExpensesService.bankAccounts
  }

  constructor(
    private _fb: FormBuilder,
    private _essentialExpensesService: EssentialExpensesService,
    private _communicationsAlerts: CommunicationAlerts,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  messageTooltipNameOther = 'Para uma despesa nova, selecione "OUTROS" no menu acima.'

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  banckAccountsMtd(id: number) {
    this.bankACards = [];
    this.banckAccounts.forEach(x => {
      x.cards.forEach((xy:any) => {
        if (xy.bankAccountId == id)
          if (xy.type == this.paymentMethodSelected)
            this.bankACards.push(xy);
      })
    })
  }

  currentDate() {
    console.log(new Date().toDateString())
    return new Date("01/12/2024");
  }

  showCards: boolean = false;
  PaidBy = Object.keys({ 'Pix': 0, 'Débito': 1, 'Crédito': 2, 'Transferência': 3, 'Ted': 4, 'Doc': 5, 'Dinheiro': 6 })
  paymentMethodSelected: number;
  paidByMtd(key: string) {
    switch (key) {

      case '0': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '1': {
        this.showCards = true;
        this.paymentMethodSelected = 1;
        break
      }
      case '2': {
        this.showCards = true;
        this.paymentMethodSelected = 2;
        break
      }
      case '3': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '4': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '5': {
        this.showCards = false;

        this.formMain.get('cardId').setValue(null);
        break
      }
      case '5': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '6': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }

    }
  }

  formLoad() {
    this.formMain = this._fb.group({
      userId: [JSON.parse(localStorage.getItem('userId')), [Validators.required]],
      expensesId: ['', [Validators.required]],
      bankAccountId: ['', [Validators.required]],
      paidBy: ['', [Validators.required]],
      cardId: ['', []],
      wasPaid: ['', [Validators.required]],
      entryRegister: [new Date(), [Validators.required]],
      price: [0, [Validators.required]],
      interest: [0, []],
    })
    this.formMain.get('wasPaid').setValue(new Date())
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

  // expenses(value: string) {
  //   const selected = value;
  //   if (selected.toLocaleLowerCase() === 'outros') {
  //     this.formMain.controls['nameOther'].enable();
  //     this.matTooltip.enableDisable = true;
  //   }
  //   else if (selected.toLocaleLowerCase() != 'outros') {
  //     this.formMain.get('nameOther').reset();
  //     this.formMain.controls['nameOther'].disable();
  //     this.matTooltip.enableDisable = false;
  //   }
  // }

  save() {

    if (this.alertSave(this.formMain)) {
      this._essentialExpensesService.save(this.formMain)
        .subscribe({
          next: (EssentialExpensesDto: EssentialExpenseDto) => {
            // this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
            this.formMain.reset();
          },
          error: (errors) => {
            if (errors.error.Message === 'month')
              this.errorMsg = 'Esta conta de ciclo diário já esta paga.'

            if (errors.error.Message === 'year')
              this.errorMsg = 'Esta conta de ciclo anual já esta paga.'

            if (errors.error.Message === 'month')
              this.errorMsg = 'Esta conta de ciclo mensal já esta paga.'

            // this._communicationsAlerts.communicationError('', 5, 2, 'top', 'center');
          }
        })
      // this.formLoad();
    }
  }

  banckAccounts: BankAccountDto[] = [];
  bankACards: CardDto[] = [];
  expenses: FixedExpensesDto[] = [];
  ngOnInit(): void {
    this.formLoad();
    this.screen();

    this._essentialExpensesService.getBackAccounts().subscribe(
      (x: BankAccountDto[]) => {
        this.banckAccounts = x;
      }
    )
    // this._essentialExpensesService.getAllExpenses().subscribe(
    //   (x: FinancialExpensesDto[]) => {
    //     console.log(x)
    //     this.expenses = x;
    //   }
    // )


  }

}
