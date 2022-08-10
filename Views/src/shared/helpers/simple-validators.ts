import { Injectable } from "@angular/core";
import { Form, FormArray, FormControl } from "@angular/forms";
import { FormArrayName, FormBuilder, FormGroup, FormGroupName, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class SimpleValidators {

  constructor() { }

  private _characters: string = ' caracteres.';
  private _quantity: number;
  private _minLen: string = 'Preenchimento, mínimo de pelo menos ';
  private _minLe: string = 'Preenchimento, mínimo de pelo menos ';
  private _maxLen: string = 'Preenchimento não pode ultrapassar ';
  private _req: string = ' é de preenchimento obrigatório.';

  public touchedErrors(ctrl: string, formGroup: FormGroup) {
    return formGroup.get(ctrl).errors
      && formGroup.get(ctrl).touched
      ? true : false;
  }
  public commonFields(form: FormGroup, ctrl: string, lengthMin?: number, lengthMax?: number) {
    return form.get(ctrl).hasError('minlength')
      ? lengthMin : form.get(ctrl).hasError('maxlength')
        ? lengthMax : '';
  }

  public required(form: FormGroup, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return form.get(ctrl).hasError('minlength')
      ? `${this._minLen}${lengthMin}${this._characters}`
      : form.get(ctrl).hasError('min')
        ? `${this._minLe}${lengthMin}${this._characters}`
        : form.get(ctrl).hasError('maxlength')
          ? `${this._maxLen}${lengthMax}${this._characters}`
          : form.get(ctrl).hasError('required')
            ? `${ctrlToShow + ' '}${this._req}` :
            form.get(ctrl).hasError('empty')
              ? this._quantity : '';
  }

  public mailField(ctrl: string, msgEmail: string, msgMax: string, msgReq: string, form: FormGroup) {
    return form.get(ctrl).hasError('email')
      ? msgEmail
      : form.get(ctrl).hasError('maxlength')
        ? msgMax
        : form.get(ctrl).hasError('required')
          ? msgReq : '';
  }
  public requiredArray(formArray: FormArray, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {

    return formArray.get(ctrl).hasError('minlength')
      ? `${this._minLen}${lengthMin}${this._characters}`
      : formArray.get(ctrl).hasError('maxlength')
        ? `${this._maxLen}${lengthMax}${this._characters}`
        : formArray.get(ctrl).hasError('required')
          ? `${ctrlToShow + ' '}${this._req}` : '';
  }

  public touchedErrorsArray(formArray: FormArray, ctrl: string) {
    return formArray.get(ctrl).errors && formArray.get(ctrl).touched ? true : false;
  }
}
