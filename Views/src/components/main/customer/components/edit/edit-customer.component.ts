import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";



import { ActivatedRoute } from "@angular/router";
import { PhysicallyMovingCostsService } from "../../../../../components/main/inheritances/physically-moving-costs/service/physically-moving-costs.service";
import { AddressService } from "../../../../../shared/components/address/services/address.service";
import { BusinessData } from "../../../../../shared/components/administrative/name-cpf-cnpj/dto/business-data";
import { ContactService } from "../../../../../shared/components/contact/services/contact.service";
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';

import { EditCustomerService } from "./services/edit-customer.service";

import { Observable } from "rxjs";
import { ValidatorsCustom } from "../../../../../shared/helpers/validators/validators-custom";
import { AddDefaultImports } from "../../../../imports/components-default.imports";
import { AddCustomersImports, AddCustomersProviders } from "../../../customer/components/add/imports/add-customer.imports";
import { CustomerDto } from "../commons-components/dtos/customer-dto";

import { IsMobileNumberPipe } from "../../../../../shared/pipes/is-mobile-number.pipe";




@Component({
  selector: 'edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  standalone: true,
  imports: [
    AddDefaultImports,
    AddCustomersImports,
  ],
  providers: [
    AddCustomersProviders,
  ]
})

export class EditCustomerComponent extends BaseForm implements OnInit {

  address: FormGroup;
  contact: FormGroup;

  constructor(
    private _customerService: EditCustomerService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _fb: FormBuilder,
    private _actRouter: ActivatedRoute,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    private _isMobileNumberPipe: IsMobileNumberPipe,

  ) { super() }

  additionalCosts: FormGroup;
  formLoad(customer?: CustomerDto): FormGroup {

    const pay = customer?.payment > 0 ? false : true;

    return this.formMain = this._fb.group({
      id: [customer?.id, [Validators.required]],
      name: [customer?.name, [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      cnpj: [customer?.cnpj, []],
      responsible: [customer?.responsible, [Validators.required, Validators.maxLength(100)]],
      description: [customer?.description, [Validators.maxLength(500)]],
      businessLine: [customer?.businessLine, [Validators.required, Validators.maxLength(150)]],
      assured: [customer?.assured, []],
      entityType: [customer?.entityType == 0 ? true : false, []],
      payment: new FormControl({ value: customer?.payment, disabled: pay }, Validators.required),
      expiration: new FormControl({ value: customer?.expiration, disabled: !customer?.assured }, Validators.required),
      registered: [customer?.registered, [Validators.required]],
      discount: [customer?.discount, []],
      additionalCosts: this.additionalCosts = this._fb.group({
        fixedPhysicallyMovingCosts: new FormControl({ value: customer?.additionalCosts?.fixedPhysicallyMovingCosts || 0, disabled: !customer?.assured }, Validators.required)
      }),
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(customer?.physicallyMovingCosts),
      address: this.address = this._addressService.formLoad(customer?.address),
      contact: this.contact = this._contactService.formLoad(customer?.contact)
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

  rows: number = 0;
  calcRows(value: string) {
    this.rows = value.length / 80;
  }

  getEntityId(id: number) {

    const customer: Observable<CustomerDto> = this._customerService.loadById$('Customers/GetCustomerByIdAllIncluded', id.toString());

    customer.subscribe(x => {
      this.formLoad(x);
      this._contactService.seedingSocialnetworks(x.contact.socialMedias);
      this.calcRows(x.description)
    });

  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._customerService.update(this.formMain);
    }
  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);

  }

}







