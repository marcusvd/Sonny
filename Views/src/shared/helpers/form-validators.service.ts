import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';

import {  SocialNetworkDto } from "src/shared/dtos/social-network-dto"

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  // public _socialNetworks: SocialNetworkDto[]=[];
  public _contactForm: FormGroup;
  public _addressForm: FormGroup;

  constructor(private _Fb: FormBuilder) { }

  commonFields(ctrl: string, msgMin: string, msgMax: string, form: FormGroup) {
    return form.get(ctrl).hasError('minlength')
      ? msgMin : form.get(ctrl).hasError('maxlength')
        ? msgMax : '';
  }
  required(ctrl: string, msgMin: string, msgMax: string, msgReq: string, form: FormGroup) {
    return form.get(ctrl).hasError('minlength')
      ? msgMin
      : form.get(ctrl).hasError('maxlength')
        ? msgMax
        : form.get(ctrl).hasError('required')
          ? msgReq : '';
  }
  // checkBox($event) {
  //   console.log($event)
  // }

  mailField(ctrl: string, msgEmail: string, msgMax: string, msgReq: string, form: FormGroup) {
    return form.get(ctrl).hasError('email')
      ? msgEmail
      : form.get(ctrl).hasError('maxlength')
        ? msgMax
        : form.get(ctrl).hasError('required')
          ? msgReq : '';
  }


  // AddressFormEdit(): FormGroup {
  //   return this._addressForm = this._Fb.group({
  //     zipcode: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     street: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     number: ['', [Validators.minLength(2), Validators.maxLength(15)]],
  //     district: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     city: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     state: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     complement: ['', [Validators.minLength(2), Validators.maxLength(500)]]
  //   });
  // };

  // ContactForm(): FormGroup {
  //   //this._Fb.array(this._socialNetworks)
  //   return this._contactForm = this._Fb.group({
  //     email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
  //     cel: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     zap: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     landline: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     socialnetworks: []
  //   });

  // };


  // };

  cleanAfters(toClean: string[], form?: FormGroup) {
    if (toClean.length != -1) {
      toClean.forEach((item) => {
        if (item.toLocaleLowerCase() === 'contact') {
          if (this._contactForm != undefined) {
            this._contactForm.reset();
            (<HTMLInputElement>document.getElementById('socialnetName')).value = '';
            (<HTMLInputElement>document.getElementById('socialnetUrl')).value = '';
            // this._socialNetworks = [];
          }
        }
        if (item.toLocaleLowerCase() === 'address') {
          if (this._addressForm != undefined) {
            this._addressForm.reset();
          }
        }
        if (form != undefined) {
          form.reset();
        }
        if (form != null) {
          form.reset();
        }
      })
    }

  }
}
