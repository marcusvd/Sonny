import { Component, Input, OnInit } from '@angular/core';
import { SocialMediasDto } from 'src/shared/entities-dtos/social-medias-dto';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BtnAddGComponent } from '../../btn-add-g/btn-add-g.component';
import { NgxMaskModule } from 'ngx-mask';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone:true,
  imports:[
    CommonModule,
     FlexLayoutModule,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatIconModule,
     MatButtonModule,
     MatInputModule,
     BtnAddGComponent,
     NgxMaskModule
    ]
})
export class ContactComponent implements OnInit {

  @Input()  formMain: FormGroup;

  screenFieldPosition = "row";


  constructor(
    private _contactService: ContactService,
  ) {}


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
            this.screenFieldPosition = "column";
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column";
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row";
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row";
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row";
            break;
          }
        }
      }
    })




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
