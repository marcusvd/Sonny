


import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function CreditLimitValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const group = control as any;

    const typeIsDebit = (+group.get('type').value > 0);
    const creditLimit = !(+group.get('creditLimit').value > 100);

    if (typeIsDebit && creditLimit) {
      group.get('creditLimit').setValidators(Validators.required);
    }
    else {
      group.get('creditLimit').setErrors(null);
    }

    console.log(typeIsDebit && creditLimit)
    // console.log(+group.get('creditLimit').value <= 0)
    // console.log(+group.get('creditLimit').errors)
    // console.log(group.get('creditLimit').errors)
    // const partnerId = group.get('partnerId').value as number;
    // const partnerId = group.get('partnerId').value as number;
    // const base = group.get('base').value as boolean;

    // const isValid = (customerId || partnerId || base)

    // if (!isValid) {
    //   isDebit
    //   group.get('partnerId').setErrors({ atleastone: true });
    //   group.get('base').setErrors({ atleastone: true });
    // }
    // else {
    //   group.get('customerId').setErrors(null);
    //   group.get('partnerId').setErrors(null);
    //   group.get('base').setErrors(null);
    // }


    return null;

  }
}



export class FinancialValidator {

  static cardLimitRequired(form: FormGroup) {

    const formGroup = form;

    const valueForTypeofCard: string = formGroup.get('type').value;

    if (valueForTypeofCard.toLowerCase() == 'débito') {
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

    const valueType: number = form.get('type').value
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

