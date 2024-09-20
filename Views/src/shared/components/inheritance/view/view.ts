import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { IView } from './iview';

@Component({
  selector: 'list',
  template: `
  `
})


export class View extends BaseForm implements IView {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  minDate = new Date('0001-01-01T00:00:00');

  screenFieldPosition: boolean = false;
  fxLayoutAlign: string = 'center center';
  fxLayoutPosition: string = 'row';
  fxLayoutGap:string = '0';

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = true;
            this.fxLayoutAlign = 'start start';
            this.fxLayoutPosition = 'column';
            this.fxLayoutGap = '0';

            break;
          }
          case 'small': {
            this.screenFieldPosition = true;
            this.fxLayoutAlign = 'start start';
            this.fxLayoutPosition = 'column';
            this.fxLayoutGap = '0';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = false;
            this.fxLayoutAlign = 'center center';
            this.fxLayoutPosition = 'row';
            this.fxLayoutGap = '10';
            break;
          }
          case 'large': {
            this.screenFieldPosition = false;
            this.fxLayoutAlign = 'center center';
            this.fxLayoutPosition = 'row';
            this.fxLayoutGap = '10';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = false;
            this.fxLayoutAlign = 'center center';
            this.fxLayoutPosition = 'row';
            this.fxLayoutGap = '10';
            break;
          }
        }
      }
    })
  }


}
