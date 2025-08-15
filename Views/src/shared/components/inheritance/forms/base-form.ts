
import { FormGroup, Validators } from '@angular/forms';
import * as diacritics from 'diacritics';
import { DefaultMessages } from 'src/shared/helpers/validators/default-messages';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MonthsDto } from '../../months-select/months-dto';
import { NavigationExtras, Router } from '@angular/router';
import { inject } from '@angular/core';

export class BaseForm {
  private readonly _routerInject = inject(Router);

  companyId = localStorage.getItem('companyId')
    ? JSON.parse(localStorage.getItem('companyId')!)
    : '';

  userId = localStorage.getItem('userId')
    ? JSON.parse(localStorage.getItem('userId')!)
    : '';

  minValue = new Date('0001-01-01T00:00:00');
  today = new Date();

  currentDate = new Date();
  currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

  formMainDynamic!: FormGroup;
  formMain!: FormGroup;
  subForm!: FormGroup;

  saveBtnEnabledDisabled: boolean = false;

  defaultMessages = DefaultMessages;
  validatorMessages = ValidatorMessages;

  event = { target: window } as unknown as Event;
  screenWidth: number = window.innerWidth;
  screen(event?: Event) {
    const target = event.target as Window;
    this.screenWidth = target.innerWidth;
    return this.screenWidth
  }

  addValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form?.get(field)?.setValidators(Validators.required);
      form?.get(field)?.updateValueAndValidity();
    })
  }

  removeValidators(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form?.get(field)?.setValue(null);
      form?.get(field)?.removeValidators(Validators.required);
      form?.get(field)?.removeValidators(Validators.requiredTrue);
      form?.get(field)?.updateValueAndValidity();
    })
  }

  resetFields(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form?.get(field)?.reset();
    })
  }

  setFormFieldEnableDisable(form: FormGroup, field: string, action: boolean) {
    if (action)
      form?.get(field)?.enable();
    else
      form?.get(field)?.disable();
  }

  setFormFieldValue(form: FormGroup, field: string, value: any) {
    form?.get(field)?.setValue(value);
  }

  removeNonNumericAndConvertToNumber(str: string): number {
    return +str?.replace(/\D/g, '');
  }

  removeAccentsSpecialCharacters(value: string): string {
    if (typeof value === 'string') {
      const noAccents = diacritics.remove(value);
      return noAccents?.replace(/[^\w\s]/gi, '');
    }
    return value;

  }

  //só product esta usando, será atualizado
  formTouched = (form: FormGroup, field: string) => {
    return form?.get(field).touched
  }

  formError = (form: FormGroup, field: string, error: string) => {
    return form?.get(field)?.hasError(error)
  }

  formErrorAndTouched = (form: FormGroup, field: string, error: string) => {
    return form?.get(field)?.hasError(error) && form?.get(field)?.touched;
  }

  

  months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]

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

  callRouter(url: string, entity?: any) {

    const objectRoute: NavigationExtras = {
      state: entity
    };

    this._routerInject.navigate([url], objectRoute);
  }


}

