import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';

import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

@Component({
    selector: 'list',
    template: `

  `,
    standalone: false
})


export class Payment extends BaseForm {



  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)

  }

  selectedPixRadio = 0;
  paymentBtnEnabledDisabled = false;

  selectedRadio(selected: number) {
    this.selectedPixRadio = selected;
  }
  banckAccountSelected(selected: any) {
    console.log(selected);
  }

}
