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


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DateJustDayComponent } from 'src/shared/components/date-just-day/date-just-day.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { CreditCardExpenseDto } from '../../dto/credit-card-expense-dto';
import { AddCreditCardExpensesService } from './services/add-credit-card-expenses.service';



@Component({
  selector: 'add-credit-card-expenses',
  templateUrl: './add-credit-card-expenses.component.html',
  styleUrls: ['./add-credit-card-expenses.component.css'],
  providers: [
    AddCreditCardExpensesService,
    CategoryExpensesService
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
    PtBrDatePipe,
    PtBrCurrencyPipe,
    TitleComponent,
    SubTitleComponent,
    DateJustDayComponent,
    CategorySubcategoryExpensesSelectComponent,
    BankAccountMatSelectSingleComponent,
    BtnGComponent
  ],

})

export class AddCreditCardExpensesComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _expensesService: AddCreditCardExpensesService,
    private _fillersService: CategoryExpensesService,
    private _responsive: BreakpointObserver,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  payCycle = PayCycleEnumDto.Month;
  payCycle2 = PayCycleEnumDto.Variable;

  typeCardToDisable = TypeCardDtoEnum.Debit;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }
  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  screenFieldPosition: string = 'row';
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

  priceToPaidView = 0;
  totalPriceInterestView = 0;
  percentageInterestView = 0;

  installmentCacl() {

    if (this?.formMain?.get('installmentsQuantity').value > 1) {
      const totalPrice: number = this?.formMain?.get('installmentPrice').value;
      const installments: number = this?.formMain?.get('installmentsQuantity').value;

      const price = totalPrice * installments;

      this.priceToPaidView = price;

      this?.formMain?.get('price')?.setValue(price);

      this.totalPriceInterestView = price - this?.formMain?.get('paymentAtSight')?.value;

      this.percentageInterestView = (this.totalPriceInterestView / this?.formMain?.get('paymentAtSight')?.value) * 100;

      this.checkLimitCreditCard();
      this.setForm();
    }
    else {
      this?.formMain?.get('totalPercentageInterest').setValue(0);
      if (this?.formMain?.get('totalPercentageInterest').value == 0) {
        this.totalPriceInterestView = 0;
        this.percentageInterestView = 0;
        this.priceToPaidView =  this?.formMain?.get('price')?.value;
      }
    }
  }

  installmentSingleWIthInterest() {
    if (this?.formMain?.get('installmentsQuantity').value == 1) {
      const percentageInterestInstallmentSingle = this?.formMain?.get('paymentAtSight').value * this?.formMain?.get('totalPercentageInterest').value / 100
      this?.formMain?.get('price').setValue(percentageInterestInstallmentSingle);
      this.priceToPaidView = percentageInterestInstallmentSingle + this?.formMain?.get('paymentAtSight').value;
      this.totalPriceInterestView = percentageInterestInstallmentSingle;
      this.percentageInterestView = this?.formMain?.get('totalPercentageInterest').value;
      this.setForm();
    }
  }


  setForm() {
    this?.formMain?.get('price')?.setValue(this.priceToPaidView);
    this?.formMain?.get('totalPriceInterest')?.setValue(this.totalPriceInterestView);
    this?.formMain?.get('totalPercentageInterest')?.setValue(this.percentageInterestView);
  }


  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/category-expenses-add-edit')
  }

  selectedCard = new CardDto();
  selectedCreditCard(cardId: number) {
    console.log(cardId)
    this.selectedCard = this.bankAccount?.cards.find(x => x.id == cardId);
  }

  firstInstallmentExpires = new Date();
  onDateChanged() {
    const expenseDay = new Date(this.formMain.get('expenseDay').value)
    const closingDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), new Date(this.selectedCard.closingDate).getDate())

    const expiresDateToDate = new Date(this.selectedCard.expiresDate);
    const expiresDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), expiresDateToDate.getDate())

    if (expenseDay <= closingDate)
      this.firstInstallmentExpires = expiresDate;
    else
      this.firstInstallmentExpires = new Date(expenseDay.getFullYear(), expenseDay.getMonth() + 1, expiresDateToDate.getDate())
  }

  // makeEntityToUpdate(entity: SelectedPaymentDto) {

  //   this.formMain.get('bankAccountId').setValue(entity.idBankAccount);
  //   this.formMain.get('cardId').setValue(entity.idCard);

  //   if (this.formMain.get('cardId').value == '')
  //     this.formMain.get('cardId').setValue(null);

  // }

  bankAccount = new BankAccountDto();
  onSelectedBanckAccountelected(bankAccount: BankAccountDto) {
    console.log(bankAccount)
    this.bankAccount = bankAccount;

  }


  warningCreditLimit: string = "O limite do crédito foi excedido.";
  showWarning: boolean = false;
  checkLimitCreditCard() {

    const cardLimit = this.selectedCard.creditLimit;
    const cardLimitUsed = this.selectedCard.creditCardLimitOperation.limitCreditUsed;
    const currentPurchaseValue = this.formMain.get('price').value;

    const limitAvailable = cardLimitUsed + currentPurchaseValue >= cardLimit;

    if (limitAvailable) {
      this.showWarning = true;
      return false;
    }

    this.showWarning = false;
    return true
  }

  setFormBeforeSave() {
    this.formMain.get('expires').setValue(this.firstInstallmentExpires);
    this.formMain.get('card').setValue(this.selectedCard);
    if (this?.formMain?.get('paymentAtSight')?.value < this?.formMain?.get('price')?.value)
      this?.formMain?.get('paymentAtSight')?.setValue(this?.formMain?.get('price')?.value)
  }

  save() {
    this.setFormBeforeSave();

    if (this.alertSave(this.formMain) && this.checkLimitCreditCard()) {
      this.saveBtnEnabledDisabled = true;
      this._expensesService.save(this.selectedCard.creditCardLimitOperation, this.formMain);
    }
  }

  formLoad(x?: CreditCardExpenseDto) {
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name || '', [Validators.required]],
      userId: [x?.userId || this.userId, [Validators.required]],
      companyId: [x?.user || this.companyId, [Validators.required]],
      categoryExpenseId: [x?.categoryExpenseId || '', [Validators.required]],
      subcategoryExpenseId: [x?.subcategoryExpenseId || '', [Validators.required]],
      bankAccountId: [x?.bankAccountId || '', [Validators.required]],
      card: [x?.cardId, []],//just
      cardId: [x?.cardId, []],//just
      pixId: [x?.cardId, []],//just
      othersPaymentMethods: [x?.othersPaymentMethods || '', []],//just

      installmentsQuantity: [1, [Validators.required]],
      installmentPrice: ['', [Validators.required]],
      // installmentsQuantity: new FormControl({ value: 1, disabled: true }, Validators.required),
      // installmentPrice: new FormControl({ value: 0, disabled: true }, Validators.required),

      totalPriceInterest: ['', [Validators.required]],//total of money interest
      totalPercentageInterest: [0, [Validators.required]],//total of percentage interest
      // totalPriceToBePaid: ['', [Validators.required, Validators.min(1)]], //total with interest money
      paymentAtSight: [0, [Validators.required, Validators.min(1)]], // total price without interest of product or service

      expenseDay: ['', [Validators.required]],
      expires: ['', [Validators.required]],
      document: [x?.description || '', []],
      registered: [x?.registered || new Date(), [Validators.required]],
      price: [x?.price || 0, [Validators.required]],
      description: [x?.description || '', []],
    })
  }

  // installmentsQuantity = 0;
  // installmentPrice = 0;
  // interest = 0;
  // totalPriceInterest = 0;
  // totalPercentageInterest = 0;
  // paymentAtSight = 0;
  // price = 0;

  // setPropertyFromForm() {
  //   this.installmentsQuantity = this?.formMain?.get('installmentsQuantity')?.value;
  //   this.installmentPrice = this.formMain.get('installmentPrice')?.value;
  //   this.interest = this.formMain.get('interest')?.value;
  //   this.totalPriceInterest = this.formMain.get('totalPriceInterest')?.value;
  //   this.totalPercentageInterest = this.formMain.get('totalPercentageInterest')?.value;
  //   this.paymentAtSight = this.formMain.get('paymentAtSight')?.value;
  //   this.price = this.formMain.get('price')?.value;
  // }

  ngOnInit(): void {
    // this.setPropertyFromForm();
    this.formLoad();
    this.screen();
    // this.validation('categoryExpensesId', true);
  }

}
