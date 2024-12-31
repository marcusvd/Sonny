import { BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, Validators } from '@angular/forms';
import * as diacritics from 'diacritics';
import { Responsive } from '../responsive/responsive';

export class BaseForm extends Responsive {

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
  invalidHourMsg= 'Horário, inválido!';
  maxLengthMsg = 'Máximo de ';
  minLengthMsg = 'Mínimo de ';
  limitMaxMsg = 'Máximo de excedido!';
  limitMinMsg = 'Abaixo do mínimo necessário!';
  charactersMsg = ' caracteres!'
  inUseMsg = 'Já em Cadastrado!';

  constructor(
    override _breakpointObserver?: BreakpointObserver,
  ) {
    super(_breakpointObserver)

  }

  addValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValidators(Validators.required);
      form.get(field).updateValueAndValidity();
    })
  }

  removeValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValue(null);
      form.get(field).removeValidators(Validators.required);
      form.get(field).removeValidators(Validators.requiredTrue);
      form.get(field).updateValueAndValidity();
    })
  }

  SetFieldFormMain(field: string, value: any) {
    this.formMain.get(field).setValue(value);
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

  formTouched = (form: FormGroup, field: string) => {
    return form?.get(field).touched
  }

  alertSave(form: FormGroup) {
    if (!form.valid) {
      alert('Todos os campos com (*) e em vermelho, são de preenchimento obrigatório. Preencha corretamente e tente novamente.')
      form.markAllAsTouched();
      return false;
    }
    else {
      return true;
    }

  }



}

