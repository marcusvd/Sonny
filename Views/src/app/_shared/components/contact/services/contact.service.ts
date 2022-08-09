import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs/operators";
import { SupplierDto } from "src/app/_components/administrative/local/providers/supplier/dto/supplier-dto";
import { ContactDto } from "src/app/_shared/dtos/contact-dto";
import { SocialNetworkDto } from "src/app/_shared/dtos/social-network-dto";
import { environment } from "src/environments/environment";
import { DeleteModalComponent } from "../../delete-modal/delete-modal.component";

@Injectable()

export class ContactService {

  constructor(
    private _FormBuilder: FormBuilder,
    private _Dialog: MatDialog,
  ) { }


  public _cntForm: FormGroup;
  public _scnetForNew: FormGroup;

  ContactForm(): FormGroup {
    return this._cntForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      zap: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      site: ['', []],
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
    return <FormArray>this._cntForm.get('socialnetworks');
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
