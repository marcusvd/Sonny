import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';


import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { AddressComponent } from 'src/shared/components/address/component/address.component';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BusinessData } from 'src/shared/components/administrative/name-cpf-cnpj/dto/business-data';
import { NameCpfCnpjComponent } from 'src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { ContactComponent } from 'src/shared/components/contact/component/contact.component';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { PhoneHandlers } from "src/shared/helpers/handlers/phone-handlers";
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FinancialInfoTypeComponent } from '../../customer/components/commons-components/financial-info-type/financial-info-type.component';
import { MainEntitiesBaseComponent } from '../../inheritances/main-entities-base/main-entities-base.component';
import { PhysicallyMovingCostsComponent } from '../../inheritances/physically-moving-costs/physically-moving-costs.component';
import { PhysicallyMovingCostsService } from '../../inheritances/physically-moving-costs/service/physically-moving-costs.service';
import { PaymentDataComponent } from '../commons-components/payment/payment-data.component';
import { PartnerCreateService } from './services/partner-create.service';
@Component({
    selector: 'partner-create',
    templateUrl: './partner-create.component.html',
    styleUrls: ['./partner-create.component.css'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatTooltipModule,
        NameCpfCnpjComponent,
        TitleComponent,
        SubTitleComponent,
        MainEntitiesBaseComponent,
        DescriptionFieldComponent,
        FinancialInfoTypeComponent,
        PhysicallyMovingCostsComponent,
        ContactComponent,
        AddressComponent,
        PaymentDataComponent,
        NameCpfCnpjComponent,
        BtnGComponent
    ]
})
export class PartnerCreateComponent extends BaseForm implements OnInit {

  // messageTooltipBusinessLineOther = 'Para um novo segmento, selecione "OUTROS" no menu esquerdo.'

  // private toolTipsMessages = ToolTips;
  // get matTooltip() {
  //   return this.toolTipsMessages
  // }

  title: string = "Parceiros";
  subTitle: string = 'Cadastro Parceiro';

  address: FormGroup;
  contact: FormGroup;

  screenFieldPosition: string = 'row';


  // startDate = new Date(2021, 0, 1);

  constructor(
    private _fb: FormBuilder,
    private _partnerCreateService: PartnerCreateService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // get specificBusinessLine(){
  //   return this._partnerCreateService.businesslineArray
  // }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            break;
          }
        }
      }
    })
  }

  cpfCnpjBusinessData(data: BusinessData) {

    this.setFormMain(data);
    this.setAddressForm(data);
    this.setContactForm(data);

  }

  setFormMain(data: BusinessData) {
    if (data.qsa.length > 0)
      this.formMain.get('responsible').setValue(data.qsa[0].nome);
    else
      this.formMain.get('responsible').setValue(data.nome);

    this.formMain.get('name').setValue(data.nome);
    this.formMain.get('businessLine').setValue(data.atividade_principal[0].text);
  }

  setAddressForm(data: BusinessData) {
    this.address.reset();
    this.address.get('zipcode').setValue(data.cep);
    this._addressService.query(data.cep)
    this.address.get('number').setValue(data.numero);
    this.address.get('id').setValue(0);
  }

  setContactForm(data: BusinessData) {
    this.contact.reset();
    this.contact.get('id').setValue(0);
    this.contact.get('email').setValue(data.email);

    const isMobile = PhoneHandlers.handlerApiPhoneNumberFromReceitaWs(data.telefone)

    if (isMobile.isMobile)
      this.contact.get('cel').setValue(isMobile.phoneNum);
    else
      this.contact.get('landline').setValue(isMobile.phoneNum);

    this.validatorCustom.atLeastOneValidationBlur(this.contact, ['cel', 'zap', 'landline']);

  }

  paymentDataForm: FormGroup;
  pixes: FormGroup;
  bankAccount: FormGroup;
  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      registered: [new Date(), [Validators.required]],
      cnpj: ['', [Validators.required]],
      responsible: ['', [Validators.required, Validators.maxLength(100),]],
      businessLine: ['', [Validators.required, Validators.maxLength(100)]],
      entityType: [true, []],
      partnerBusiness: [6, []],
      description: ['', [Validators.maxLength(1000)]],
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(),
      address: this.address = this._addressService.formLoad(),
      contact: this.contact = this._contactService.formLoad(),
      paymentsData: this.paymentDataForm = this._fb.group({
        pixes: this._fb.array([]),
        banksAccounts: this._fb.array([]),
        fakeOthers: [false, []],
        others: [null, []],
        money: [true, []],
      })
    })
  }

  // get pixesFormArray() {
  //   return this.paymentDataForm.get('pixes') as FormArray
  // }

  // addPix() {
  //   this.pixesFormArray.push(this.pixesFormGroup())
  // }

  // removePix(index: number) {
  //   this.pixesFormArray.removeAt(index);
  // }

  // pixesFormGroup() {
  //   return this.pixes = this._fb.group({
  //     id: [0, [Validators.required]],
  //     key: ['', [Validators.required]],
  //     value: ['', [Validators.required]],
  //     holder: ['', [Validators.maxLength(250)]],
  //   })
  // }

  get bankAccountFormArray() {
    return this.paymentDataForm.get('banksAccounts') as FormArray
  }


  addBank() {
    this.bankAccountFormArray.push(this.bankAccountFormGroup())
  }

  removeBank(index: number) {
    this.bankAccountFormArray.removeAt(index);
  }

  bankAccountFormGroup() {
    return this.bankAccount = this._fb.group({
      id: [0, []],
      holder: ['', [Validators.required]],
      institution: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      account: ['', [Validators.required]],
      type: ['', [Validators.required]],
    })
  }


  save() {

    if (this.formMain.get('businessLine').value.toLocaleLowerCase() === 'selecione uma opção') {
      this.formMain.get('businessLine').setErrors({ changeOpt: true })
    }

    if (this.alertSave(this.formMain)) {
      this._partnerCreateService.save(this.formMain);
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
