import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function usedHistoricalOrSupplierValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const usedHistoricalOrSupplier = control.enabled;

    return usedHistoricalOrSupplier ? { required: true } : null;

  }
}

// export function isTestedToDate(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {

//     const isTested = control.value

//     if (isTested)
//       control.setValue(new Date());
//     else
//     control.setValue(new Date());


//   }
// }
