import { FormArray, UntypedFormGroup } from "@angular/forms";

export class ValidatorsMessagesAuthentication  {

  private static _errorUserNameDuplicated: string = 'Nome de usuário, já cadastrado, mude o nome do usuário e tente novamente.';

  static duplicatedUserName(form: UntypedFormGroup, ctrl: string) {
    return form.get(ctrl).hasError('errorUserNameDuplicated')
      ? `${this._errorUserNameDuplicated}` : '';
  }

}
