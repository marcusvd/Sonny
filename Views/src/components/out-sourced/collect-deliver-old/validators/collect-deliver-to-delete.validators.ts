
import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";


export class CollectDeliverToDeleteValidators {

  static atLeastOneCheckBox(form: FormGroup, controls: string[]) {

    const formMain = form;
    const ctrls = controls;

    ctrls?.map(x => {
      formMain?.get(x)?.setValidators(Validators.requiredTrue);
      formMain?.get(x)?.updateValueAndValidity();
    })

    const resultCheck = ctrls?.map(x => {
      if (formMain?.get(x).value) return true;
      return false;
    })

    resultCheck?.forEach(x => {
      if (x) {
        ctrls?.forEach(xy => {
          formMain?.get(xy)?.removeValidators(Validators.requiredTrue)
          formMain?.get(xy)?.updateValueAndValidity();
        })
      }
    })
  }

  // static atLeastOneCheckBoxTsFile(form: FormGroup, controls: string[]) {

  //   const formMain = form;
  //   const ctrls = controls;

  //   ctrls.map(x => {
  //     formMain?.get(x)?.setValidators(Validators.requiredTrue);
  //     formMain?.get(x)?.updateValueAndValidity();
  //   })
  //   console.log(formMain)
  //   // console.log(form)
  // }

  static required(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;

    ctrl.forEach(x=>{
      formMain?.get(x).setValidators(Validators.required);
      formMain?.get(x).updateValueAndValidity();
    })

  }

}

