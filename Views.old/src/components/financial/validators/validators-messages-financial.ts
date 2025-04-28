import { FormGroup } from "@angular/forms";

export class ValidatorMessagesFinancial {

  // static currencyValueLimit(form: FormGroup, ctrl: string, ctrlToShow: string, currencyValue?: string) {
  //   return form.get(ctrl).hasError('ValuBelowAllowed')
  //     ? `${'Mínimo de pelo menos '}${currencyValue}` : '';
  // }

  static cardNumber(form: FormGroup, ctrl: string) {
    return form.get(ctrl).hasError('isInvalid')
      ? `${'Número inválido.'}` : '';
  }
  static cardValidateDate(form: FormGroup, ctrl: string) {
    return form.get(ctrl).hasError('valInValid')
      ? `${'Validade é inválido.'}` : `${'Validade é inválido.'}`;
  }

}
