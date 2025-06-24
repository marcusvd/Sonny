import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { CategoryExpensesService } from '../../../../../../components/financial/services/category-expenses.service';
import { AddDefaultImports, AddDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { BaseForm } from '../../../../../../shared/components/inheritance/forms/base-form';
import { ToolTips } from '../../../../../../shared/services/messages/snack-bar.service';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { CreditCardExpenseDto } from '../../dto/credit-card-expense-dto';
import { AddCreditCardExpensesImports, AddCreditCardExpensesProviders } from '../add/imports/add-credit-card-expenses.imports';
import { AddCreditCardExpensesService } from './services/add-credit-card-expenses.service';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';


@Component({
  selector: 'add-credit-card-expenses',
  templateUrl: './add-credit-card-expenses.component.html',
  styleUrls: ['./add-credit-card-expenses.component.css'],
  standalone: true,
  imports: [
    AddCreditCardExpensesImports,
    AddDefaultImports,
  ],
  providers: [
    AddCreditCardExpensesProviders,
    AddDefaultProviders
  ]
})

export class AddCreditCardExpensesComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _expensesService: AddCreditCardExpensesService,
    private _fillersService: CategoryExpensesService,


  ) { super() }

  payCycle = PayCycleEnumDto.Month;
  payCycle2 = PayCycleEnumDto.Variable;
  typeCardToDisable = TypeCardDtoEnum.Debit;

  get getExpenseDay() {
    return this.formMain.get('expenseDay').value
  }

  get fullPaymentUpfront() {
    return this.formMain.get('installmentsQuantity').value == 1;
  }
  get installmentPayment() {
    return this.formMain.get('installmentsQuantity').value > 1;
  }


  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  priceToPaidView = 0;
  totalPriceInterestView = 0;
  percentageInterestView = 0;



  sumQuantityInstallment() {

    const installmentPrice_Form: number = this?.formMain?.get('installmentPrice').value;
    const installmentsQuantity_Form: number = this?.formMain?.get('installmentsQuantity').value;
    const paymentAtSight_Form = this?.formMain?.get('paymentAtSight')?.value;

    if (installmentsQuantity_Form > 1) {

      const amountPrice = installmentPrice_Form * installmentsQuantity_Form;
      const priceInterest = (amountPrice - paymentAtSight_Form);
      const percentageInterest = (priceInterest / paymentAtSight_Form) * 100;

      this.amount(amountPrice);
      this.percentageInterest(percentageInterest);
      this.priceInterest(priceInterest)
    }
    else {
      this.setFormFieldValue(this.formMain, 'installmentPrice', 0);
    }

    if (installmentsQuantity_Form == 1) {
      this.setFormFieldValue(this.formMain, 'totalPercentageInterest', 0);
      this.amount(paymentAtSight_Form);
      this.percentageInterest(0);
      this.priceInterest(0);
    }

  }

  sumSingleInstallment() {
    const installmentsQuantity_Form: number = this?.formMain?.get('installmentsQuantity').value;

    const paymentAtSight_Form = this?.formMain?.get('paymentAtSight')?.value;
    const totalPercentageInterest_Form: number = this?.formMain?.get('totalPercentageInterest').value;


    if (installmentsQuantity_Form == 1) {

      const priceInterest = (paymentAtSight_Form * totalPercentageInterest_Form) / 100;
      const percentageInterest = totalPercentageInterest_Form;
      const amountPrice = priceInterest + paymentAtSight_Form;
      this.amount(amountPrice);
      this.percentageInterest(percentageInterest);
      this.priceInterest(priceInterest)
      this.priceInstallment(amountPrice);
    }


  }

  sumPaymentAtSight() {
    const installmentsQuantity_Form: number = this?.formMain?.get('installmentsQuantity').value;
    const installmentPrice_Form: number = this?.formMain?.get('installmentPrice').value;
    const paymentAtSight_Form = this?.formMain?.get('paymentAtSight')?.value;
    const totalPercentageInterest_Form: number = this?.formMain?.get('totalPercentageInterest').value;
    if (installmentsQuantity_Form > 1) {
      console.log('aqui')
      const amountPrice = installmentPrice_Form * installmentsQuantity_Form;
      const priceInterest = (amountPrice - paymentAtSight_Form);
      const percentageInterest = (priceInterest / paymentAtSight_Form) * 100;

      this.amount(amountPrice);
      this.percentageInterest(percentageInterest);
      this.priceInterest(priceInterest)
    }

    if (installmentsQuantity_Form == 1) {
      const priceInterest = (paymentAtSight_Form * totalPercentageInterest_Form) / 100;
      const percentageInterest = totalPercentageInterest_Form;
      const amountPrice = priceInterest + paymentAtSight_Form;

      this.amount(amountPrice);
      this.percentageInterest(percentageInterest);
      this.priceInterest(priceInterest);
      this.priceInstallment(amountPrice);
    }


  }

  amount(amountPrice: number) {
    this.setFormFieldValue(this.formMain, 'price', amountPrice);
    this.priceToPaidView = amountPrice;
  }

  percentageInterest(percentageInterest: number) {
    this.setFormFieldValue(this.formMain, 'totalPercentageInterest', percentageInterest);
    this.percentageInterestView = percentageInterest;
  }

  priceInterest(priceInterest: number) {
    this.setFormFieldValue(this.formMain, 'totalPriceInterest', priceInterest);
    this.totalPriceInterestView = priceInterest;
  }
  priceInstallment(priceInstallment: number) {
    this.setFormFieldValue(this.formMain, 'installmentPrice', priceInstallment);
  }

  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  selectedCard = new CardDto();
  selectedCreditCard(cardId: number) {
    this.selectedCard = this.bankAccount?.cards.find(x => x.id == cardId);
  }

  firstInstallmentExpires = new Date();
  onDateChanged() {
    const expenseDay = new Date(this.formMain.get('expenseDay').value)
    const closingDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), new Date(this.selectedCard.closingDate).getDate())

    const expiresDateToDate = new Date(this.selectedCard.expiresDate);
    const expiresDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), expiresDateToDate.getDate())

    if (expenseDay <= closingDate) {
      console.log(expiresDate)
      this.firstInstallmentExpires = expiresDate;
    }
    else
      this.firstInstallmentExpires = new Date(expenseDay.getFullYear(), expenseDay.getMonth() + 1, expiresDateToDate.getDate())
  }


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
    if (this?.formMain?.get('price')?.value < this?.formMain?.get('paymentAtSight')?.value)
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
      paidFromBankAccountId: [null, []],
      card: [x?.card, []],
      cardId: [x?.cardId, []],
      pixId: [null, []],
      othersPaymentMethods: [x?.othersPaymentMethods || '', []],
      installmentsQuantity: [1, [Validators.required]],
      installmentPrice: ['', [Validators.required]],
      totalPriceInterest: ['', [Validators.required]],
      totalPercentageInterest: [0, [Validators.required]],
      paymentAtSight: [0, [Validators.required, Validators.min(1)]],
      expenseDay: ['', [Validators.required]],
      expires: ['', [Validators.required]],
      document: [x?.description || '', []],
      registered: [x?.registered || new Date(), [Validators.required]],
      price: [x?.price || 0, [Validators.required]],
      description: [x?.description || '', []],
    })
  }

  ngOnInit(): void {
    this.formLoad();

  }

}
