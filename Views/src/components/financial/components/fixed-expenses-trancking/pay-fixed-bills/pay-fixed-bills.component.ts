import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnCancelGComponent } from 'src/shared/components/btn-cancel-g/btn-cancel-g.component';
import { BtnDeleteGComponent } from 'src/shared/components/btn-delete-g/btn-delete-g.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { SelectedPaymentDto } from 'src/shared/components/get-entities/bank-account/dto/dto/selected-payment-dto';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CyclePaymentPipe } from '../../common-components/pipes/cycle-payment.pipe';
import { FixedExpensesDto } from '../../fixed-expenses/dto/fixed-expenses-dto';
import { FixedExpensesTrackingDto } from '../dto/fixed-expenses-tracking-dto';
import { PayFixedBillsService } from './services/pay-fixed-bills.service';

@Component({
  selector: 'pay-fixed-bills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    CurrencyMaskModule,
    PtBrCurrencyPipe,
    PtBrDatePipe,
    CyclePaymentPipe,
    BtnGComponent,
    SubTitleComponent,
    TitleComponent,
    BtnCancelGComponent,
    BtnDeleteGComponent,
    BankAccountMatSelectSingleComponent
  ],
  templateUrl: './pay-fixed-bills.component.html',
  styleUrls: ['./pay-fixed-bills.component.css'],
  providers: [
    PayFixedBillsService,
    CyclePaymentPipe
  ]
})

export class PayFixedBillsComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _services: PayFixedBillsService,
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);
  }

  fixedExpenses: FixedExpensesDto = null;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  formLoad(entity?: FixedExpensesTrackingDto) {
    return this.formMain = this._fb.group({
      id: [entity.id, [Validators.required]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      userId: [JSON.parse(localStorage.getItem('userId')), [Validators.required] || 0, []],
      fixedExpensesId: [entity?.fixedExpensesId, []],
      bankAccountId: [entity?.bankAccountId, []],
      pixId: [entity?.pixId || null, []],
      othersPaymentMethods: [entity?.othersPaymentMethods || 0, []],
      cardId: [entity?.cardId || null, []],
      wasPaid: [new Date(), []],
      price: [entity?.price, []],
      interest: [entity?.interest || 0, []],
    })
  }

  onSelectedBanckAccountelected(bankAccount: any) {
    console.log(bankAccount)
  }


  btnPayEnable: boolean = false;
  checkIsValid: boolean = false;
  formIsValid(value: boolean) {
    this.btnPayEnable = value;
  }


  getEntity(id: string) {
    this._services.loadById$<FixedExpensesTrackingDto>('GetFixedExpensesTrackingByIdAllIncluded', id).subscribe(x => {
      this.fixedExpenses = x.fixedExpenses;
      this.formLoad(x);
      // console.log(x);
    })
  }


  makeEntityToUpdate(entity: SelectedPaymentDto) {
    this.formMain.get('bankAccountId').setValue(entity.idBankAccount);
    this.formMain.get('pixId').setValue(entity.idPix);
    this.formMain.get('othersPaymentMethods').setValue(entity.others);
    this.formMain.get('cardId').setValue(entity.idCard);

    if (this.formMain.get('pixId').value == '')
      this.formMain.get('pixId').setValue(null);

    if (this.formMain.get('cardId').value == '')
      this.formMain.get('cardId').setValue(null);

    console.log(this.formMain.value)

  }

  updateBtn(entity: SelectedPaymentDto) {
    this.checkIsValid = true;
    if (!this.btnPayEnable) {
      if (this.alertSave(this.formMain)) {
        this._services.update(this.formMain);
      }
    }

  }


  ngOnInit(): void {

    const id: string = this._actRoute.snapshot.params['id'];
    this.getEntity(id);

  }

}
