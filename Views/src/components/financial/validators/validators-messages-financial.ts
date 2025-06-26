import { FormGroup } from "@angular/forms";

export class ValidatorMessagesFinancial {

  static cardNumber(form: FormGroup, ctrl: string) {
    return form.get(ctrl).hasError('isInvalid')
      ? `${'Número inválido.'}` : '';
  }
  static cardValidateDate(form: FormGroup, ctrl: string) {
    return form.get(ctrl).hasError('valInValid')
      ? `${'Validade é inválido.'}` : `${'Validade é inválido.'}`;
  }

}
