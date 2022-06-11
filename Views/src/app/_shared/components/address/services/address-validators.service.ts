import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContactDto } from "src/app/_shared/dtos/contact-dto";
import { SocialNetworkDto } from "src/app/_shared/dtos/social-network-dto";

@Injectable()

export class AddressValidatorsService {

  public _addressForm: FormGroup;

  constructor(private _FormBuilder: FormBuilder) { }

  AddressForm(): FormGroup {
    return this._addressForm = this._FormBuilder.group({
      zipcode: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      street: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      number: ['', [Validators.minLength(2), Validators.maxLength(15)]],
      district: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      city: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      state: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      complement: ['', [Validators.minLength(2), Validators.maxLength(500)]]
    });
  };
  AddressEdit(): FormGroup {
    return this._addressForm = this._FormBuilder.group({
      id: ['', []],
      zipcode: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      street: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      number: ['', [Validators.minLength(2), Validators.maxLength(15)]],
      district: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      city: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      state: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      complement: ['', [Validators.minLength(2), Validators.maxLength(500)]]
    });
  };


}
