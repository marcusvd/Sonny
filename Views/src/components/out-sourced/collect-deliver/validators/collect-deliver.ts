
import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";


export class CollectDeliverValidators {

  static atLeastOneCheckBox(form: FormGroup, controls: string[]) {

    const formMain = form;
    const ctrlsBools = controls;

    ctrlsBools.map(x => {
      formMain?.get(x).setValidators(Validators.requiredTrue);
      formMain?.get(x).updateValueAndValidity();
    })

    const resultCheck = ctrlsBools.map(x => {
      if (formMain.get(x).value) return true;
      return false;
    })

    resultCheck.forEach(x => {
      if (x) {
        ctrlsBools.forEach(xy => {
          formMain?.get(xy).removeValidators(Validators.requiredTrue)
          formMain?.get(xy).updateValueAndValidity();
        })
      }
    })
  }

  static required(form: FormGroup, control: string) {

    const formMain = form;
    const ctrl = control;

    formMain?.get(ctrl).setValidators(Validators.required);
    formMain?.get(ctrl).updateValueAndValidity();

  }





}

