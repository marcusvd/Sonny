import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormGroup } from '@angular/forms';

import { Responsive } from '../responsive/responsive';

@Component({
  selector: 'base-form',
  template: '<div></div>',
})

export class BaseForm extends Responsive implements OnInit {

  formMain: UntypedFormGroup
  subForm: UntypedFormGroup

  constructor(
    override _breakpointObserver?: BreakpointObserver
  ) { super(_breakpointObserver) }

  alertSave(form: UntypedFormGroup) {
    if (!form.valid) {
      alert('Todos os campos com (*) e em vermelho, são de preenchimento obrigatório. Preencha corretamente e tente novamente.')
      this.formMain.markAllAsTouched();
      return false;
    }
    else{
      return true;
    }

  }

  ngOnInit(): void {
  }


}
