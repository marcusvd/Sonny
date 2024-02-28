import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ContactDto } from "src/shared/dtos/contact-dto";
import { SocialNetworkDto } from "src/shared/dtos/social-network-dto";
import { BaseForm } from "src/shared/helpers/forms/base-form";
@Injectable()
export class ContactService extends BaseForm {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  // formLoad(): FormGroup {
  //   return this.formMain = this._formBuilder.group({
  //     email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
  //     cel: ['', [Validators.required,Validators.minLength(11)]],
  //     zap: ['', [Validators.required,Validators.minLength(11)]],
  //     landline: ['', [Validators.required,Validators.minLength(10)]],
  //     site: ['', [Validators.maxLength(150)]],
  //     socialnetworks: this._formBuilder.array([])
  //   });
  // }

  socialNetworkValidators(): FormGroup {
    return this.subForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      url: ['', [Validators.required, Validators.maxLength(150)]]
    })
  }

  formLoad(contact?: ContactDto) {

   return  this.formMain = this._fb.group({
      id: [contact?.id, [Validators.required]],
      email: [contact?.email, [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: [contact?.cel, [Validators.required, Validators.minLength(11)]],
      zap: [contact?.zap, [Validators.required, Validators.minLength(11)]],
      landline: [contact?.landline, [Validators.required, Validators.minLength(10)]],
      site: [contact?.site, [Validators.maxLength(150)]],
      socialnetworks: this._fb.array([])
    });
    this.seedingSocialnetworks(contact?.socialnetworks)

  }

  seedingSocialnetworks(socialnetworks?: SocialNetworkDto[]) {
    socialnetworks?.forEach((item: SocialNetworkDto) => {
      return this.socialNets.push(this.subForm = this._fb.group({
        id: [item?.id, [Validators.required]],
        name: [item?.name, [Validators.required, Validators.maxLength(150)]],
        url: [item?.url, [Validators.required, Validators.maxLength(150)]]
      }))

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
