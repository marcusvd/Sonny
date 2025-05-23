
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { Payment } from 'src/shared/components/inheritance/payment/payment';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/pixes-expenses-fields.component';
import { PriceInteresFieldsComponent } from '../../../common-components/price-interest-fields/price-interest-fields.component';
import { HtmlDataInfoDto } from '../../../common-components/screen-data-info/dtos/html-data-info-dto';
import { ScreenDataInfoComponent } from '../../../common-components/screen-data-info/screen-data-info.component';
import { FinancialStaticBusinessRule } from '../../../common-components/static-business-rule/static-business-rule';
import { FinancingAndLoanExpenseInstallmentDto } from '../../dto/financing-and-loan-expense-installment-dto';
import { PaymentFinancingsLoansInstallmentService } from './services/payment-financings-loans-installment.service';

@Component({
  selector: 'payment-financings-loans-expenses-installment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BankAccountMatSelectSingleComponent,
    ScreenDataInfoComponent,
    PriceInteresFieldsComponent,
    SubTitleComponent,
    TitleComponent,
    BtnGComponent,
    PixesExpensesFieldsComponent,
  ],
  templateUrl: './payment-financings-loans-expenses-installment.component.html',
  styleUrls: ['./payment-financings-loans-expenses-installment.component.css'],
  providers: [PaymentFinancingsLoansInstallmentService]
})


export class PaymentFinancingsLoansInstallmentComponent extends Payment implements OnInit {

  fields: HtmlDataInfoDto[] = [];
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
      this.fields = obj['entity'].screenInfoFields as HtmlDataInfoDto[];
    }
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

  // formLoad(entity: FinancingAndLoanExpenseInstallmentDto) {
  //   this.formMain = this._fb.group({
  //     id: [entity.id, []],
  //     userId: [this.userId, [Validators.required, Validators.min(1)]],
  //     companyId: [this.companyId, [Validators.required]],
  //     financingAndLoanExpenseId: [entity.financingAndLoanExpenseId, [Validators.required]],
  //     currentInstallment: [entity.currentInstallment, [Validators.required]],
  //     bankAccountId: [entity.bankAccountId, [Validators.required]],
  //     cardId: [entity.cardId, [Validators.required]],
  //     pixId: [entity.pixId, [Validators.required]],
  //     pixExpense: this.subFormLoad(entity),
  //     othersPaymentMethods: [entity.othersPaymentMethods, [Validators.required]],
  //     document: [entity.document, [Validators.maxLength(150)]],
  //     expires: [entity.expires, [Validators.required]],
  //     wasPaid: [entity.wasPaid, [Validators.required]],
  //     priceWasPaidInstallment: [entity.financingAndLoanExpense.installmentPrice, [Validators.required]],
  //     interest: [entity.interest, [Validators.required]],
  //   })
  // }




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
  triggerWarning(value: string) {




  }

  updateBtn() {

    this.validatorsCreditPixOthers = true;

    if (this.alertSave(this.formMain)) {
      this._services.update(this.formMain);
      this.paymentBtnEnabledDisabled = true;
    }

  }


  ngOnInit(): void {
    this.checkExpires();
  }


}
