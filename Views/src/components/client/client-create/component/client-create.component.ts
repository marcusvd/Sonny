import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { ValidatorsService } from "src/shared/helpers/validators/validators.service";
import { ClientCreateService } from "../services/client-create.service";



@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  providers: [
    ClientCreateService
  ]
})

export class ClientCreateComponent extends BaseForm implements OnInit {

  assuredOrNot: boolean = false;

  title: string = 'Cliente';
  subTitle: string = 'Cadastro';

  paymentDiscountExpirationCols: number = 3;
  paymentDiscountExpirationRowHeight: string = '120px';

  nameCnpjCpfCols: number = 2;
  nameCnpjCpfRowHeight: string = '120px';

  assuredClientTypeResponsibleCols: number = 3;
  assuredClientTypeResponsibleRowHeight: string = '140px';


  constructor(
    private _clientService: ClientCreateService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _fb: FormBuilder,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }


  save() {
    console.log(this.formMain)
    //this._ClientService.save(this.formMain);
    // this._contactService.atLeastOneValidationBlur();
  }


  assured() {
    this.assuredOrNot = !this.assuredOrNot;
  }

  // typeRegisterShowHide: boolean = false;
  // typeOfRegister($event) {
  //   if ($event.value == 'basic') {
  //     this.typeRegisterShowHide = !this.typeRegisterShowHide
  //   }
  //   else{
  //     this.typeRegisterShowHide = !this.typeRegisterShowHide
  //   }
  // }

  formLoad(): FormGroup {
    return this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      responsible: ['', [Validators.required, Validators.maxLength(100)]],
      comments: ['', [Validators.maxLength(500)]],
      assured: [false, []],
      clientType: [false, []],
      payment: ['', []],
      expiration: ['', []],
      discount: [0, []],
      address: this._addressService.formLoad(),
      contact: this._contactService.formLoad()
    })
  }



  // ifCheckedAnotherOneIsRequired($event, controls: string[]) {
  //   if ($event.checked) {
  //     controls.forEach((control: string) => {
  //       this.formMain.get(control).setValidators(Validators.required);
  //     })
  //   }
  //   else {
  //     controls.forEach((control: string) => {
  //       this.formMain.get(control).removeValidators(Validators.required);
  //       this.formMain.get(control).reset();
  //     })
  //   }
  // }
  ifCheckedAnotherOneIsRequired($event, controls: string[]) {
    if ($event.checked) {
      controls.map(control => this.formMain.get(control).setValidators(Validators.required));
    }
    else {
      controls.map(control => {
        this.formMain.get(control).removeValidators(Validators.required);
        this.formMain.get(control).reset();
      })
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

  ngOnInit(): void {
    this.formLoad();
  }

}







