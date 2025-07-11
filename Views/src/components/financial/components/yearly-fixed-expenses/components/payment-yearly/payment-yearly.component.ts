
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { Payment } from 'src/shared/components/inheritance/payment/payment';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/forms/pixes-expenses-fields.component';
import { PriceInteresFieldsComponent } from '../../../common-components/price-interest-fields/price-interest-fields.component';


import { YearlyFixedExpenseDto } from '../../dto/yearly-fixed-expense-dto';
import { PaymentYearlyService } from './services/payment-yearly.service';

@Component({
  selector: 'payment-yearly',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BankAccountMatSelectSingleComponent,

    PriceInteresFieldsComponent,
    SubTitleComponent,
    TitleComponent,
    BtnGComponent,
    PixesExpensesFieldsComponent
  ],
  templateUrl: './payment-yearly.component.html',
  styleUrls: ['./payment-yearly.component.css'],
  providers: [PaymentYearlyService]
})


export class PaymentYearlyComponent extends Payment {


  hideShowScreenDataInfo = true;
  validatorsCreditPixOthers: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentYearlyService,

  ) {

    super()

    if (this._router.getCurrentNavigation()?.extras.state) {

      const obj = this._router.getCurrentNavigation()?.extras.state;

      if (obj) {
        this.formLoad(obj['entity'].entity as YearlyFixedExpenseDto)
        this.hideShowScreenDataInfo = obj['entity'].hideShowScreenDataInfo;

      }
    }
  }

  formLoad(entity: YearlyFixedExpenseDto) {
    this.formMain = this._fb.group({
      id: [entity.id, []],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      companyId: [this.companyId, [Validators.required]],
      name: [entity.name, [Validators.required]],
      start: [entity.start, [Validators.required]],
      autoRenew: [entity.autoRenew, [Validators.required]],
      categoryExpenseId: [entity.categoryExpenseId, [Validators.required, Validators.maxLength(150)]],
      subcategoryExpenseId: [entity.subcategoryExpenseId, [Validators.required, Validators.maxLength(150)]],
      bankAccountId: [entity.bankAccountId, [Validators.required]],
      cardId: [entity.cardId, [Validators.required]],
      pixId: [entity.pixId, [Validators.required]],
      pixExpense: this.subFormLoad(entity),
      othersPaymentMethods: [entity.othersPaymentMethods, [Validators.required]],
      description: [entity.description, [Validators.maxLength(150)]],
      expires: [entity.expires, [Validators.required]],
      price: [entity.price, [Validators.required, Validators.min(1)]],
      interest: [entity.interest, [Validators.required]],
      linkCopyBill: [entity.linkCopyBill, [Validators.maxLength(350)]],
      userLinkCopyBill: [entity.userLinkCopyBill, [Validators.maxLength(50)]],
      passLinkCopyBill: [entity.passLinkCopyBill, [Validators.maxLength(20)]],
    })
  }

  subFormLoad(entity: YearlyFixedExpenseDto) {
    return this.subForm = this._fb.group({
      benefitedKey: ['', []],
      expenseDay: [entity.expires, []],
    })
  }


  updateBtn() {

    this.validatorsCreditPixOthers = true;

    if (this.alertSave(this.formMain)) {
      this._services.update(this.formMain);
      this.paymentBtnEnabledDisabled = true;
    }

  }

}
