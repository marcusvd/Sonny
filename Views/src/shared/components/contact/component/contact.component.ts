import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { SocialNetworkDto } from 'src/shared/dtos/social-network-dto';
import { ContactService } from '../services/contact.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() social: SocialNetworkDto;
  @Output() formLoad = new EventEmitter<FormGroup>();

  emailSiteCols: number = 2;
  emailSiteRowHeight: string = '120px';
  zapCelLandlineCols: number = 3;
  zapCelLandlineRowHeight: string = '120px';
  socialNetUrlButtonRemoveCols: number = 3;
  socialNetUrlButtonRemoveRowHeight: string = '120px';

  constructor(
    private _contactService: ContactService,
    private _responsive: BreakpointObserver
  ) { }


  screen() {
    this._contactService.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.emailSiteCols =1;
            this.emailSiteRowHeight =  '120px';
            this.zapCelLandlineCols =1;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols =1;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'small': {
            this.emailSiteCols =1;
            this.emailSiteRowHeight =  '120px';
            this.zapCelLandlineCols =1;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols =1;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'medium': {
            this.emailSiteCols =2;
            this.emailSiteRowHeight =  '120px';
            this.zapCelLandlineCols =2;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols =2;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'large': {
            this.emailSiteCols =2;
            this.emailSiteRowHeight =  '120px';
            this.zapCelLandlineCols =3;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols =3;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
          case 'xlarge': {
           this.emailSiteCols =2;
            this.emailSiteRowHeight =  '120px';
            this.zapCelLandlineCols =3;
            this.zapCelLandlineRowHeight = '120px';
            this.socialNetUrlButtonRemoveCols =3;
            this.socialNetUrlButtonRemoveRowHeight = '120px';
            break;
          }
        }
      }
    })




  }

  required(form, ctrl, ctrlToShow) {
    return this._contactService.required(form, ctrl, ctrlToShow);
  }
  testHtml(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string) {

    return this._contactService.testHtml(form, ctrl, ctrlToShow);
  }
  minMax(form, ctrl, ctrlToShow, lengthMin, lengthMax) {
    return this._contactService.minMax(form, ctrl, ctrlToShow, lengthMin, lengthMax);
  }

  mailField(form: FormGroup | FormArray, ctrl: string, msgEmail: string) {
    return this._contactService.minMax(form, ctrl, msgEmail);
  }

  get formMain() {
    return this._contactService.formMain;
  }
  get subForm(){
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
    this.formLoad.emit(this._contactService.formLoad());
  }

}
