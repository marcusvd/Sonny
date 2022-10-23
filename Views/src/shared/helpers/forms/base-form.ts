import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Responsive } from '../responsive/responsive';
import { ValidatorsService } from '../validators/validators.service';
@Component({
  selector: 'base-form',
  template: '<div></div>',
})

export class BaseForm extends Responsive implements OnInit {

  formMain: FormGroup
  subForm: FormGroup

  constructor(
    public _validatorsService?: ValidatorsService,
    override _breakpointObserver?: BreakpointObserver
  ) { super(_breakpointObserver) }

  mailField(form: FormGroup | FormArray, ctrl: string, msgEmail: string) {
    this._validatorsService.mailField(form, ctrl, msgEmail);
  }

  required(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string) {
    return this._validatorsService.required(form, ctrl, ctrlToShow);
  }

  minMax(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return this._validatorsService.minMax(form, ctrl, ctrlToShow, lengthMin, lengthMax);
  }

  touchedErrors(groupOrArray: FormGroup | FormArray, ctrl: string) {
    return this._validatorsService.touchedErrors(groupOrArray, ctrl)
  }

  testHtml(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string) {
    return this._validatorsService.testHtml(form,ctrl,ctrlToShow);
  }

  resetForm() {
    this.formMain.reset();
  }

  ngOnInit(): void {
  }


}
