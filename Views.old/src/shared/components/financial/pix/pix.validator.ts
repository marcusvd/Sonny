
import { FormGroup, Validators } from '@angular/forms';
import { CpfCnpjValidator } from '../../../helpers/validators/cpf-cnpj.validator';



export class PixValidator {

  static pixValidator(form: FormGroup, selected: string, input?: string) {

    this.cnpjValidator(form, selected, input)
    this.cpfValidator(form, selected, input)
  }

  static cnpjValidator(form: FormGroup, selected: string, input?: string) {
    if (selected === 'CNPJ') {
      form.get('value').setErrors({ 'invalid-cnpj': true })
      if (CpfCnpjValidator.isValidCpfCnpj(input, 'cnpj'))
        form.get('value').setErrors(null)
    }
  }

  static cpfValidator(form: FormGroup, selected: string, input?: string) {
    if (selected === 'CPF') {
      form.get('value').setErrors({ 'invalid-cpf': true });

      if (CpfCnpjValidator.isValidCpfCnpj(input, 'cpf'))
        form.get('value').setErrors(null);
    }
  }



  static pixValidatorSelected(form: FormGroup, selected: string) {

    // this.nonePixValidator(form, selected);
    this.emailValidator(form, selected);
    this.celValidator(form, selected);

  }

  // static nonePixValidator(form: FormGroup, selected: string) {
  //   if (selected === 'NENHUM') {
  //     form.get('value').removeValidators(Validators.required);
  //     form.get('value').setErrors(null)
  //     form.get('value').updateValueAndValidity();
  //   }
  //   else
  //     form.get('value').addValidators(Validators.required);
  // }
  static emailValidator(form: FormGroup, selected: string) {
    if (selected === 'E-MAIL') {
      console.log('com validators')
      form.get('value').addValidators(Validators.email);
      form.get('value').updateValueAndValidity();
    }
    else {
      form.get('value').removeValidators(Validators.email);
      console.log('sem validators')
      form.get('value').setErrors(null)
      form.get('value').updateValueAndValidity();
    }
  }

  static celValidator(form: FormGroup, selected: string) {
    if (selected === 'CEL') {
      form.get('value').addValidators(Validators.minLength(11));
      form.get('value').updateValueAndValidity();
    }
  }

}
