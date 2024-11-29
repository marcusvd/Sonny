import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function usedHistoricalOrSupplierValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

       const test = control.enabled;

        return test ?  { required: true } : null;

    }
}