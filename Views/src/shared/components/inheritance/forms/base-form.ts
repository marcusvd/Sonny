
import { FormGroup, Validators } from '@angular/forms';
import * as diacritics from 'diacritics';

export class BaseForm  {

  companyId = JSON.parse(localStorage.getItem('companyId'))
  userId = JSON.parse(localStorage.getItem('userId'))

  minValue = new Date('0001-01-01T00:00:00.000Z');
  // minValue = new Date('0001-01-01T00:00:00');

  currentDate = new Date();
  currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

  formMainDynamic: FormGroup;
  formMain: FormGroup;
  subForm: FormGroup;

  saveBtnEnabledDisabled: boolean = false;

  //validators msg
  requiredMsg = 'Obrigatório!';
  emailMsg = 'E-mail inválido!';
  requiredTrueMsg = 'Obrigatório!';
  invalidCpfMsg = 'CPF, inválido!';
  invalidCnpjMsg = 'CNPJ, inválido!';
  invalidPhoneMsg = 'Telefone, inválido!';
  invalidPhoneMaskMsg = 'Telefone, inválido!';
  invalidCepMsg = 'CEP, inválido!';
  invalidPasswordMsg = 'Senha, inválida!';
  invalidPasswordConfirmMsg = 'Confirmação de senha, inválida!';
  invalidCpfOrCnpjMsg = 'CPF ou CNPJ, inválido!';
  invalidCpfOrCnpjMaskMsg = 'CPF ou CNPJ, inválido!';
  invalidDateMsg = 'Data, inválida!';
  invalidDateMaskMsg = 'Data, inválida!';
  invalidHourMsg = 'Horário, inválido!';
  maxLengthMsg = 'Máximo de ';
  minLengthMsg = 'Mínimo de ';
  limitMaxMsg = 'Máximo de excedido!';
  limitMinMsg = 'Abaixo do mínimo necessário!';
  charactersMsg = ' caracteres!'
  inUseMsg = 'Já cadastrado!';

  constructor(

  ) {


  }

  addValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form?.get(field).setValidators(Validators.required);
      form?.get(field).updateValueAndValidity();
    })
  }

  removeValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form?.get(field).setValue(null);
      form?.get(field).removeValidators(Validators.required);
      form?.get(field).removeValidators(Validators.requiredTrue);
      form?.get(field).updateValueAndValidity();
    })
  }

  resetFields(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form?.get(field).reset();
    })
  }

  setFormFieldEnableDisable(form: FormGroup, field: string, action: boolean) {
    if (action)
      form?.get(field).enable();
    else
    form?.get(field).disable();
  }

  setFormFieldValue(form: FormGroup, field: string, value: any) {
    form?.get(field).setValue(value);
  }

  formTouched = (form: FormGroup, field: string) => {
    return form?.get(field).touched
  }

  removeNonNumericAndConvertToNumber(str: string): number {
    return +str?.replace(/\D/g, '');
  }

  removeAccentsSpecialCharacters(value: string): string {
    const noAccents = diacritics.remove(value);//remove accents
    return noAccents?.replace(/[^\w\s]/gi, ''); //remove special characters
  }

  formError = (form: FormGroup, field: string, error: string) => {
    return form?.get(field)?.hasError(error)
  }



  alertSave(form: FormGroup) {
    if (!form?.valid) {
      alert('Todos os campos com (*) e em vermelho, são de preenchimento obrigatório. Preencha corretamente e tente novamente.')
      form?.markAllAsTouched();
      return false;
    }
    else {
      return true;
    }

  }
}

