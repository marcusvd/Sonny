import { BreakpointObserver } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule as MatButtonModule } from "@angular/material/button";
import { MatCardModule as MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule } from "@angular/router";


import { MainEntitiesBaseComponent } from "../../../../../components/main/inheritances/main-entities-base/main-entities-base.component";
import { PhysicallyMovingCostsComponent } from "../../../../../components/main/inheritances/physically-moving-costs/physically-moving-costs.component";
import { PhysicallyMovingCostsService } from "../../../../../components/main/inheritances/physically-moving-costs/service/physically-moving-costs.service";
import { AddressComponent } from "../../../../../shared/components/address/component/address.component";
import { AddressService } from "../../../../../shared/components/address/services/address.service";

import { BusinessData } from "../../../../../shared/components/administrative/name-cpf-cnpj/dto/business-data";
import { NameCpfCnpjComponent } from "../../../../../shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component";
import { BtnGComponent } from "../../../../../shared/components/btn-g/btn-g.component";
import { ContactComponent } from "../../../../../shared/components/contact/component/contact.component";
import { ContactService } from "../../../../../shared/components/contact/services/contact.service";
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';

import { SubTitleComponent } from "../../../../../shared/components/sub-title/default/sub-title.component";
import { TitleComponent } from "../../../../../shared/components/title/default-title/title.component";
import { IsMobileNumberPipe } from "../../../../../shared/pipes/is-mobile-number.pipe";
import { ValidatorsCustom } from "../../../../../shared/helpers/validators/validators-custom";
import { FinancialInfoTypeComponent } from "../commons-components/financial-info-type/financial-info-type.component";
import { AddCustomerService } from "./services/add-customer.service";
import { AddDefaultImports, AddDefaultProviders } from "../../../../imports/components-default.imports";
import { AddCustomersImports, AddCustomersProviders } from "./imports/add-customer.imports";


@Component({
  selector: 'add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  standalone: true,
  imports: [
    AddCustomersImports,
    AddDefaultImports,
  ],
  providers: [
    AddCustomersProviders,
    AddDefaultProviders,
  ]
})

export class AddCustomerComponent extends BaseForm implements OnInit {

  title: string = 'Cadastro';
  subTitle: string = 'Cliente';
  borderAround: boolean = false;

  screenFieldPosition: string = 'row';

  address: FormGroup;
  contact: FormGroup;

  constructor(
    private _customerService: AddCustomerService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _isMobileNumberPipe: IsMobileNumberPipe,
    private _fb: FormBuilder,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,

  ) { super() }

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
      this.formMain.get('responsible')?.setValue(data.qsa[0].nome);
    else
      this.formMain.get('responsible')?.setValue(data.nome);

    this.formMain.get('name')?.setValue(data.nome);
    this.formMain.get('businessLine')?.setValue(data.atividade_principal[0].text);
  }


  setAddressForm(data: BusinessData) {
    this.address.reset();
    this.address.get('zipcode')?.setValue(data.cep);
    this._addressService.query(data.cep)
    this.address.get('number')?.setValue(data.numero);
    this.address.get('id')?.setValue(0);
  }

  setContactForm(data: BusinessData) {
    this.contact.reset();
    this.contact.get('id')?.setValue(0);
    this.contact.get('email')?.setValue(data.email);

    const isMobile = this._isMobileNumberPipe.transform(data.telefone)

    if (isMobile.isMobile)
      this.contact.get('cel')?.setValue(isMobile.phoneNum);
    else
      this.contact.get('landline')?.setValue(isMobile.phoneNum);

  }


  save() {

    if (this.alertSave(this.formMain)) {
      this._customerService.save(this.formMain);
      this.formLoad();
    }
  }

  additionalCosts: FormGroup;
  formLoad(): FormGroup {
    return this.formMain = this._fb.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      cnpj: ['', []],
      responsible: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      businessLine: ['', [Validators.required, Validators.maxLength(150)]],
      assured: [false, []],
      entityType: [true, []],
      payment: new FormControl({ value: 0, disabled: true }, Validators.required),
      expiration: new FormControl({ value: 0, disabled: true }, Validators.required),
      registered: [new Date(), [Validators.required]],
      discount: [0, []],
      additionalCosts: this.additionalCosts = this._fb.group({
        fixedPhysicallyMovingCosts: new FormControl({ value: 0, disabled: true }, Validators.required)
      }),
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(),
      address: this.address = this._addressService.formLoad(),
      contact: this.contact = this._contactService.formLoad()
    })
  }

  ngOnInit(): void {
    this.formLoad();
  }

}







