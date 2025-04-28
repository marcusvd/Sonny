
import { FormGroup, Validators } from "@angular/forms";


export class FinancialValidator {

  static cardLimitRequired(form: FormGroup) {

    const formGroup = form;

    const valueForTypeofCard: string = formGroup.get('type').value;

    if (valueForTypeofCard.toLowerCase() == 'débito') {
      // formGroup?.get('limit').removeValidators(Validators.required)
      formGroup?.get('limit').setValidators(null)
      formGroup?.get('limit').updateValueAndValidity();
    }
    else {
      formGroup?.get('limit').setValidators([Validators.required, Validators.min(1)])
      formGroup?.get('limit').updateValueAndValidity();
    }

  }



  static limitWhenRequired(formToBeValidate: FormGroup, valueToBeCompared: number, errorToBeSet: any, controlToBeAccessed: string) {
      const form = formToBeValidate;
      const valueCompare = valueToBeCompared;
      const errorType = errorToBeSet;
      const control = controlToBeAccessed;

      const valueType:number = form.get('type').value
      if (valueType == 0) {
        form.get(control).setErrors(null)
        form.get(control).removeValidators(errorType);
      }
      else {
        if (form.get(control).value != null || form.get(control).value != '') {
          if (form.get(control).value <= valueCompare) {
            form.get(control).setErrors(errorType)
          }
        }
      }
}

  }

