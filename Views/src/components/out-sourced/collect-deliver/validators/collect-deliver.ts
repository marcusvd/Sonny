
import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";


export class CollectDeliver {

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
    const ctrls: string[] = [];
    const selectedRadio: string[] = selectedRadioControls;

    controls.map(allControls => {
      selectedRadioControls.map(selectedControls => {
        if (allControls != selectedControls) {
          ctrls.push(allControls)
        }
      })
    })

    ctrls.map(control => {
      form?.get(control).removeValidators(Validators.required)
      form?.get(control).updateValueAndValidity();
      form?.get(control).reset();
    })

    selectedRadio.map(selectedRadio => {
      form?.get(selectedRadio).setValidators(Validators.required);
      form?.get(selectedRadio).updateValueAndValidity();
    })
  }

  static required(form: FormGroup, controls: string[]) {

    const ctrls = controls;

    ctrls.map(control => {
      form?.get(control).setValidators(Validators.required)
      form?.get(control).updateValueAndValidity();
    })
  }

  static requiredIf(form: FormGroup, controlsBools: string, controlsToValidate: string) {

    const ctrlsBools = controlsBools;
    const ctrlsValidate = controlsToValidate;

    if (form.get(ctrlsBools).value) {
      form?.get(ctrlsValidate).setValidators(Validators.required)
      form?.get(ctrlsValidate).updateValueAndValidity();
    }
    else {
      form?.get(ctrlsValidate).removeValidators(Validators.required)
      form?.get(ctrlsValidate).reset();
      form?.get(ctrlsValidate).updateValueAndValidity();
    }

  }



  static atLeastOneCheckBox(form: FormGroup, controls: string[]) {
    const ctrlsBools = controls;

    if (!form?.get(ctrlsBools[0]).value && !form?.get(ctrlsBools[1]).value) {
      // alert('É necessário seja marcada pelo menos uma caixa no primeiro passo. "MOTIVO"')
      ctrlsBools.map(x => {
        form?.get(x).setValidators(Validators.requiredTrue);
        form?.get(x).updateValueAndValidity();
      })
    } else
      ctrlsBools.map(x => {
        form?.get(x).removeValidators(Validators.requiredTrue)
        form?.get(x).updateValueAndValidity();
      })

  }






}

