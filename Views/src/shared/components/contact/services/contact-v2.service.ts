import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContactDto } from "../dtos/contact-dto";
import { SocialMediasDto } from "../dtos/social-medias-dto";



@Injectable()
export class ContactV2Service   {

  formMainLocal:FormGroup;
  subFormLocal:FormGroup;

  constructor(
    private _fb: FormBuilder
  ) {  }




  formLoad(): FormGroup {
    return this.formMainLocal = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: ['', [Validators.required, Validators.minLength(11)]],
      zap: ['', [Validators.required, Validators.minLength(11)]],
      landline: ['', [Validators.required, Validators.minLength(10)]],
      site: ['', [Validators.maxLength(150)]],
      socialnetworks: this._fb.array([])
    });
  }

  formLoaded(contact?: ContactDto) {

    this.formMainLocal = this._fb.group({
      id: [contact?.id, [Validators.required]],
      email: [contact?.email, [Validators.required, Validators.email, Validators.maxLength(150)]],
      cel: [contact?.cel, [Validators.required, Validators.minLength(11)]],
      zap: [contact?.zap, [Validators.required, Validators.minLength(11)]],
      landline: [contact?.landline, [Validators.required, Validators.minLength(10)]],
      site: [contact?.site, [Validators.maxLength(150)]],
      socialnetworks: this._fb.array([])
    });
    this.seedingSocialnetworks(contact?.socialMedias)

  }

  seedingSocialnetworks(socialnetworks?: SocialMediasDto[]) {
    socialnetworks?.forEach((item: SocialMediasDto) => {
      return this.socialNets.push(this.subFormLocal = this._fb.group({
        id: [item?.id, [Validators.required]],
        name: [item?.name, [Validators.required, Validators.maxLength(150)]],
        url: [item?.url, [Validators.required, Validators.maxLength(150)]]
      }))

    })

  }


  socialNetworkValidators(): FormGroup {
    return this.subFormLocal = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      url: ['', [Validators.required, Validators.maxLength(150)]]
    })
  }

  get subFormLocalValidation() {
    return this.subFormLocal;
  }

  addSocialNets() {
    this.socialNets.push(this.socialNetworkValidators())
  }

  removeNets(index: number) {
    this.socialNets.removeAt(index)
  }

  get socialNets(): FormArray {
    return <FormArray>this.formMainLocal.get('socialnetworks');
  }











}
