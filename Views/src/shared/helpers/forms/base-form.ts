import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';

import { Responsive } from '../responsive/responsive';

@Component({
  selector: 'base-form',
  template: '<div></div>',
})

export class BaseForm extends Responsive {

  formMain: FormGroup;
  subForm: FormGroup;

  constructor(
    override _breakpointObserver?: BreakpointObserver,
  ) {
    super(_breakpointObserver)

  }

  alertSave(form: FormGroup) {
    console.log(form)
    if (!form.valid) {
      alert('Todos os campos com (*) e em vermelho, são de preenchimento obrigatório. Preencha corretamente e tente novamente.')
      this.formMain.markAllAsTouched();
      return false;
    }
    else {
      return true;
    }

  }

  // ngOnInit(): void {
  // }


}
