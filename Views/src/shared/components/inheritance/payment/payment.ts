
import { Component } from '@angular/core';
import { BaseForm } from '../../../../shared/components/inheritance/forms/base-form';

@Component({
  selector: 'list',
  template: `

  `
})


export class Payment extends BaseForm {

  constructor() { super() }

  selectedPixRadio = -1;
  paymentBtnEnabledDisabled = false;

  selectedRadio(selected: number) {
    this.selectedPixRadio = selected;

  }




  // this.showDataBank = true;

  // this.bankAccount = creditCard.bankAccount;
}
