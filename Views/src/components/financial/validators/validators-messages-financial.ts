import { FormArray, UntypedFormGroup } from "@angular/forms";

export class ValidatorMessagesFinancial {

  static currencyValueLimit(form: UntypedFormGroup, ctrl: string, ctrlToShow: string, currencyValue?: string) {
    return form.get(ctrl).hasError('ValuBelowAllowed')
      ? `${'Mínimo de pelo menos '}${currencyValue}` : '';
  }

}
