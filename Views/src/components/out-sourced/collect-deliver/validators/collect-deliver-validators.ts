
import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";


export class CollectDeliverValidators {

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

  // static atLeastOneEntitySelected(form: FormGroup, controls: string[]) {

  //   form.get('transporterId').hasError('required')

  //   form.get('transporterId').touched

  // }

  static atLeastOneEntitySelectedDestiny(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;

    if (formMain?.get('customerId').value == null || formMain?.get('partnerId').value == null || formMain?.get('noRegisterName').value == null && formMain?.get('noRegisterAddress').value == null) {

      ctrl.forEach(x => {
        formMain?.get(x).setValidators(Validators.required);
        formMain?.get(x).updateValueAndValidity();
      })

    }
  }

  static removeValidatorsCollectDeliverEditOnUpdate(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;

    ctrl.forEach(x => {
      formMain?.controls[x]?.removeValidators(Validators.required);
      formMain?.controls[x]?.updateValueAndValidity();
    })

  }

  static atLeastOneEntitySelectedPaymentEndDestiny(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;
    let result: boolean = false;

    ctrl.forEach(x => {
      if (formMain?.get(x).value) {
        result = true
      }
    })

    return result;

  }


  static removeValidatorsDestiny(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;


    if (formMain?.get('customerId').value != null || formMain?.get('partnerId').value != null || (formMain?.get('noRegisterName').value != null && formMain?.get('noRegisterAddress').value != null)) {
      ctrl.forEach(x => {
        formMain?.get(x).removeValidators(Validators.required);
        formMain?.get(x).updateValueAndValidity();
      })

    }


  }
  static removeValidatorsPayment(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;


    if (formMain?.get('customerId').value != null || formMain?.get('partnerId').value != null) {
      ctrl.forEach(x => {
        formMain?.get(x).removeValidators(Validators.required);
        formMain?.get(x).updateValueAndValidity();
      })

    }


  }


  static atLeastOneEntitySelectedPayment(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;

    if (formMain?.get('customerId').value == null || formMain?.get('partnerId').value == null) {

      ctrl.forEach(x => {
        formMain?.get(x).setValidators(Validators.required);
        formMain?.get(x).updateValueAndValidity();
      })

    }
  }


  static required(form: FormGroup, control: string[]) {

    const formMain = form;
    const ctrl = control;

    ctrl.forEach(x => {
      formMain?.get(x).setValidators(Validators.required);
      formMain?.get(x).updateValueAndValidity();
    })

  }

}

