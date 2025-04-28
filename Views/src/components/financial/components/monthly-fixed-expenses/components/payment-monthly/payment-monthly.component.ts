import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
import { MonthlyFixedExpenseDto } from '../../dto/monthly-fixed-expense-dto';
import { PaymentMonthlyService } from './services/payment-monthly.service';

@Component({
    selector: 'payment-monthly',
    imports: [
        CommonModule,
        MatCardModule,
        BankAccountMatSelectSingleComponent,
        ScreenDataInfoComponent,
        PriceInteresFieldsComponent,
        SubTitleComponent,
        TitleComponent,
        BtnGComponent,
        PixesExpensesFieldsComponent
    ],
    templateUrl: './payment-monthly.component.html',
    styleUrls: ['./payment-monthly.component.css'],
    providers: [PaymentMonthlyService]
})

export class PaymentMonthlyComponent extends Payment {

  fields: HtmlDataInfoDto[] = [];
  hideShowScreenDataInfo = true;
  validatorsCreditPixOthers: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentMonthlyService,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.formLoad(obj['entity'].entity as MonthlyFixedExpenseDto)
      this.hideShowScreenDataInfo = obj['entity'].hideShowScreenDataInfo;
      this.fields = obj['entity'].screenInfoFields as HtmlDataInfoDto[];
    }
  }

  formLoad(entity: MonthlyFixedExpenseDto) {
    this.formMain = this._fb.group({
      id: [entity.id, []],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      companyId: [this.companyId, [Validators.required]],
      bankAccountId: [entity.bankAccountId, [Validators.required]],
      cardId: [entity.cardId, [Validators.required]],
      pixId: [entity.pixId, [Validators.required]],
      othersPaymentMethods: [entity.othersPaymentMethods, [Validators.required]],
      pixExpense: this.subFormLoad(entity),
      expires: [entity.expires, [Validators.required]],
      price: [entity.price, [Validators.required, Validators.min(1)]],
      interest: [entity.interest, [Validators.required]],
    })
  }

  subFormLoad(entity: MonthlyFixedExpenseDto) {
    return this.subForm = this._fb.group({
      benefitedKey: ['', []],
      expenseDay: [entity.expires, []],
      interest: [entity.interest, []],
    })
  }


  // selectedRadio(selected: number) {
  //   this.selectedPixRadio = selected;
  // }

  updateBtn() {
    this.validatorsCreditPixOthers = true;
    const interestFromFormMain = this.formMain.get('interest').value;
    this.subForm.get('interest').setValue(interestFromFormMain);

    if (this.alertSave(this.formMain)) {
      this._services.update(this.formMain);
      this.paymentBtnEnabledDisabled = true;
    }

  }

}
