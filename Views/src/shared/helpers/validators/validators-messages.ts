import { UntypedFormArray, UntypedFormGroup } from "@angular/forms";

export class ValidatorMessages {

  private static _characters: string = ' caracteres.';
  private static _quantity: number;
  private static _min: string = 'Mínimo de pelo menos ';
  private static _max: string = 'não pode ultrapassar ';
  private static _minLen: string = 'Preenchimento, mínimo de pelo menos ';
  private static _maxLen: string = 'não pode ultrapassar ';
  private static _req: string = ' é de preenchimento obrigatório.';
  private static _opt: string = 'Selecione uma opção, por favor.';
  private static _invalidDate: string = ' Data está no formato incorreto, preencha novamente, FORMATO: dd/mm/aaaa ou selecione uma.';
  private static _atLeastOne: string = ' Pelo menos um dos contatos, deve ser preenchido.';
  private static _email: string = 'E-mail é inválido. Por favor, insira um valido! ';

  static invalidDate(form: UntypedFormGroup, ctrl: string,){
    return form.get(ctrl).hasError('matDatepickerParse')
    ? `${this._invalidDate}` : '';
  }

  static atLeastOne(form: UntypedFormGroup, ctrl: string, ctrlToShow: string) {
    return form.get(ctrl).hasError('atleastone')
      ? `${this._atLeastOne}` : '';
  }

  static mailField(form: UntypedFormGroup | UntypedFormArray, ctrl: string, msgEmail: string) {
    return form.get(ctrl).hasError('email')
      ? `${this._email}`
      : ''
  }

  static required(form: UntypedFormGroup, ctrl: string, ctrlToShow: string) {
    return form?.get(ctrl)?.hasError('required')
      ? `${ctrlToShow + ' '}${this._req}` : form?.get(ctrl)?.hasError('empty')
        ? this._quantity : '';
  }
  static changeSelection(form: UntypedFormGroup, ctrl: string, ctrlToShow: string) {
    return form?.get(ctrl)?.hasError('changeOpt') ? `${this._opt}` : '';
  }

  static minMaxLength(form: UntypedFormGroup, ctrl: string, ctrlToShow: string, lengthMin?: number, lengthMax?: number) {
    return form.get(ctrl).hasError('minlength')
      ? `${ctrlToShow} ${this._minLen}${lengthMin}${this._characters}` : form.get(ctrl).hasError('maxlength')
        ? `${ctrlToShow} ${this._maxLen}${lengthMax}${this._characters}` : '';
  }

  static minMax(form: UntypedFormGroup, ctrl: string, ctrlToShow: string, valueMin?: number, valueMax?: number) {
    return form.get(ctrl).hasError('min')
      ? `${this._min}${valueMin}.` : form.get(ctrl).hasError('max')
        ? `${this._max}${valueMax}.` : null;
  }

  static touchedErrors(groupOrArray: UntypedFormGroup, ctrl: string) {
    return groupOrArray.get(ctrl).errors
      && groupOrArray.get(ctrl).touched
      ? true : false;
  }

}
