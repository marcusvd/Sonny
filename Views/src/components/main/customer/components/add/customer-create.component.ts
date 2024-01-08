import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";


import { ValidatorsCustomer } from "src/components/main/customer/validators/customer/validators-customer";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CustomerCreateService } from "./services/customer-create.service";
import { PhysicallyMovingCostsService } from "src/components/main/inheritances/physically-moving-costs/service/physically-moving-costs.service";
import { ValidatorMessagesCustomer } from "../../validators/customer/validators-messages-customer";

@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})

export class CustomerCreateComponent extends BaseForm implements OnInit {

  title: string = 'Cadastro';
  subTitle: string = 'Cliente';

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

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  private valLocal = ValidatorsCustomer;
  get validatorsLocal() {
    return this.valLocal
  }

  additionalCosts: FormGroup;
  formLoad(): FormGroup {
    return this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      responsible: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      businessLine: ['', [Validators.required, Validators.maxLength(150)]],
      assured: [false, []],
      customerType: [false, []],
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







