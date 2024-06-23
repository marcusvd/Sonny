import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";


import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MainEntitiesBaseComponent } from "src/components/main/inheritances/main-entities-base/main-entities-base.component";
import { PhysicallyMovingCostsComponent } from "src/components/main/inheritances/physically-moving-costs/physically-moving-costs.component";
import { PhysicallyMovingCostsService } from "src/components/main/inheritances/physically-moving-costs/service/physically-moving-costs.service";
import { AddressComponent } from "src/shared/components/address/component/address.component";
import { AddressService } from "src/shared/components/address/services/address.service";
import { DescriptionFieldComponent } from "src/shared/components/administrative/info/description-field.component";
import { BusinessData } from "src/shared/components/administrative/name-cpf-cnpj/dto/business-data";
import { NameCpfCnpjComponent } from "src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component";
import { ContactComponent } from "src/shared/components/contact/component/contact.component";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { TitleComponent } from "src/shared/components/title/components/title.component";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { PhoneHandlers } from "src/shared/helpers/handlers/phone-handlers";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { FinancialInfoTypeComponent } from "../commons-components/financial-info-type/financial-info-type.component";
import { CustomerEditService } from "./services/customer-edit.service";

import { Observable } from "rxjs";
import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component";
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component";
import { ValidatorsCustom } from "src/shared/helpers/validators/validators-custom";
import { CustomerDto } from "../commons-components/dtos/customer-dto";



@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule,
    MatDividerModule,
    TitleComponent,
    SubTitleComponent,
    NameCpfCnpjComponent,
    MainEntitiesBaseComponent,
    DescriptionFieldComponent,
    FinancialInfoTypeComponent,
    PhysicallyMovingCostsComponent,
    ContactComponent,
    AddressComponent,
    BtnGComponent,
  ]
})

export class CustomerEditComponent extends BaseForm implements OnInit {

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  title: string = 'Cadastro';
  subTitle: string = 'Cliente';
  borderAround: boolean = false;

  screenFieldPosition: string = 'row';

  address: FormGroup;
  contact: FormGroup;

  constructor(
    private _customerService: CustomerEditService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _fb: FormBuilder,
    private _actRouter: ActivatedRoute,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

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

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
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
    this.address.get('zipcode').setValue(data.cep);
    this._addressService.query(data.cep)
    this.address.get('number').setValue(data.numero);
    this.address.get('id').setValue(0);
  }

  setContactForm(data: BusinessData) {
    this.contact.get('id').setValue(0);
    this.contact.get('email').setValue(data.email);

    const isMobile = PhoneHandlers.handlerApiPhoneNumberFromReceitaWs(data.telefone)

    if (isMobile.isMobile)
      this.contact.get('cel').setValue(isMobile.phoneNum);
    else
      this.contact.get('landline').setValue(isMobile.phoneNum);

    this.validatorCustom.atLeastOneValidationBlur(this.contact, ['cel', 'zap', 'landline']);
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
    this.validatorCustom.atLeastOneValidationBlur(this.contact, ['cel', 'zap', 'landline']);
    if (this.alertSave(this.formMain)) {
      this._customerService.update(this.formMain);
    }
  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);
    this.screen();
  }

}







