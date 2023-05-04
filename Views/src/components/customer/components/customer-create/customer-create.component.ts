import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";


import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { CustomerCreateService } from "./services/customer-create.service";
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom'
import { ValidatorsCustomer } from "src/components/customer/validators/customer/validators-customer";
import { ValidatorMessagesCustomer } from "../../validators/customer/validators-messages-customer";

@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
  providers: [
    // CustomerCreateService
  ]
})

export class CustomerCreateComponent extends BaseForm implements OnInit {

  assuredOrNot: boolean = false;

  title: string = 'Cadastro';
  subTitle: string = 'Cliente';

  paymentDiscountExpirationCols: number = 3;
  paymentDiscountExpirationRowHeight: string = '120px';

  nameCnpjCpfCols: number = 2;
  nameCnpjCpfRowHeight: string = '120px';

  assuredClientTypeResponsibleCols: number = 3;
  assuredClientTypeResponsibleRowHeight: string = '160px';

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
      companyId:[localStorage.getItem("companyId"), [Validators.required]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      responsible: ['', [Validators.required, Validators.maxLength(100)]],
      comments: ['', [Validators.maxLength(500)]],
      assured: [false, []],
      clientType: [false, []],
      payment: new UntypedFormControl({ value: 0, disabled: true },Validators.required),
      expiration: new UntypedFormControl({ value: 0, disabled: true },Validators.required),
      registered: [new Date(), [Validators.required]],
      discount: [0, []],
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

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.paymentDiscountExpirationCols = 1;
            this.paymentDiscountExpirationRowHeight = '120px';

            this.nameCnpjCpfCols = 1;
            this.nameCnpjCpfRowHeight = '120px';

            this.assuredClientTypeResponsibleCols = 1;
            this.assuredClientTypeResponsibleRowHeight = '140px'
            break;
          }
          case 'small': {
            this.paymentDiscountExpirationCols = 1;
            this.paymentDiscountExpirationRowHeight = '120px';

            this.nameCnpjCpfCols = 1;
            this.nameCnpjCpfRowHeight = '120px';

            this.assuredClientTypeResponsibleCols = 1;
            this.assuredClientTypeResponsibleRowHeight = '140px'
            break;
          }
          case 'medium': {
            this.paymentDiscountExpirationCols = 2;
            this.paymentDiscountExpirationRowHeight = '120px';

            this.nameCnpjCpfCols = 2;
            this.nameCnpjCpfRowHeight = '120px';

            this.assuredClientTypeResponsibleCols = 2;
            this.assuredClientTypeResponsibleRowHeight = '140px'
            break;
          }
          case 'large': {
            this.paymentDiscountExpirationCols = 3;
            this.paymentDiscountExpirationRowHeight = '120px';

            this.nameCnpjCpfCols = 2;
            this.nameCnpjCpfRowHeight = '120px';

            this.assuredClientTypeResponsibleCols = 3;
            this.assuredClientTypeResponsibleRowHeight = '140px'
            break;
          }
          case 'xlarge': {
            this.paymentDiscountExpirationCols = 3;
            this.paymentDiscountExpirationRowHeight = '120px';

            this.nameCnpjCpfCols = 2;
            this.nameCnpjCpfRowHeight = '120px';

            this.assuredClientTypeResponsibleCols = 3;
            this.assuredClientTypeResponsibleRowHeight = '140px'
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







