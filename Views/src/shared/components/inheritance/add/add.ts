import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import * as diacritics from 'diacritics';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


import { IAdd } from './iadd';

@Component({
  selector: 'list',
  template: `

  `
})


export class Add extends BaseForm implements IAdd{

  minValue = new Date('0001-01-01T00:00:00');
  currentDate = new Date();



  constructor(
    // protected _router: Router,
    // protected _actRoute: ActivatedRoute,
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver)

  }

  // totalNumberOfDaysInTheMonth() {
  //   const month = new Date(new Date().getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
  //   return month
  // }

  removeNonNumericAndConvertToNumber(str: string):number {
    return +str.replace(/\D/g, '');
  }

  removeAccentsSpecialCharacters(value: string):string {
    const noAccents = diacritics.remove(value);//remove accents
    return noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
  }

}
