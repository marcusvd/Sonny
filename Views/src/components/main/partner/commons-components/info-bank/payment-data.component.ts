
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';


import { BreakpointObserver } from '@angular/cdk/layout';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'payment-data',
  templateUrl: './payment-data.component.html',
  styles: [`

  `],
})
export class PaymentDataComponent extends BaseForm implements OnInit {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  @Input() override formMain: FormGroup;

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  pixMtd(check: boolean) {
    if (!check)
      this.removeValidation('bankAccount');
  }

  bankAccountMtd(check: boolean) {

    if (check)
      this.addValidation('bankAccount');

    else
      this.removeValidation('bankAccount')

  }

  othersMtd(check: boolean) {
    if (check)
      this.addValidation('others');
    else
      this.removeValidation('others')
  }

  addValidation(crtl: string) {
    this.formMain.get(crtl).addValidators([Validators.required]);
    this.formMain.get(crtl).updateValueAndValidity();
  }
  removeValidation(crtl: string) {

    this.formMain.get(crtl).setValue(null);
    this.formMain.get(crtl).removeValidators([Validators.required]);
    this.formMain.get(crtl).updateValueAndValidity();

  }

  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  formLoad() {

  }

  ngOnInit(): void {
    this.screen();
  }



}
