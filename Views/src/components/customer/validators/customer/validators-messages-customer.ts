import { FormArray, FormGroup } from "@angular/forms";

export class ValidatorMessagesCustomer {

  static currencyValuePayment(form: FormGroup, ctrl: string, ctrlToShow: string, currencyValue?: string) {
    return form.get(ctrl).hasError('ValuBelowAllowed')
      ? `${'Mínimo de pelo menos '}${currencyValue}` : '';
  }

}
