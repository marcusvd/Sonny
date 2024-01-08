
import { FormGroup, Validators } from '@angular/forms';
import { CpfCnpjValidator } from '../../../helpers/validators/cpf-cnpj.validator'



export class FinancialPixValidator {


  static pixValidator(form: FormGroup, selected: string, input?: string) {

    this.cnpjValidator(form, selected, input)
    this.cpfValidator(form, selected, input)
  }

  static cnpjValidator(form: FormGroup, selected: string, input?: string) {
    if (selected === 'CNPJ') {
      form.get('pix').setErrors({ 'invalid-cnpj': true })

      if (CpfCnpjValidator.isValidCpfCnpj(input, 'cnpj'))
        form.get('pix').setErrors(null)
    }
  }
  static cpfValidator(form: FormGroup, selected: string, input?: string) {
    if (selected === 'CPF') {
      form.get('pix').setErrors({ 'invalid-cpf': true });

      if (CpfCnpjValidator.isValidCpfCnpj(input, 'cpf'))
        form.get('pix').setErrors(null);
    }
  }



  static pixValidatorSelected(form: FormGroup, selected: string) {

    this.nonePixValidator(form, selected);
    this.emailValidator(form, selected);
    this.celValidator(form, selected);

    form.get('pix').setValue(null);

  }
  static nonePixValidator(form: FormGroup, selected: string) {
    if (selected === 'NENHUM') {
      form.get('pix').removeValidators(Validators.required);
      form.get('pix').setErrors(null)
      form.get('pix').updateValueAndValidity();
    }
    else
      form.get('pix').addValidators(Validators.required);
  }
  static emailValidator(form: FormGroup, selected: string) {
    if (selected === 'E-MAIL')
      form.get('pix').addValidators(Validators.email);
    else
      form.get('pix').removeValidators(Validators.email);
  }

  static celValidator(form: FormGroup, selected: string) {
    if (selected === 'CEL')
      form.get('pix').addValidators(Validators.minLength(11));
  }

}
