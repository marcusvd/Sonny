
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AddressService } from '../../../../shared/components/address/services/address.service';
import { BusinessData } from '../../../../shared/components/administrative/name-cpf-cnpj/dto/business-data';
import { ContactService } from '../../../../shared/components/contact/services/contact.service';
import { BaseForm } from '../../../../shared/components/inheritance/forms/base-form';
import { AddDefaultImports, AddDefaultProviders } from '../../../../components/imports/components-default.imports';
import { PhysicallyMovingCostsService } from '../../inheritances/physically-moving-costs/service/physically-moving-costs.service';
import { AddPartnerService } from './services/add-partner.service';
import { IsMobileNumberPipe } from '../../../../shared/pipes/is-mobile-number.pipe';
import { AddPartnerImports,  AddPartnerProviders } from '../add/imports/add-partner.imports';

@Component({
  selector: 'add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css'],
  standalone: true,
  imports: [
       AddDefaultImports,
       AddPartnerImports
  ],
  providers:[
    AddDefaultProviders,
    AddPartnerProviders
  ]
})
export class AddPartnerComponent extends BaseForm implements OnInit {

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
    private _partnerService: AddPartnerService,
    private _isMobileNumberPipe: IsMobileNumberPipe,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,

  ) {super()}



  // get specificBusinessLine(){
  //   return this._partnerCreateService.businesslineArray
  // }



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

    const isMobile = this._isMobileNumberPipe.transform(data.telefone)

    if (isMobile.isMobile)
      this.contact.get('cel')?.setValue(isMobile.phoneNum);
    else
      this.contact.get('landline')?.setValue(isMobile.phoneNum);


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
      this._partnerService.save(this.formMain);
    }

  }

  ngOnInit(): void {
    this.formLoad();

  }

}
