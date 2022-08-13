import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'base-form',
  template: '<div></div>',
})

export class BaseForm implements OnInit {

  formMain: FormGroup

  private _characters: string = ' caracteres.';
  private _quantity: number;
  private _minLen: string = 'Preenchimento, mínimo de pelo menos ';
  private _minLe: string = 'Preenchimento, mínimo de pelo menos ';
  private _maxLen: string = 'não pode ultrapassar ';
  private _req: string = ' é de preenchimento obrigatório.';
  private _email: string = 'E-mail é inválido. Por favor, insira um valido! ';

  constructor() { }

  public mailField(form: FormGroup | FormArray, ctrl: string, msgEmail: string) {
    return form.get(ctrl).hasError('email')
    ? `${this._email}`
    : ''
  }

  // public commonFields(form: FormGroup, ctrl: string, lengthMin?: number, lengthMax?: number) {
  //   return form.get(ctrl).hasError('minlength')
  //     ? `${this._minLen}${lengthMin}${this._characters}`
  //     : form.get(ctrl).hasError('maxlength')
  //       ? `${this._maxLen}${lengthMax}${this._characters}` : '';
  // }

  public required(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string) {
    return  form.get(ctrl).hasError('required')
          ? `${ctrlToShow + ' '}${this._req}` : form.get(ctrl).hasError('empty')
            ? this._quantity : '';
  }

  public minMax(form: FormGroup | FormArray, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number){
    return form.get(ctrl).hasError('minlength')
      ? `${ctrlToShow} ${this._minLen}${lengthMin}${this._characters}` : form.get(ctrl).hasError('maxlength')
        ? `${ctrlToShow} ${this._maxLen}${lengthMax}${this._characters}` : form.get(ctrl).hasError('max')
        ? `${ctrlToShow} ${this._maxLen}${lengthMax}${this._characters}`: ''
  }

  public touchedErrors(groupOrArray: FormGroup | FormArray, ctrl: string) {
    return groupOrArray.get(ctrl).errors
      && groupOrArray.get(ctrl).touched
      ? true : false;
  }

  resetForm() {
    this.formMain.reset();
}

  ngOnInit(): void {
}


}
