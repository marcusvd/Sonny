import { FormBase } from './form-base';


export class InputField extends FormBase<string> {
  override controlType = 'textbox';
}
