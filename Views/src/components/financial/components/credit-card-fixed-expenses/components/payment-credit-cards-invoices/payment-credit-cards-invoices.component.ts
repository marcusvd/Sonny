
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { PriceInteresFieldsComponent } from '../../../common-components/price-interest-fields/price-interest-fields.component';


import { DefaultComponent } from 'src/shared/components/default-component/default-component';
import { ItemsViewInterface } from 'src/shared/components/view-default/interfaces/items-view.interface';
import { ViewDefaultComponent } from 'src/shared/components/view-default/view-default.component';
import { BankCardNumberPipe } from 'src/shared/pipes/bank-card-number.pipe';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CreditCardExpenseInvoiceDto } from '../list-invoices/dto/credit-card-expense-invoice-dto';
import { PaymentCreditCardsInvoicesService } from './services/payment-credit-cards-invoices.service';

@Component({
  selector: 'payment-credit-cards-invoices',
  standalone: true,
  imports: [
    DefaultComponent,
    CommonModule,
    MatCardModule,
    BankAccountMatSelectSingleComponent,
    PriceInteresFieldsComponent,
    ViewDefaultComponent,
    BtnGComponent
  ],
  templateUrl: './payment-credit-cards-invoices.component.html',
  styleUrls: ['./payment-credit-cards-invoices.component.css'],
  providers: [PaymentCreditCardsInvoicesService, PtBrDatePipe, PtBrCurrencyPipe, BankCardNumberPipe]
})


export class PaymentCreditCardsInvoicesComponent extends Add {

  validatorsCreditPixOthers: boolean = false;
  monthsString: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  entity: CreditCardExpenseInvoiceDto = null;
  itemsToView: ItemsViewInterface[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: PaymentCreditCardsInvoicesService,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _bankCardNumberPipe: BankCardNumberPipe

  ) {

    super()

    if (this._router?.getCurrentNavigation()?.extras?.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.entity = obj as CreditCardExpenseInvoiceDto;
      this.formLoad(this.entity)
    }

    this.itemsToView.push({ key: 'Fatura mês:', value: this.monthsString[new Date(this.entity?.card.expiresDate).getMonth()], classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Número Cartão:', value: this._bankCardNumberPipe.transform(this.entity.card.number), classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Bandeira:', value: this.entity.card.flag, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Banco:', value: this.entity.card.bankAccount.institution, classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Vencimento:', value: this._ptBrDatePipe.transform(this.entity.card.expiresDate, 'Date'), classValue: 'font-bold' });
    this.itemsToView.push({ key: 'Valor fatura:', value: _ptBrCurrencyPipe.transform(this.entity.price), classValue: 'text-red-700 font-bold' });

  }


  formLoad(entity: CreditCardExpenseInvoiceDto) {

    this.formMain = this._fb.group({
      id: [entity.id, [Validators.required]], // Agora inicializado corretamente como um número
      userId: [this.userId ?? entity.userId, [Validators.required, Validators.min(1)]],
      companyId: [entity.companyId, [Validators.required]],
      paidFromBankAccountId: [entity.paidFromBankAccountId, [Validators.required]],
      cardId: [entity.cardId, [Validators.required]],
      description: [entity.description, [Validators.maxLength(150)]],
      document: [entity.document, [Validators.maxLength(150)]],
      expires: [entity.expires, [Validators.required]],
      closingDate: [entity.closingDate, [Validators.required]],
      registered: [entity.registered, [Validators.required]],
      price: [entity.price, [Validators.required, Validators.min(1)]],
      interest: [entity.interest, [Validators.required]],
    });


    console.log(this.formMain.value)

  }

  updateBtn() {

    // console.log(this.entity.paidFromBankAccountId)
    // this.formMain.setValue({
    //   id: this.entity.id,
    //   userId: this.entity.userId,
    //   companyId: this.entity.companyId,
    //   paidFromBankAccountId: this.entity.paidFromBankAccountId,
    //   cardId: this.entity.cardId,
    //   othersPaymentMethods: this.entity.othersPaymentMethods,
    //   description: this.entity.description,
    //   document: this.entity.document,
    //   expires: this.entity.expires,
    //   closingDate: this.entity.closingDate,
    //   registered: this.entity.registered,
    //   price: this.entity.price,
    //   interest: this.entity.interest,
    // })



    console.log(this.formMain.value)
      //  console.log(this.formLoad(this.entity).value)
    // this.validatorsCreditPixOthers = true;

    // if (this.alertSave(this.formMain)) {
    //  this.formMain.get('cardId').setValue(this.entity.cardId);
    //   this._services.update(this.formMain);
    //   this.saveBtnEnabledDisabled = true;
    // }

  }

}
