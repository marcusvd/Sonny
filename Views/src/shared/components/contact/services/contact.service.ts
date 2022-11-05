import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { BaseForm } from "src/shared/helpers/forms/base-form";



@Injectable()

export class ContactService extends BaseForm {

  constructor(
    private _FormBuilder: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  formLoad(): FormGroup {
    return this.formMain = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [this.atLeastOneValidationBlur, Validators.minLength(11)]],
      zap: ['', [this.atLeastOneValidationBlur, Validators.minLength(11)]],
      landline: ['', [this.atLeastOneValidationBlur, Validators.minLength(10)]],
      site: ['', [Validators.maxLength(100)]],
      socialnetworks: this._FormBuilder.array([])
    });
  }

  atLeastOneValidationBlur() {

    if (!this?.formMain?.get('cel')?.value && !this?.formMain?.get('zap')?.value && !this?.formMain?.get('landline')?.value) {
      this?.formMain?.get('cel')?.setErrors({ atleastone: true });
      this?.formMain?.get('zap')?.setErrors({ atleastone: true });
      this?.formMain?.get('landline')?.setErrors({ atleastone: true });
    }
    else {
      if (!this?.formMain?.get('cel')?.value) {
        this?.formMain?.get('cel')?.setErrors(null);
      }
      if (!this?.formMain?.get('zap')?.value) {
        this?.formMain?.get('zap')?.setErrors(null);
      }
      if (!this?.formMain?.get('landline')?.value) {
        this?.formMain?.get('landline')?.setErrors(null);
      }
    }

  }

  socialNetworkValidators(): FormGroup {
    return this.subForm = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      url: ['', [Validators.required, Validators.maxLength(150)]]
    })
  }

  get subFormValidation() {
    return this.subForm;
  }

  addSocialNets() {
    this.socialNets.push(this.socialNetworkValidators())
  }

  get socialNets(): FormArray {
    return <FormArray>this.formMain.get('socialnetworks');
  }
}
