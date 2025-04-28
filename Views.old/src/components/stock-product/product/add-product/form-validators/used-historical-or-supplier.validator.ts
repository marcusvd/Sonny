import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function usedHistoricalOrSupplierValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const usedHistoricalOrSupplier = control.enabled;

    if (usedHistoricalOrSupplier) {
      control.setValidators(Validators.required);
      control.setValidators(Validators.maxLength(250));
      
    }

    return usedHistoricalOrSupplier ? { required: true } : null;

  }
}

