
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnGComponent } from '../../../../../src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from '../../../../../src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { BaseForm } from '../../../../../src/shared/components/inheritance/forms/base-form';

import { SubTitleComponent } from '../../../../../src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from '../../../../../src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from '../../../../../src/shared/helpers/validators/validators-messages';

import { TypeCardDtoEnum } from '../../../../../src/components/financial/components/bank-account-cards/dto/enums/type-card-dto.enum';
import { SelectedPaymentDto } from '../../get-entities/bank-account/dto/selected-payment-dto';
import { FieldsScreenPayment } from './models/fields-screen-payment';
import { FormBase } from './models/form-base';
// import { ItemsHtmlToVisible } from './models/items-html-to-visible';
import { PaymentFieldsComponent } from './payment-fields.component';
import { PaymentScreenDataComponent } from './payment-screen-data.component';
import { PaymentService } from './services/payment.service';


@Component({
  selector: 'pay-fixed-bills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    MatButtonModule,
    MatCardModule,
    CurrencyMaskModule,
    BtnGComponent,
    SubTitleComponent,
    TitleComponent,
    BankAccountMatSelectSingleComponent,
    PaymentScreenDataComponent,
    PaymentFieldsComponent
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [
    PaymentService,
  ]
})

export class PaymentComponent extends BaseForm implements OnInit {

  fields: FieldsScreenPayment[] = [];
  urlBackend: string = '';
  formFields: FormBase<string>[] = [];
  cardType = TypeCardDtoEnum.Debit;
  // itemsHtmlToVisible = new ItemsHtmlToVisible();
  constructor(
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _services: PaymentService,


  ) {

    super()

    if (this._router.getCurrentNavigation()?.extras.state) {
      const obj = this._router.getCurrentNavigation()?.extras.state;
      if (obj) {
        this.urlBackend = obj['entity'].urlBackend as string;
        this.fields = obj['entity'].screenInfoFields as FieldsScreenPayment[];
        this.formFields = obj['entity'].form as FormBase<string>[];
        this.formMain = this.toFormGroup(obj['entity'].form as FormBase<string>[]);
      }
      // this.defaultItemsHtmlToVisible(obj['entity'].itemsHtmlToVisible as ItemsHtmlToVisible);

    }
  }


  toFormGroup(form: FormBase<string>[]) {
    const group: any = {};

    form.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required) : new FormControl(field.value || '');
    });

    return new FormGroup(group);
  }

  // defaultItemsHtmlToVisible(visibleHtml: ItemsHtmlToVisible) {

  //   if (visibleHtml)
  //     this.itemsHtmlToVisible = visibleHtml;
  // }



  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  onSelectedBanckAccountelected(bankAccount: any) {
    console.log(bankAccount)
  }

  // formIsValid(value: boolean) {
  //   // console.log(value)
  // }

  makeEntityToUpdate(entity: SelectedPaymentDto) {
    console.log(entity)
    this.formMain.get('bankAccountId')?.setValue(entity.idBankAccount);

    if (entity.idPix) {
      this.formMain.get('pixId')?.setValue(entity.idPix);
      this.formIsValid('pixId');
    }

    if (entity.others) {
      this.formMain.get('othersPaymentMethods')?.setValue(entity.others);
      this.formIsValid('othersPaymentMethods');
    }

    if (this.formMain.get('pixId')?.value == '')
      this.formMain.get('pixId')?.setValue(null);

    // if (this.formMain.get('cardId').value == '')
    // this.formMain.get('cardId').setValue(null);

  }

  formIsValid(value: string) {

    if (value === 'Pix') {
      this.addValidators(this.formMain, ['pixId']);
      this.removeValidators(this.formMain, ['othersPaymentMethods']);

    }
    if (value === 'othersPaymentMethods') {
      this.addValidators(this.formMain, ['othersPaymentMethods']);
      this.removeValidators(this.formMain, ['pixId']);
    }

  }

  // override addValidators(field: string) {
  //    this.formMain.get(field).setValidators(Validators.required);
  //    this.formMain.get(field).updateValueAndValidity();
  //  }

  // removeValidators(field: string) {
  //   this.formMain.get(field).setValue(null);
  //   this.formMain.get(field).removeValidators(Validators.required);
  //   this.formMain.get(field).updateValueAndValidity();
  // }


  checkIsValid: boolean = false;
  updateBtn() {

    // this.makeEntityToUpdate();
    console.log(this.formMain.valid)
    // if (this.formMain.valid) {
    //  // this.checkIsValid = true;
    //   if (this.alertSave(this.formMain)) {
    //     this._services.update(this.urlBackend, this.formMain);
    //   }
    // }

  }

  ngOnInit(): void {

  }

}
