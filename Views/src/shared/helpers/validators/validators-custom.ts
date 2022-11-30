
import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";


export class ValidatorsCustom {

  constructor() { }

  static checkedBoxValidator(form: FormGroup, checked: boolean, controls: string[]) {
    //checked true all controls is required.
    const checkedValue: boolean = checked
    if (checkedValue) {
      controls.map(control => form.get(control).setValidators(Validators.required));
    }
    else {
      controls.map(control => {
        form.get(control).clearValidators();
        form.get(control).updateValueAndValidity();
        form.get(control).reset();
      })
    }
  }

  static selectValidator(form: FormGroup, selected: string, operators: string, wordApplyOperator: string, ctrls: string[]) {

    const selectedValue = selected.toLowerCase();
    const conditional = operators;
    const wordTest = wordApplyOperator.toLowerCase();
    const controls = ctrls;

    if (conditional === '==' || conditional === '===') {
      if (selectedValue === wordTest) {
        controls.map(control => {
          if (!form.get(control).value) {
            form.get(control).addValidators(Validators.required)
          }
        })
      }
      else {
        controls.map(control => {
          form.get(control).clearValidators();
          form.get(control).updateValueAndValidity();
          form.get(control).reset();
        })
      }
    }

    if (conditional === '!=') {
      if (selectedValue != wordTest) {
        controls.map(control => {
          if (!form.get(control).value) {
            form.get(control).addValidators(Validators.required)
            console.log(form)
          }
        })
      }
      else {
        controls.map(control => {
          console.log(control)
          form.get(control).clearValidators();
          form.get(control).updateValueAndValidity();
          // form.get(control).reset();
        })
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

  static atLeastOneValidationBlur(form: FormGroup, controls: string[]) {

    const ctrls = controls;
    //const error = errorType;

    ctrls.map(control => {
      if (!form?.get(control)?.value) {
        form?.get(control)?.setValidators(Validators.required);
      }
    })

    ctrls.map(control => {
      if (form?.get(control)?.value) {
        ctrls.map(ctrlToNull => {
          form?.get(ctrlToNull)?.clearValidators();
          form?.get(ctrlToNull)?.updateValueAndValidity();
        })
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

// export class ValidatorsCollectDeliver {

//   static checkBoxTranporter(form: FormGroup, checked: boolean, controlsToErrorSetTrue: string[], controlsToErrorSetFalse: string[]) {

//     const checkedValue: boolean = checked
//     const ctrlErrorTrue = controlsToErrorSetTrue;
//     const ctrlErrorFalse = controlsToErrorSetFalse;

//     if (checkedValue) {
//       ctrlErrorTrue.map(control => form.get(control).setValidators(Validators.required))
//     }
//     else {
//       ctrlErrorTrue.map(control => {
//         form.get(control).clearValidators();
//         form.get(control).updateValueAndValidity();
//         form.get(control).reset();
//       })
//     }

//     if (!checkedValue) {
//       ctrlErrorFalse.map(control => form.get(control).setValidators(Validators.required))
//     }
//     else {
//       ctrlErrorFalse.map(control => {
//         form.get(control).clearValidators();
//         form.get(control).updateValueAndValidity();
//         form.get(control).reset();
//       })
//     }

//   }

//   static radioGroupSelectedValidator(form: FormGroup, selectedRadioControls: string[], controls: string[]) {

//     const ctrls = controls;
//     const selRdCtrl = selectedRadioControls;

//     ctrls.map(control => {
//       form?.get(control).removeValidators(Validators.required)
//       form?.get(control).updateValueAndValidity();
//     })

//     selRdCtrl.map(sel => {
//       form?.get(sel).setValidators(Validators.required)
//     }

//     )
//   }

// }

