import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

import { BaseForm } from '../../inheritance/forms/base-form';



@Injectable()

export class ContactDetailsService extends BaseForm{

  constructor(
    private _FormBuilder: UntypedFormBuilder,
     
    ) {super()}


  // public _cntForm: FormGroup;
  private _scnetForNew: UntypedFormGroup;


 formLoad(): UntypedFormGroup {
    return this.formMain = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      zap: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      site: ['', [Validators.maxLength(100)]],
      landline: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      socialnetworks: this._FormBuilder.array([])
    });
  };


  SocialNetworkValidators(): UntypedFormGroup {
    return this._scnetForNew = this._FormBuilder.group({
      name: ['', []],
      url: ['', []]
    })
  }

  get socialNets(): UntypedFormArray {
    return <UntypedFormArray>this.formMain.get('socialnetworks');
  }

  addSocialNets() {
    this.socialNets.push(this.SocialNetworkValidators())
  }

  removeNets(index: number) {
    this.socialNets.removeAt(index)
  }

  refresh() {
    window.location.reload();
  }



}
