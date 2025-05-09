
import { Component } from '@angular/core';

import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

@Component({
  selector: 'list',
  template: `

  `
})


export class Payment extends BaseForm {

  constructor() {super()}

  selectedPixRadio = 0;
  paymentBtnEnabledDisabled = false;

  selectedRadio(selected: number) {
    this.selectedPixRadio = selected;
  }
  banckAccountSelected(selected: any) {
    console.log(selected);
  }

}
