import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function AtLeastOnePaymentValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const group = control as any;

    const pixId = group.get('pixId').value as number;
    const cardId = group.get('cardId').value as number;
    const othersPaymentMethods = group.get('othersPaymentMethods').value as boolean;

    const isValid = (pixId || cardId || othersPaymentMethods)

    if (!isValid) {
      group.get('pixId').setErrors({ atleastone: true });
      group.get('cardId').setErrors({ atleastone: true });
      group.get('othersPaymentMethods').setErrors({ atleastone: true });
    }
    else {
      group.get('pixId').setErrors(null);
      group.get('cardId').setErrors(null);
      group.get('othersPaymentMethods').setErrors(null);
    }

    return null;

  }
}
