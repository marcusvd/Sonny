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
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { SelectedPaymentDto } from 'src/shared/components/get-entities/bank-account/dto/dto/selected-payment-dto';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { MonthFixedExpensesDto } from '../../month-fixed-expenses/dto/month-fixed-expenses-dto';
import { MonthFixedExpensesTrackingDto } from '../dto/month-fixed-expenses-tracking-dto';
import { FieldsScreenPayment } from './interface/fields-screen-payment';
import { PaymentMonthFixedBtnsFieldsComponent } from './payment-month-fixed-btns-fields.component';
import { PaymentScreenData } from './payment-screen-data.component';
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
    BtnGComponent,
    SubTitleComponent,
    TitleComponent,
    BankAccountMatSelectSingleComponent,
    PaymentScreenData,
    PaymentMonthFixedBtnsFieldsComponent
  ],
  templateUrl: './pay-fixed-bills.component.html',
  styleUrls: ['./pay-fixed-bills.component.css'],
  providers: [
    PayFixedBillsService,
    PtBrCurrencyPipe,
    PtBrDatePipe
  ]
})

export class PayFixedBillsComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _services: PayFixedBillsService,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _PtBrDatePipe: PtBrDatePipe,
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);
  }

  fixedExpenses: MonthFixedExpensesDto = null;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  fxLayout: string = 'row';

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.fxLayout = 'column';
            break;
          }
          case 'small': {
            this.fxLayout = 'column';
            break;
          }
          case 'medium': {
            this.fxLayout = 'row';
            break;
          }
          case 'large': {
            this.fxLayout = 'row';
            break;
          }
          case 'xlarge': {
            this.fxLayout = 'row';
            break;
          }
        }
      }
    })
  }

  formLoad(entity?: MonthFixedExpensesTrackingDto) {
    return this.formMain = this._fb.group({
      id: [entity.id, [Validators.required]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      userId: [JSON.parse(localStorage.getItem('userId')), [Validators.required] || 0, []],
      monthFixedExpensesId: [entity?.monthFixedExpensesId, []],
      bankAccountId: [entity?.bankAccountId, []],
      pixId: [entity?.pixId || null, []],
      othersPaymentMethods: [entity?.othersPaymentMethods || 0, []],
      cardId: [entity?.cardId || null, []],
      wasPaid: [new Date(), []],
      expiration: [entity.expiration, [Validators.required]],
      price: [entity?.price, [Validators.required, Validators.min(1)]],
      interest: [entity?.interest || 0, [Validators.min(0)]],
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

  fields: FieldsScreenPayment[] = [];
  getEntity(id: string) {
    this._services.loadById$<MonthFixedExpensesTrackingDto>('GetFixedExpensesTrackingByIdAllIncluded', id).subscribe(x => {
      this.fixedExpenses = x.monthFixedExpenses;
      this.formLoad(x);
      console.log(x.monthFixedExpenses.categoryExpenses.name)
      // Adicione um campo 'order' para cada campo no objeto 'fields'
      this.fields = [
        { label: 'Descrição', value: x.monthFixedExpenses.description, order: 2 },
        { label: 'Categoria', value: x.monthFixedExpenses.categoryExpenses.name, order: 3 },
        { label: 'Subcategoria', value: x.monthFixedExpenses.subcategoryExpenses.name, order: 4 },
        { label: 'Vencimento', value: this._PtBrDatePipe.transform(x.monthFixedExpenses.expiration, 'Date'), order: 5 },
        { label: 'Valor', value: this._ptBrCurrencyPipe.transform(x.monthFixedExpenses.price), order: 6 }
      ];

      // Ordene o objeto 'fields' com base no campo 'order'
      this.fields.sort((a, b) => a.order - b.order);

      //this.fields = {'1':'order', 'Descrição': x.monthFixedExpenses.description, '2':'order', 'Categoria': x.monthFixedExpenses.categoryExpenses.name, '3':'order','Subcategoria': x.monthFixedExpenses.subcategoryExpenses.name, '4':'order','Vencimento': this._PtBrDatePipe.transform(x.monthFixedExpenses.expiration, 'Date'), '5':'order','Valor': this._ptBrCurrencyPipe.transform(x.monthFixedExpenses.price) };



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

  }

  // updateBtn(entity: SelectedPaymentDto) {

  updateBtn() {
    this.checkIsValid = true;
    if (this.btnPayEnable) {
      if (this.alertSave(this.formMain)) {
        this._services.update(this.formMain);
      }
    }

  }

  ngOnInit(): void {

    const id: string = this._actRoute.snapshot.params['id'];
    this.getEntity(id);
    this.screen();

  }

}
