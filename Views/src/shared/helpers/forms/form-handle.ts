import { FormGroup, Validators } from "@angular/forms";
//
//
//
//
//its not in use;
export class  FormHandle {


  static setForm(form: FormGroup, field: string, content: any) {
    form.get(field)?.setValue(content);
  }

  static cleanForm(form: FormGroup, field: string) {
    form.get(field)?.setValue(null);
    form.get(field)?.removeValidators(Validators.required);
    form.get(field)?.updateValueAndValidity();
  }

  //   actualDate() {
  //     this.setForm('start', new Date(), 'formMain')
  //   }
}
