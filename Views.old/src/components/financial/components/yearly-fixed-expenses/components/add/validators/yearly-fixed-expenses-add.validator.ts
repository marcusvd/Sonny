
import { FormGroup } from "@angular/forms";


export class YearlyFixedExpensesAddValidator {

  expireDateCompare: Date;
  static validateDate(form: FormGroup, startDate: string, expireDate: string) {

    const start = new Date(form.get(startDate).value)
    const expire = new Date(form.get(expireDate).value)

    if (start > expire) {
      form.get(expireDate).setErrors({ yearlyDate: true })
      form.get(startDate).setErrors({ yearlyDate: true })
    }
    else {
      form?.get(expireDate).setValidators(null)
      form?.get(startDate).setValidators(null)
      form?.get(expireDate).updateValueAndValidity();
      form?.get(startDate).updateValueAndValidity();
    }
  }


  static incorrectDate(form: FormGroup, ctrl: string) {
    return form.get(ctrl).hasError('yearlyDate')
      ? `${'Inicio deve ser maior que vencimento.'}` : '';
  }


}

