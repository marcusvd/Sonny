
import { FormGroup, Validators } from "@angular/forms";



export class ProductValidators {

  static requiredIfBool(form: FormGroup, controlBool: string, controlToSet: string, arrayName:string, index:number) {

    const formMain = form;
    const ctrlBool = controlBool;
    const ctrlSet = controlToSet;

    //console.log(formMain?.get(arrayName).get(index.toString()).get(ctrlBool).value)

    if (formMain?.get(arrayName).get(index.toString()).get(ctrlBool).value) {
      formMain?.get(arrayName).get(index.toString()).get(ctrlSet).setValidators(Validators.required);
      formMain?.get(arrayName).get(index.toString()).get(ctrlSet).updateValueAndValidity();
    }
    if (!formMain?.get(arrayName).get(index.toString()).get(ctrlBool).value) {
      formMain?.get(arrayName).get(index.toString()).get(ctrlSet).removeValidators(Validators.required);
      formMain?.get(arrayName).get(index.toString()).get(ctrlSet).updateValueAndValidity();
    }

  }

}
