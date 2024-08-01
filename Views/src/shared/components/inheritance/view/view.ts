import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';


import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
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
  currentDate = new Date();
  screenFieldPosition: boolean = false;
  fxLayoutAlign: string = 'center center';
  fxLayoutRes: string = 'row';

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = true;
            this.fxLayoutAlign = 'start start';
            this.fxLayoutRes = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = true;
            this.fxLayoutAlign = 'start start';
            this.fxLayoutRes = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = false;
            this.fxLayoutAlign = 'center center';
            this.fxLayoutRes = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = false;
            this.fxLayoutAlign = 'center center';
            this.fxLayoutRes = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = false;
            this.fxLayoutAlign = 'center center';
            this.fxLayoutRes = 'row';
            break;
          }
        }
      }
    })
  }


}
