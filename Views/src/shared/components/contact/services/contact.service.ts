import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { BaseForm } from "src/shared/helpers/forms/base-form";
import { ValidatorsService } from "src/shared/helpers/validators/validators.service";


@Injectable()

export class ContactService extends BaseForm {

  constructor(
    private _FormBuilder: FormBuilder,
    private _Dialog: MatDialog,
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }


  formLoad(): FormGroup {
    return this.formMain = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [this.testValidator]],
      // Validators.minLength(2), Validators.maxLength(150)
      zap: ['', [this.testValidator]],
      // , Validators.minLength(2), Validators.maxLength(150)
      site: ['', [Validators.maxLength(100)]],
      //
      landline: ['', [this.testValidator]],
      // Validators.minLength(2), Validators.maxLength(150)
      socialnetworks: this._FormBuilder.array([])
    });
  };

  testValidator(input: FormControl) {

 // return this.formMain.get('site').value ? null || this.formMain.get('cel').value : Validators.required;
   return (input.value == null ? Validators.required : { letMeSee: true });
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
