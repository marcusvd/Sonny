import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";


import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
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


@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})

export class CustomerCreateComponent extends BaseForm implements OnInit {

  assuredOrNot: boolean = false;

  title: string = 'Cadastro';
  subTitle: string = 'Cliente';

  screenFieldPosition: string = 'row';


  constructor(
    private _customerService: CustomerCreateService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _fb: UntypedFormBuilder,
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

  formLoad(): UntypedFormGroup {
    return this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      responsible: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      assured: [false, []],
      customerType: ['', []],
      payment: new FormControl({ value: 0, disabled: true }, Validators.required),
      expiration: new FormControl({ value: 0, disabled: true }, Validators.required),
      registered: [new Date(), [Validators.required]],
      discount: [0, []],
      physicallyMovingCosts: this.subForm = this._fb.group({
        fixedCostAssured: [0, []],
        fuel: [0, []],
        apps: [0, []],
        publicTransport: [0, []],
        motoBoy: [0, []],
      }),
      address: this._addressService.formLoad(),
      contact: this._contactService.formLoad()
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
  // customerTypeForm(selected: any) {
  //   if (selected.checked) {
  //     console.log(selected.checked)
  //     this.formMain.get('customerType').setValue(0);
  //     this.formMain.controls['customerType'].setValue(0);
  //   }
  //   else {
  //     console.log(selected.checked)
  //     this.formMain.controls['customerType'].setValue(1);

  //   }
  // }

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







