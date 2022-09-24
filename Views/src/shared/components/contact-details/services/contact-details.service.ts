import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BaseForm } from "src/shared/helpers/forms/base-form";


@Injectable()

export class ContactDetailsService extends BaseForm{

  constructor(
    private _FormBuilder: FormBuilder,
    private _Dialog: MatDialog,
  ) { super() }


  // public _cntForm: FormGroup;
  private _scnetForNew: FormGroup;


 formLoad(): FormGroup {
    return this.formMain = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      zap: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      site: ['', [Validators.maxLength(100)]],
      landline: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      socialnetworks: this._FormBuilder.array([])
    });
  };


  SocialNetworkValidators(): FormGroup {
    return this._scnetForNew = this._FormBuilder.group({
      name: ['', []],
      url: ['', []]
    })
  }

  get socialNets(): FormArray {
    return <FormArray>this.formMain.get('socialnetworks');
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
