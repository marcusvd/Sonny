
import { AbstractControl, FormGroup } from "@angular/forms";
import * as moment from "moment";


export class ValidatorsCustom {

  constructor() { }

  static checkedBoxValidator(form: FormGroup, checked: boolean, errorType: any, controls: string[]) {
    //checked true all controls is required.
    const error = errorType;
    const checkedValue: boolean = checked

    if (checkedValue) {
      controls.map(control => form.get(control).setErrors(error));
    }
    else {
      controls.map(control => {
        form.get(control).setErrors(null);
        form.get(control).reset();
      })
    }

  }
  static checkedBoxIfCheckedOrNot(form: FormGroup, checked: boolean, errorType: any, controlsToErrorSetTrue: string[], controlsToErrorSetFalse: string[]) {

    const error = errorType;
    const checkedValue: boolean = checked

    if (checkedValue) {
      controlsToErrorSetTrue.map(control => form.get(control).setErrors(error));
    }
    else {
      controlsToErrorSetTrue.map(control => {
        form.get(control).setErrors(null);
        form.get(control).reset();
      })
    }

    if (!checkedValue) {
      controlsToErrorSetFalse.map(control => form.get(control).setErrors(error));
    }
    else {
      controlsToErrorSetFalse.map(control => {
        form.get(control).setErrors(null);
        form.get(control).reset();
      })
    }

  }

  static selectValidator(form: FormGroup, selected: string, operators: string, wordApplyOperator: string, errorType: any, controls: string[]) {
    const selectedValue = selected.toLowerCase();
    const error = errorType;
    const conditional = operators;
    const wordTest = wordApplyOperator.toLowerCase();

    if (conditional === '==' || conditional === '===') {
      if (selectedValue === wordTest) {
        controls.map(control => {
          if (!form.get(control).value) {
            form.get(control).setErrors(error)
          }
        })
      }
      else {
        controls.map(control => form.get(control).setErrors(null))
      }
    }

    if (conditional === '!=') {
      if (selectedValue != wordTest) {
        controls.map(control => {
          if (!form.get(control).value) {
            form.get(control).setErrors(error)
          }
        })
      }
      else {
        controls.map(control => form.get(control).setErrors(null))
      }
    }
  }

  static blurValidator(form: FormGroup, errorType: any[], control: string) {

    const errors = errorType;
    const ctrl = control;
    if (!form.get(ctrl).value) {
      errors.map(error => form.get(ctrl).setErrors(error))
    }

  }

  static atLeastOneValidationBlur(form: FormGroup, controls: string[], errorType: any) {

    const ctrls = controls;
    const error = errorType;

    ctrls.map(control => {
      if (!form?.get(control)?.value) {
        form?.get(control)?.setErrors(error);
      }
    })

    ctrls.map(control => {
      if (form?.get(control)?.value) {
        ctrls.map(ctrlToNull => form?.get(ctrlToNull)?.setErrors(null))
      }
    })
  }

  static dateFormatValidator(aControl: AbstractControl) {
    console.log(aControl)
    if (aControl && aControl.value && !moment(aControl.value, 'DD-MM-YYYY', true).isValid()) {
      return { invalidDate: true }
    }
    return null;
  }



}
