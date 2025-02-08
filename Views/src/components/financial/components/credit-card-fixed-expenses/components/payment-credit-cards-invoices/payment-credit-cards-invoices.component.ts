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
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PriceInteresFieldsComponent } from '../../../common-components/price-interest-fields/price-interest-fields.component';
import { HtmlDataInfoDto } from '../../../common-components/screen-data-info/dtos/html-data-info-dto';
import { ScreenDataInfoComponent } from '../../../common-components/screen-data-info/screen-data-info.component';
import { CreditCardExpenseInvoiceDto } from '../../dto/credit-card-expense-invoice-dto';
import { PaymentCreditCardsInvoicesService } from './services/payment-credit-cards-invoices.service';

@Component({
  selector: 'payment-credit-cards-invoices',
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
  templateUrl: './payment-credit-cards-invoices.component.html',
  styleUrls: ['./payment-credit-cards-invoices.component.css'],
  providers: [PaymentCreditCardsInvoicesService]
})


export class PaymentCreditCardsInvoicesComponent extends Add  {

  fields: HtmlDataInfoDto[] = [];
  hideShowScreenDataInfo = true;
  validatorsCreditPixOthers: boolean = false;

  entity: CreditCardExpenseInvoiceDto = null;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentCreditCardsInvoicesService,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.entity = obj['entity'].entity as CreditCardExpenseInvoiceDto;
      this.formLoad(this.entity)
      this.hideShowScreenDataInfo = obj['entity'].hideShowScreenDataInfo;
      this.fields = obj['entity'].screenInfoFields as HtmlDataInfoDto[];
    }
  }
  
  
  formLoad(entity: CreditCardExpenseInvoiceDto) {
    console.log(entity.cardId)
    
    this.formMain = this._fb.group({
      id: [entity.id, []],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      companyId: [this.companyId, [Validators.required]],
      paidFromBankAccountId: ['' ?? entity.paidFromBankAccountId, [Validators.required]],
      cardId: [entity.cardId, [Validators.required]],
      pixId: ['', [Validators.required]],
      othersPaymentMethods: [entity.othersPaymentMethods, [Validators.required]],
      description: [entity.description, [Validators.maxLength(150)]],
      document: [this.entity.description, [Validators.maxLength(150)]],
      expires: [entity.expires, [Validators.required]],
      closingDate: [this.entity.closingDate, [Validators.required]],
      registered: [this.entity.registered, [Validators.required]],
      price: [entity.price, [Validators.required, Validators.min(1)]],
      interest: [entity.interest, [Validators.required]],
    })
  }

  updateBtn() {

    this.validatorsCreditPixOthers = true;
    
    if (this.alertSave(this.formMain)) {
      this.formMain.get('cardId').setValue(this.entity.cardId);
      this._services.update(this.formMain);
      this.saveBtnEnabledDisabled = true;
    }

  }

}