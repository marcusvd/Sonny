import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";


import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { CustomerCreateService } from "./services/customer-create.service";
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom'
import { ValidatorsCustomer } from "src/components/main/customer/validators/customer/validators-customer";
import { ValidatorMessagesCustomer } from "../validators/customer/validators-messages-customer";
import { TypeCustomerEnumDto } from "../dtos/enums/type-customer.enum-dto";
import { PhysicallyMovingCostsComponent } from "../../inheritances/physically-moving-costs/physically-moving-costs.component";
import { PhysicallyMovingCostsService } from "../../inheritances/physically-moving-costs/service/physically-moving-costs.service";

@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
  //providers:[PhysicallyMovingCostsComponent]
})

export class CustomerCreateComponent extends BaseForm implements OnInit {

  assuredOrNot: boolean = false;

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
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(),
      address: this.address = this._addressService.formLoad(),
      contact: this.contact = this._contactService.formLoad()
    })

  }




  assured() {

    this.assuredOrNot = this.formMain.get('assured').value
    if (this.formMain.get('assured').value) {
      this.formMain.controls['payment'].enable();
      this.formMain.controls['expiration'].enable();
    }

    if (!this.formMain.get('assured').value) {
      this.formMain.controls['payment'].disable();
      this.formMain.controls['expiration'].disable();
    }

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

    // console.log(this.formMain.value)
    if (this.alertSave(this.formMain)) {
      this._customerService.save(this.formMain);
      this.formLoad();
    }
  }

  ngOnInit(): void {
    this.formLoad();
  }

}







