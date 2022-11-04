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

  atLeastOne(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string) {
    return this._validatorsService.atLeastOne(form, ctrl, ctrlToShow);
  }

  minMaxLength(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return this._validatorsService.minMaxLength(form, ctrl, ctrlToShow, lengthMin, lengthMax);
  }

  minMax(form: FormGroup, ctrl: string, ctrlToShow: string, valueMin?: number, valueMax?: number) {
    return this._validatorsService.minMax(form, ctrl, ctrlToShow, valueMin, valueMax);
  }

  touchedErrors(groupOrArray: FormGroup | FormArray, ctrl: string) {
    return this._validatorsService.touchedErrors(groupOrArray, ctrl)
  }

  // ifCheckedBoxIsCheckedAnotherOneIsRequired($event, form: FormGroup, controls: string[]) {
  //   this._validatorsService.ifCheckedBoxIsCheckedAnotherOneIsRequired($event, form, controls);
  // }

  // selectValidator(form:FormGroup ,selected: string, operators: string, wordApplyOperator: string, ErrorType: any, controls: string[]) {
  //   this._validatorsService.selectValidator(form,selected,operators,wordApplyOperator,ErrorType,controls);
  // }


  resetForm() {
    this.formMain.reset();
  }

  ngOnInit(): void {
  }


}
