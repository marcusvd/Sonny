import { Component, Input, OnInit } from '@angular/core';
import { SocialNetworkDto } from 'src/shared/dtos/social-network-dto';
import { ContactService } from '../services/contact.service';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() social: SocialNetworkDto;

  emailSiteCols: number = 2;
  emailSiteRowHeight: string = '120px';
  zapCelLandlineCols: number = 3;
  zapCelLandlineRowHeight: string = '120px';
  socialNetUrlButtonRemoveCols: number = 3;
  socialNetUrlButtonRemoveRowHeight: string = '120px';

  constructor(
    private _contactService: ContactService,
  ) { }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  screen() {
    this._contactService.screenSize().subscribe({
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

  get formMain() {
    return this._contactService.formMain;
  }
  get subForm() {
    return this._contactService.subForm;
  }
  get formSocialNets() {
    return this._contactService.socialNets;
  }

  removeNets(index: number) {
    this._contactService.socialNets.removeAt(index)
  }

  addSocialNets() {
    this._contactService.addSocialNets();
  }

  ngOnInit(): void {

  }

}
