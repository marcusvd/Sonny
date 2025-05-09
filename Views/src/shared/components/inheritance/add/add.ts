
import { Component } from '@angular/core';
import * as diacritics from 'diacritics';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


import { IAdd } from './iadd';

@Component({
  selector: 'list',
  template: `

  `
})


export class Add extends BaseForm implements IAdd {



  constructor(

  ) {super();}

  override saveBtnEnabledDisabled: boolean = false;
  // removeNonNumericAndConvertToNumber(str: string): number {
  //   return +str.replace(/\D/g, '');
  // }

  // removeAccentsSpecialCharacters(value: string): string {
  //   const noAccents = diacritics.remove(value);//remove accents
  //   return noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
  // }

}
