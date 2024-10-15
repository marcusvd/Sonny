import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/pixes-expenses-fields.component';
import { PriceInteresFieldsComponent } from '../../../common-components/price-interest-fields/price-interest-fields.component';
import { HtmlDataInfoDto } from '../../../common-components/screen-data-info/dtos/html-data-info-dto';
import { ScreenDataInfoComponent } from '../../../common-components/screen-data-info/screen-data-info.component';
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


export class PaymentFinancingsLoansInstallmentComponent extends Add {

  fields: HtmlDataInfoDto[] = [];
  hideShowScreenDataInfo = true;
  validatorsCreditPixOthers: boolean = false;

  entity:FinancingAndLoanExpenseInstallmentDto;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentFinancingsLoansInstallmentService,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.formLoad(obj['entity'].entity as FinancingAndLoanExpenseInstallmentDto)
      this.entity =obj['entity'].entity as FinancingAndLoanExpenseInstallmentDto;
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
      currentInstallment: [entity.currentInstallment, [Validators.required]],
      bankAccountId: [entity.bankAccountId, [Validators.required]],
      cardId: [entity.cardId, [Validators.required]],
      pixId: [entity.pixId, [Validators.required]],
      pixExpense: this.subFormLoad(entity),
      othersPaymentMethods: [entity.othersPaymentMethods, [Validators.required]],
      document: [entity.document, [Validators.maxLength(150)]],
      expires: [entity.expires, [Validators.required]],
      wasPaid: [entity.wasPaid, [Validators.required]],
      priceWasPaidInstallment: [entity.financingAndLoanExpense.installmentPrice, [Validators.required]],
      interest: [entity.interest, [Validators.required]],
    })
  }

  subFormLoad(entity: FinancingAndLoanExpenseInstallmentDto) {
    return this.subForm = this._fb.group({
      benefitedKey: ['', []],
      expenseDay: [entity.expires, []],
    })
  }

  updateBtn() {

    this.validatorsCreditPixOthers = true;

    if (this.alertSave(this.formMain)) {
      this._services.update(this.formMain);
      this.saveBtnEnabledDisabled = true;
    }

  }

}
