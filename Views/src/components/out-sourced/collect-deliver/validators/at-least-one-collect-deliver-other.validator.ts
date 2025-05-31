import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Data } from "@angular/router";



export function AtLeastOneCollectDeliverOtherValidator(): ValidatorFn {

  const minDate = new Date('0001-01-01T00:00:00');

  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as any;

    const collect = group.get('collect')?.value as boolean;
    const deliver = group.get('deliver')?.value as boolean;
    const other = group.get('other')?.value as boolean;

    const isValid =
      (collect) || (deliver) || (other)


    if (!isValid) {
      group.get('collect')?.setErrors({ atleastone: true });
      group.get('deliver')?.setErrors({ atleastone: true });
      group.get('other')?.setErrors({ atleastone: true });
    }
    else {
      group.get('collect')?.setErrors(null);
      group.get('deliver')?.setErrors(null);
      group.get('other')?.setErrors(null);
    }
    return null;
  }


}
