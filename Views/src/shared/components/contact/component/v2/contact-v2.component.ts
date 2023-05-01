import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ContactV2Service } from '../../services/contact-v2.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactDto } from 'src/shared/dtos/contact-dto';
import { SocialNetworkDto } from 'src/shared/dtos/social-network-dto';

@Component({
  selector: 'contact-v2',
  templateUrl: './contact-v2.component.html',
  styleUrls: ['./contact-v2.component.css'],
})
export class ContactV2Component extends BaseForm implements OnInit, OnChanges {

  @Input() contact: ContactDto;
  // formMainLocal:FormGroup;
  // subFormLocal:FormGroup;

  emailSiteCols: number = 2;
  emailSiteRowHeight: string = '120px';
  zapCelLandlineCols: number = 3;
  zapCelLandlineRowHeight: string = '120px';
  socialNetUrlButtonRemoveCols: number = 3;
  socialNetUrlButtonRemoveRowHeight: string = '120px';

  constructor(
    private _contactService: ContactV2Service,
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder
  ) {
    super(_breakpointObserver);
  }


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.emailSiteCols = 1;
            this.emailSiteRowHeight = '120px';
            this.zapCelLandlineCols = 1;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols = 1;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'small': {
            this.emailSiteCols = 1;
            this.emailSiteRowHeight = '120px';
            this.zapCelLandlineCols = 1;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols = 1;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'medium': {
            this.emailSiteCols = 2;
            this.emailSiteRowHeight = '120px';
            this.zapCelLandlineCols = 2;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols = 2;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'large': {
            this.emailSiteCols = 2;
            this.emailSiteRowHeight = '120px';
            this.zapCelLandlineCols = 3;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols = 3;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'xlarge': {
            this.emailSiteCols = 2;
            this.emailSiteRowHeight = '120px';
            this.zapCelLandlineCols = 3;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols = 3;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
        }
      }
    })
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  // formLoad(): FormGroup {
  //   return this.formMainLocal = this._fb.group({
  //     email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
  //     cel: ['', [Validators.required, Validators.minLength(11)]],
  //     zap: ['', [Validators.required, Validators.minLength(11)]],
  //     landline: ['', [Validators.required, Validators.minLength(10)]],
  //     site: ['', [Validators.maxLength(150)]],
  //     socialnetworks: this._fb.array([])
  //   });
  // }

  formLoaded(contact?: ContactDto) {
    this._contactService.formMainLocal = this._fb.group({
      id: [contact?.id, []],
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
      return this.socialNets.push(this._contactService.subFormLocal = this._fb.group({
        id: [item?.id, [Validators.required]],
        name: [item?.name, [Validators.required, Validators.maxLength(150)]],
        url: [item?.url, [Validators.required, Validators.maxLength(150)]]
      }))

    })

  }

  // getForm() {

  //   if (this.formMainLocal.get('id').value == null) {
  //     this.formMainLocal.value.id = 0;
  //   }

  //   if (!this.formMainLocal.valid) {
  //     // alert('Todos os campos com (*) e em vermelho, são de preenchimento obrigatório. Preencha corretamente e tente novamente.')
  //     // this.formMainLocal.markAllAsTouched();
  //     // return false;
  //     this.formMainLocal.controls['email'].markAsTouched();
  //   }
  //   return this.formMainLocal
  // }

  socialNetworkValidators(): FormGroup {
    return this._contactService.subFormLocal = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      url: ['', [Validators.required, Validators.maxLength(150)]]
    })
  }

  addSocialNets() {
    this._contactService.socialNets.push(this.socialNetworkValidators())
  }

  removeNets(index: number) {
    this._contactService.socialNets.removeAt(index)
  }

  get socialNets(): FormArray {
    return <FormArray>this._contactService.formMainLocal.get('socialnetworks');
  }
  get formMainLocal(): FormGroup {
    return this._contactService.formMainLocal;
  }
  // addSocialNets() {
  //   this.socialNets.push(this.socialNetworkValidators())
  // }

  // removeNets(index: number) {
  //   this.socialNets.removeAt(index)
  // }

  // get socialNets(): FormArray {
  //   return <FormArray>this.formMainLocal.get('socialnetworks');
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this._contactService.formLoaded(this.contact)
  }

  ngOnInit(): void {

  }

}
