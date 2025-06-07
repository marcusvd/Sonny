import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function AtLeastOneBillingFromSelectedValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const group = control as any;

    const customerId = group.get('customerId').value as number;
    const partnerId = group.get('partnerId').value as number;
    const base = group.get('base').value as boolean;

    const isValid = (customerId || partnerId || base)

    if (!isValid) {
      group.get('customerId').setErrors({ atleastone: true });
      group.get('partnerId').setErrors({ atleastone: true });
      group.get('base').setErrors({ atleastone: true });
    }
    else {
      group.get('customerId').setErrors(null);
      group.get('partnerId').setErrors(null);
      group.get('base').setErrors(null);
    }

    return null;

  }
}
