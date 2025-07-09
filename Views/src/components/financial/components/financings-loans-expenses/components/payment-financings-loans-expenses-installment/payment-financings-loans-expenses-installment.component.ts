
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { RadioGComponent } from '../../../../../../shared/components/radio-g/radio-g.component';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/forms/pixes-expenses-fields.component';
import { PriceInteresFieldsComponent } from '../../../common-components/price-interest-fields/price-interest-fields.component';


import { DefaultComponent } from 'src/shared/components/default-component/default-component';
import { FinancialStaticBusinessRule } from '../../../common-components/static-business-rule/static-business-rule';
import { FinancingAndLoanExpenseInstallmentDto } from '../../dto/financing-and-loan-expense-installment-dto';
import { PaymentFinancingsLoansInstallmentService } from './services/payment-financings-loans-installment.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { InputFieldGComponent } from 'src/shared/components/input-field-g/input-field-g.component';
import { ItemsViewInterface } from 'src/shared/components/view-default/interfaces/items-view.interface';
import { ViewDefaultComponent } from 'src/shared/components/view-default/view-default.component';
import { TruncatePipe } from 'src/shared/pipes/truncate.pipe';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { GetBankAccountComponent } from '../../../common-components/bank-account/gets/get-bank-account/get-bank-accounts.component';
import { GetBankCardsGComponent } from '../../../common-components/bank-cards/gets/get-bank-cards-g/get-bank-cards-g.component';
import { GetBankPixesGComponent } from '../../../common-components/pixes-expenses/gets/get-bank-pixes-g/get-bank-pixes-g.component';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { Observable, of } from 'rxjs';
import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { PixDto } from '../../../bank-account-cards/dto/pix-dto';


@Component({
  selector: 'payment-financings-loans-expenses-installment',
  standalone: true,
  imports: [
    CommonModule,
    DefaultComponent,
    MatCardModule,
    BankAccountMatSelectSingleComponent,
    PriceInteresFieldsComponent,
    InputFieldGComponent,
    GetBankAccountComponent,
    GetBankCardsGComponent,
    GetBankPixesGComponent,
    ViewDefaultComponent,
    RadioGComponent,
    BtnGComponent,
    PixesExpensesFieldsComponent,
    // PixComponent,
  ],
  templateUrl: './payment-financings-loans-expenses-installment.component.html',
  styleUrls: ['./payment-financings-loans-expenses-installment.component.css'],
  providers: [PaymentFinancingsLoansInstallmentService, TruncatePipe]
})


export class PaymentFinancingsLoansInstallmentComponent extends BaseForm implements OnInit {

  itemsToView: ItemsViewInterface[] = [];
  cards: Observable<CardDto[]>;
  pixes: Observable<PixDto[]>;

  selectedRadio = 0;
  optionsRadio = [{ id: 0, name: 'Pix' }, { id: 1, name: 'Cartão' }, { id: 2, name: 'Outros' }]
  hideShowScreenDataInfo = true;
  validatorsCreditPixOthers: boolean = false;

  entity: FinancingAndLoanExpenseInstallmentDto;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentFinancingsLoansInstallmentService,
  ) {
    super()
    if (this._router.getCurrentNavigation()?.extras.state) {
      const obj = this._router.getCurrentNavigation()?.extras.state;
      this.formLoad(obj['entity'].entity as FinancingAndLoanExpenseInstallmentDto)
      this.entity = obj['entity'].entity as FinancingAndLoanExpenseInstallmentDto;
      this.hideShowScreenDataInfo = obj['entity'].hideShowScreenDataInfo;
    }
  }

  banckAccountSelected(bank: BankAccountDto) {
    this.itemsToView = [];
    this.itemsToView.push({ key: 'Banco:', value: bank.institution, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Conta:', value: bank.account, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Agência:', value: bank.agency, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Titular:', value: bank.holder, classValue: 'font-bold' });
    this.cards = of(bank.cards);
    this.pixes = of(bank.pixes);
  }

  formLoad(entity: FinancingAndLoanExpenseInstallmentDto) {
    this.formMain = this._fb.group({
      id: [entity.id, []],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      companyId: [this.companyId, [Validators.required]],
      financingAndLoanExpenseId: [entity.financingAndLoanExpenseId, [Validators.required]],
      bankAccountId: [entity.bankAccountId, [Validators.required]],
      cardId: [entity.cardId, [Validators.required]],
      pixId: [entity.pixId, [Validators.required]],
      pixExpense: this.subFormLoad(entity),
      othersPaymentMethods: [entity.othersPaymentMethods, [Validators.required]],
      document: [entity.document, [Validators.maxLength(150)]],
      wasPaid: [entity.wasPaid, [Validators.required]],
      priceWasPaidInstallment: [entity.financingAndLoanExpense.installmentPrice, [Validators.required]],
      interest: [entity.interest, [Validators.required]],
    })
  }

  onSelectedRadio(selected: number) {
    this.selectedRadio = selected;
  }

  subFormLoad(entity: FinancingAndLoanExpenseInstallmentDto) {
    return this.subForm = this._fb.group({
      benefitedKey: ['', []],
      expenseDay: [entity.expires, []],
    })
  }

  checkExpires() {
    const result = FinancialStaticBusinessRule.checkIfExpiredClassCssGrid('expirationView', this.entity)

    if (result === "expired") return true;

    return false;
  }

  hideShowWarning = false;
  triggerWarning(value: string) {}

  updateBtn() {

    this.validatorsCreditPixOthers = true;

    if (this.alertSave(this.formMain))
      this._services.update(this.formMain);
  }

  ngOnInit(): void {
    this.checkExpires();
  }

}
