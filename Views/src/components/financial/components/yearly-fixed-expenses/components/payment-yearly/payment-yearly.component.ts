import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PriceInteresFieldsComponent } from '../../../common-components/price-interest-fields/price-interest-fields.component';
import { HtmlDataInfoDto } from '../../../common-components/screen-data-info/dtos/html-data-info-dto';
import { ScreenDataInfoComponent } from '../../../common-components/screen-data-info/screen-data-info.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { PaymentYearlyService } from './services/payment-yearly.service';
import { YearlyFixedExpenseDto } from '../../dto/yearly-fixed-expense-dto';

@Component({
  selector: 'payment-yearly',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BankAccountMatSelectSingleComponent,
    ScreenDataInfoComponent,
    PriceInteresFieldsComponent,
    SubTitleComponent,
    TitleComponent,
    BtnGComponent
  ],
  templateUrl: './payment-yearly.component.html',
  styleUrls: ['./payment-yearly.component.css'],
  providers: [PaymentYearlyService]
})


export class PaymentYearlyComponent extends Add {

  fields: HtmlDataInfoDto[] = [];
  hideShowScreenDataInfo = true;
  validatorsCreditPixOthers: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentYearlyService,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.formLoad(obj['entity'].entity as YearlyFixedExpenseDto)
      this.hideShowScreenDataInfo = obj['entity'].hideShowScreenDataInfo;
      this.fields = obj['entity'].screenInfoFields as HtmlDataInfoDto[];
    }
  }

  formLoad(entity: YearlyFixedExpenseDto) {
    this.formMain = this._fb.group({
      id: [entity.id, []],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      companyId: [this.companyId, [Validators.required]],
      name: [entity.name, []],
      categoryExpenseId: [entity.categoryExpenseId, [Validators.required, Validators.maxLength(150)]],
      subcategoryExpenseId: [entity.subcategoryExpenseId, [Validators.required, Validators.maxLength(150)]],
      bankAccountId: [entity.bankAccountId, [Validators.required]],
      cardId: [entity.cardId, [Validators.required]],
      pixId: [entity.pixId, [Validators.required]],
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

  updateBtn() {
    
    this.validatorsCreditPixOthers = true;

    if (this.alertSave(this.formMain)) {
      this._services.update(this.formMain);
      this.saveBtnEnabledDisabled = true;
    }

  }

}