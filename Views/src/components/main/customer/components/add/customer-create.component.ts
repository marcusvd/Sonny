import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";


import { PhysicallyMovingCostsService } from "src/components/main/inheritances/physically-moving-costs/service/physically-moving-costs.service";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { CustomerCreateService } from "./services/customer-create.service";
import { BusinessData } from "src/shared/components/administrative/name-cpf-cnpj/dto/business-data";
import { CustomerDto } from "../../dtos/customer-dto";
import { PhoneHandlers } from "src/shared/helpers/handlers/phone-handlers";

@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})

export class CustomerCreateComponent extends BaseForm implements OnInit {

  title: string = 'Cadastro';
  subTitle: string = 'Cliente';
  borderAround: boolean = false;

  screenFieldPosition: string = 'row';

  address: FormGroup;
  contact: FormGroup;

  constructor(
    private _customerService: CustomerCreateService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _fb: FormBuilder,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  additionalCosts: FormGroup;
  formLoad(): FormGroup {
    return this.formMain = this._fb.group({
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

    this.address.reset();
    this.contact.reset();

    if (data.qsa.length > 0)
      this.formMain.get('responsible').setValue(data.qsa[0].nome);
    else {
      this.formMain.get('responsible').setValue(data.nome);
    }
    this.formMain.get('name').setValue(data.nome);
    this.formMain.get('businessLine').setValue(data.atividade_principal[0].text);
    this.address.get('zipcode').setValue(data.cep);
    this._addressService.query(data.cep)
    this.address.get('number').setValue(data.numero);

    this.contact.get('email').setValue(data.email);



    PhoneHandlers.handlerApiPhoneNumberFromReceitaWs(data.telefone);



    const isMobile = PhoneHandlers.handlerApiPhoneNumberFromReceitaWs(data.telefone)
    if (isMobile.isMobile)
      this.contact.get('cel').setValue(isMobile.phoneNum);
    else
      this.contact.get('landline').setValue(data.telefone);

  }





  save() {
    if (this.alertSave(this.formMain)) {
      this._customerService.save(this.formMain);
      this.formLoad();
    }
  }

  ngOnInit(): void {
    this.formLoad();
  }

}







