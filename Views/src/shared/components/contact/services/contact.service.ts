import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { BaseForm } from "src/shared/helpers/forms/base-form";
@Injectable()
export class ContactService extends BaseForm {

  constructor(
    private _FormBuilder: UntypedFormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  formLoad(): UntypedFormGroup {
    return this.formMain = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [Validators.required,Validators.minLength(11)]],
      zap: ['', [Validators.required,Validators.minLength(11)]],
      landline: ['', [Validators.required,Validators.minLength(10)]],
      site: ['', [Validators.maxLength(150)]],
      socialnetworks: this._FormBuilder.array([])
    });
  }

  socialNetworkValidators(): UntypedFormGroup {
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

  get socialNets(): UntypedFormArray {
    return <UntypedFormArray>this.formMain.get('socialnetworks');
  }
}
