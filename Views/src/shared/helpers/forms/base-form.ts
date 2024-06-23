import { BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, Validators } from '@angular/forms';

import { Responsive } from '../responsive/responsive';

// @Component({
//   selector: 'base-form',
//   template: '<div></div>',
// })

export class BaseForm extends Responsive {

  formMain: FormGroup;
  subForm: FormGroup;

  constructor(
    override _breakpointObserver?: BreakpointObserver,
  ) {
    super(_breakpointObserver)

  }

  removeValidatorsSetFormFieldsValueNull(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValue(null);
      form.get(field).removeValidators(Validators.required);
      form.get(field).removeValidators(Validators.requiredTrue);
      form.get(field).updateValueAndValidity();
    })
  }

  SetFormFieldsValueNull(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValue(null);
    })
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
