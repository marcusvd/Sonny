import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { BaseForm } from "src/shared/helpers/forms/base-form";
import { ValidatorsService } from "src/shared/helpers/validators/validators.service";


@Injectable()

export class ContactService extends BaseForm {


  private _celValidator: boolean = false;
  private _zapValidator: boolean = false;
  private _landlineValidator: boolean = false;


  constructor(
    private _FormBuilder: FormBuilder,
    private _Dialog: MatDialog,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }


  formLoad(): FormGroup {
    return this.formMain = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [Validators.minLength(11)]],
      // Validators.minLength(2), Validators.maxLength(150)
      zap: ['', [Validators.minLength(11)]],
      // , Validators.minLength(2), Validators.maxLength(150)
      landline: ['', [Validators.minLength(10)]],
      //
      site: ['', [Validators.maxLength(100)]],
      // Validators.minLength(2), Validators.maxLength(150)
      socialnetworks: this._FormBuilder.array([])
    });
  };



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


    //    this?.formMain?.get('cel')?.value;

    // input.valueChanges.subscribe(item => {
    //   if (item.length) {
    //     console.log('tem alguma coisa');
    //   }
    //   else {
    //     console.log('não tem nada');
    //   }
    // })
    // // return this.formMain.get('site').value ? null || this.formMain.get('cel').value : Validators.required;
    // return (input.value == null ? Validators.required : { letMeSee: true });
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
