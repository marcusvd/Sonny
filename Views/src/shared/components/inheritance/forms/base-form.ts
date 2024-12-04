import { BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, Validators } from '@angular/forms';
import * as diacritics from 'diacritics';
import { Responsive } from '../responsive/responsive';

export class BaseForm extends Responsive {

  companyId = JSON.parse(localStorage.getItem('companyId'))
  userId = JSON.parse(localStorage.getItem('userId'))

  minValue = new Date('0001-01-01T00:00:00');

  currentDate = new Date();
  currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)


  formMainDynamic: FormGroup;
  formMain: FormGroup;
  subForm: FormGroup;

  constructor(
    override _breakpointObserver?: BreakpointObserver,
  ) {
    super(_breakpointObserver)

  }

  addValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValidators(Validators.required);
      form.get(field).updateValueAndValidity();
    })
  }

  removeValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValue(null);
      form.get(field).removeValidators(Validators.required);
      form.get(field).removeValidators(Validators.requiredTrue);
      form.get(field).updateValueAndValidity();
    })
  }

  SetFieldFormMain(field: string, value: any) {
    this.formMain.get(field).setValue(value);
  }

  removeNonNumericAndConvertToNumber(str: string): number {
    return +str.replace(/\D/g, '');
  }

  removeAccentsSpecialCharacters(value: string): string {
    const noAccents = diacritics.remove(value);//remove accents
    return noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
  }

  alertSave(form: FormGroup) {
    if (!form.valid) {
      alert('Todos os campos com (*) e em vermelho, são de preenchimento obrigatório. Preencha corretamente e tente novamente.')
      form.markAllAsTouched();
      return false;
    }
    else {
      return true;
    }

  }



}

