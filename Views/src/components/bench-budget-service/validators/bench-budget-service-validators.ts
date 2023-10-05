
import { AbstractControl, FormGroup, Validators } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import * as moment from "moment";


export class BenchBudgetServiceValidators {

  requiredSetFiel(form: FormGroup, $event: MatCheckbox) {
    const dataAccessCheck = $event;
    const formMain = form;
    if (dataAccessCheck.checked) {
      formMain.get('dataDescription').setValidators(Validators.required)
      formMain.get('dataDescription').updateValueAndValidity();
    }
    else {
      formMain.get('dataDescription').removeValidators(Validators.required)
      formMain.get('dataDescription').updateValueAndValidity();
    }
  }
  requiredSetFielInit(form: FormGroup) {
    const formMain = form;
    formMain.get('dataDescription').setValidators(Validators.required)
    formMain.get('dataDescription').updateValueAndValidity();
  }

}

