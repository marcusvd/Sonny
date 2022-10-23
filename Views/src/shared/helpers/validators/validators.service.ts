
import { Injectable } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  private _characters: string = ' caracteres.';
  private _quantity: number;
  private _minLen: string = 'Preenchimento, mínimo de pelo menos ';
  private _minLe: string = 'Preenchimento, mínimo de pelo menos ';
  private _maxLen: string = 'não pode ultrapassar ';
  private _req: string = ' é de preenchimento obrigatório.';
  private _email: string = 'E-mail é inválido. Por favor, insira um valido! ';

  constructor() {}

  testHtml(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string) {


    // return form.get(ctrl).hasError('testValidator').letMeSee;
    //   ? `${ctrlToShow + ' '}${this._req}` : ''



  }

  mailField(form: FormGroup | FormArray, ctrl: string, msgEmail: string) {
    return form.get(ctrl).hasError('email')
      ? `${this._email}`
      : ''
  }

  required(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string) {
    return form.get(ctrl).hasError('required')
      ? `${ctrlToShow + ' '}${this._req}` : form.get(ctrl).hasError('empty')
        ? this._quantity : '';
  }

  minMax(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return form.get(ctrl).hasError('minlength')
      ? `${ctrlToShow} ${this._minLen}${lengthMin}${this._characters}` : form.get(ctrl).hasError('maxlength')
        ? `${ctrlToShow} ${this._maxLen}${lengthMax}${this._characters}` : form.get(ctrl).hasError('max')
          ? `${ctrlToShow} ${this._maxLen}${lengthMax}${this._characters}` : ''
  }

  touchedErrors(groupOrArray: FormGroup | FormArray, ctrl: string) {
    return groupOrArray.get(ctrl).errors
      && groupOrArray.get(ctrl).touched
      ? true : false;
  }
}

