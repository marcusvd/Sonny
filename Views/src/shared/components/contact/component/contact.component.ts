import { Component, Input, OnInit } from '@angular/core';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

import { CommonModule } from '@angular/common';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NgxMaskModule } from 'ngx-mask';
import { BtnGComponent } from '../../btn-g/btn-g.component';
import { ContactService } from '../services/contact.service';
@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        NgxMaskModule,
        BtnGComponent
    ]
})
export class ContactComponent implements OnInit {

  @Input() formMain: FormGroup;

  screenFieldPosition = "row";


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
    this.validatorCustom.atLeastOneValidationBlur(this.formMain, ['cel', 'zap', 'landline']);
  }

}
