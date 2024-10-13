import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { FinancingsLoansExpensesDto } from '../../dto/financings-loans-expenses-dto';
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
    PixesExpensesFieldsComponent
  ],
  templateUrl: './payment-financings-loans-expenses-installment.component.html',
  styleUrls: ['./payment-financings-loans-expenses-installment.component.css'],
  providers: [PaymentFinancingsLoansInstallmentService]
})


export class PaymentFinancingsLoansComponent extends Add {

  fields: HtmlDataInfoDto[] = [];
  hideShowScreenDataInfo = true;
  validatorsCreditPixOthers: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentFinancingsLoansInstallmentService,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.formLoad(obj['entity'].entity as FinancingsLoansExpensesDto)
      this.hideShowScreenDataInfo = obj['entity'].hideShowScreenDataInfo;
      this.fields = obj['entity'].screenInfoFields as HtmlDataInfoDto[];
    }
  }

  formLoad(entity: FinancingsLoansExpensesDto) {
    this.formMain = this._fb.group({
      // id: [entity.id, []],
      // userId: [this.userId, [Validators.required, Validators.min(1)]],
      // companyId: [this.companyId, [Validators.required]],
      // start: [entity.start, [Validators.required]],
      // end: [entity.end, [Validators.required]],
      // installmentNumber: [entity.installmentNumber, [Validators.required]],
      // installmentId: [entity.installmentId, [Validators.required]],
      // currentInstallment: [entity.currentInstallment, [Validators.required]],
      // name: [entity.name, [Validators.required]],
      // categoryExpenseId: [entity.categoryExpenseId, [Validators.required, Validators.maxLength(150)]],
      // subcategoryExpenseId: [entity.subcategoryExpenseId, [Validators.required, Validators.maxLength(150)]],
      // bankAccountId: [entity.bankAccountId, [Validators.required]],
      // cardId: [entity.cardId, [Validators.required]],
      // pixId: [entity.pixId, [Validators.required]],
      // pixExpense: this.subFormLoad(),
      // othersPaymentMethods: [entity.othersPaymentMethods, [Validators.required]],
      // description: [entity.description, [Validators.maxLength(150)]],
      // expires: [entity.expires, [Validators.required]],
      // price: [entity.price, [Validators.required, Validators.min(1)]],
      // interest: [entity.interest, [Validators.required]],
      // linkCopyBill: [entity.linkCopyBill, [Validators.maxLength(350)]],
      // userLinkCopyBill: [entity.userLinkCopyBill, [Validators.maxLength(50)]],
      // passLinkCopyBill: [entity.passLinkCopyBill, [Validators.maxLength(20)]],
    })
  }

  subFormLoad() {
    return this.subForm = this._fb.group({
      benefitedKey: ['', []],
      expenseDay: ['', []],
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
