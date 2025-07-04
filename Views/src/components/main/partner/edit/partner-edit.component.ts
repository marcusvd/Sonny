
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';


import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EntityTypeEnumDto } from 'src/components/main/inheritances/dtos/enum/entity-type.enum-dto';
import { PartnerEditService } from 'src/components/main/partner/edit/services/partner-edit.service';
import { AddressComponent } from 'src/shared/components/address/component/address.component';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BusinessData } from 'src/shared/components/administrative/name-cpf-cnpj/dto/business-data';
import { NameCpfCnpjComponent } from 'src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { ContactComponent } from 'src/shared/components/contact/component/contact.component';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { IsMobileNumberPipe } from '../../../../shared/pipes/is-mobile-number.pipe';
import { FinancialInfoTypeComponent } from '../../customer/components/commons-components/financial-info-type/financial-info-type.component';
import { MainEntitiesBaseComponent } from '../../inheritances/main-entities-base/main-entities-base.component';
import { PhysicallyMovingCostsComponent } from '../../inheritances/physically-moving-costs/physically-moving-costs.component';
import { PhysicallyMovingCostsService } from '../../inheritances/physically-moving-costs/service/physically-moving-costs.service';
import { PartnerDto } from '../dtos/partner-dto';
import { PartnerPaymentBankAccountDto } from '../commons-components/dtos/partner-payment-bank-account-dto';
import { PartnerPaymentPixDto } from '../commons-components/dtos/partner-payment-pix-dto';
import { PaymentDataComponent } from '../commons-components/payment/payment-data.component';




@Component({
  selector: 'partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css'],
  standalone: true,
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
    BtnGComponent,

  ],
  providers:[
    IsMobileNumberPipe
  ]
})
export class PartnerEditComponent extends BaseForm implements OnInit {

  title: string = "Parceiros";
  subTitle: string = 'Cadastro Parceiro';

  address: FormGroup;
  contact: FormGroup;

  screenFieldPosition: string = 'row';

  constructor(
    private _fb: FormBuilder,
    private _actRouter: ActivatedRoute,
    private _partnerEditService: PartnerEditService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _isMobileNumberPipe: IsMobileNumberPipe,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,

  ) {super()}



  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
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

    this.address.get('zipcode').setValue(data.cep);
    this._addressService.query(data.cep)
    this.address.get('number').setValue(data.numero);
    this.address.get('id').setValue(0);
  }

  setContactForm(data: BusinessData) {

    this.contact.get('id').setValue(0);
    this.contact.get('email').setValue(data.email);

  const isMobile = this._isMobileNumberPipe.transform(data.telefone)

    if (isMobile.isMobile)
      this.contact.get('cel')?.setValue(isMobile.phoneNum);
    else
      this.contact.get('landline')?.setValue(isMobile.phoneNum);



  }

  paymentDataForm: FormGroup;
  pixes: FormGroup;
  bankAccount: FormGroup;
  formLoad(partner?: PartnerDto) {
    this.formMain = this._fb.group({
      id: [partner?.id, [Validators.required]],
      name: [partner?.name, [Validators.required, Validators.maxLength(100)]],
      companyId: [partner?.companyId, [Validators.required]],
      registered: [partner?.registered, [Validators.required]],
      cnpj: [partner?.cnpj, [Validators.required]],
      responsible: [partner?.responsible, [Validators.required, Validators.maxLength(100),]],
      businessLine: [partner?.businessLine, [Validators.required, Validators.maxLength(100)]],
      entityType: [partner?.entityType === EntityTypeEnumDto.PJ ? true : false, []],
      partnerBusiness: [partner?.partnerBusiness, []],
      description: [partner?.description, [Validators.maxLength(2000)]],
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(partner?.physicallyMovingCosts),
      address: this.address = this._addressService.formLoad(partner?.address),
      contact: this.contact = this._contactService.formLoad(partner?.contact),
      paymentsData: this.paymentDataForm = this._fb.group({
        id: [partner?.paymentsData?.id || 0, [Validators.required]],
        pixes: this._fb.array([]),
        banksAccounts: this._fb.array([]),
        fakeOthers:[partner?.paymentsData?.others?.length > 0 ? true : false, []],
        others: [partner?.paymentsData?.others, []],
        money: [partner?.paymentsData?.money, []],
      })
    })
  }

  rows: number = 0;
  calcRows(value: string) {
    this.rows = value.length / 80;
  }

  getEntityId(id: number) {

    const partner: Observable<PartnerDto> = this._partnerEditService.loadById$('GetPartnerByIdAllIncluded', id.toString());

    partner.subscribe(x => {
      this.formLoad(x);
      this._contactService.seedingSocialnetworks(x.contact.socialMedias);
      this.seedPix(x?.paymentsData?.pixes);
      this.seedbankAccount(x?.paymentsData?.banksAccounts);
      this.calcRows(x.description)
    });

  }

  get pixesFormArray() {
    return this.paymentDataForm.get('pixes') as FormArray
  }

  addPix() {
    this.pixesFormArray.push(this.pixesFormGroup())
  }

  removePix(index: number) {
    this.pixesFormArray.removeAt(index);
  }

  pixesFormGroup(value?: PartnerPaymentPixDto) {
    return this.pixes = this._fb.group({
      id: [value?.id || 0, [Validators.required]],
      key: [value?.key || '', [Validators.required]],
      value: [value?.value || '', [Validators.required]],
      holder: [value?.holder || '', [Validators.maxLength(250)]],
    })
  }

  seedPix(value: PartnerPaymentPixDto[]) {
    value?.forEach(x => {
      this.pixesFormArray.push(this.pixesFormGroup(x))
    })
  }

  get bankAccountFormArray() {
    return this.paymentDataForm.get('banksAccounts') as FormArray
  }

  addBank() {
    this.bankAccountFormArray.push(this.bankAccountFormGroup())
  }

  removeBank(index: number) {
    this.bankAccountFormArray.removeAt(index);
  }

  bankAccountFormGroup(value?: PartnerPaymentBankAccountDto) {
    return this.bankAccount = this._fb.group({
      id: [value?.id || 0, []],
      holder: [value?.holder || '', [Validators.required]],
      institution: [value?.institution || '', [Validators.required]],
      agency: [value?.agency || '', [Validators.required]],
      account: [value?.account || '', [Validators.required]],
      type: [value?.type || '', [Validators.required]],
    })
  }

  seedbankAccount(value: PartnerPaymentBankAccountDto[]) {
    value?.forEach(x => {
      this.bankAccountFormArray.push(this.bankAccountFormGroup(x))
    })
  }

  update() {

    if (this.formMain.get('businessLine').value.toLocaleLowerCase() === 'selecione uma opção')
      this.formMain.get('businessLine').setErrors({ changeOpt: true })

    if (this.alertSave(this.formMain))
      this._partnerEditService.update(this.formMain);

  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);

  }

}
