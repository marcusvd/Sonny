
import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";


export class ValidatorsCollectDeliver {

  static checkBoxTranporter(form: FormGroup, checked: boolean, controlsToErrorSetTrue: string[], controlsToErrorSetFalse: string[]) {

    const checkedValue: boolean = checked
    const ctrlErrorTrue = controlsToErrorSetTrue;
    const ctrlErrorFalse = controlsToErrorSetFalse;

    if (checkedValue) {
      ctrlErrorTrue.map(control => form.get(control).setValidators(Validators.required))
    }
    else {
      ctrlErrorTrue.map(control => {
        form.get(control).clearValidators();
        form.get(control).updateValueAndValidity();
        form.get(control).reset();
      })
    }

    if (!checkedValue) {
      ctrlErrorFalse.map(control => form.get(control).setValidators(Validators.required))
    }
    else {
      ctrlErrorFalse.map(control => {
        form.get(control).clearValidators();
        form.get(control).updateValueAndValidity();
        form.get(control).reset();
      })
    }

  }

  static radioGroupSelectedValidator(form: FormGroup, selectedRadioControls: string[], controls: string[]) {

    const ctrls = controls;
    const selRdCtrl = selectedRadioControls;

    ctrls.map(control => {
      form?.get(control).removeValidators(Validators.required)
      form?.get(control).updateValueAndValidity();
    })

    selRdCtrl.map(sel => {
      form?.get(sel).setValidators(Validators.required)
    }

    )
  }

}

