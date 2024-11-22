import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { BudgetServiceDto } from "src/components/bench-budget-service/dto/budget-service-dto";
import { environment } from "src/environments/environment";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

@Injectable({ providedIn: 'root' })
export class EditServicesService extends BackEndService<BudgetServiceDto>{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._BACK_END_ROOT_URL);
  }

  update(form: FormGroup) {

     const prices = form.get('service').get('prices') as FormArray;
    // for (let n = 0; prices.controls.length < n; n++) {
    //   if (form.get('service').get('prices').get(n.toString()).get('id').value === null) {
    //     form.get('service').get('prices').get(n.toString()).get('id').setValue('0');
    //     console.log('é nullo')
    //   }
    // }

    if (form.get('service').get('userId').value === null)
      form.get('service').get('userId').setValue(localStorage.getItem("userId"));



    if (form.get('service').get('finished').value === null)
      form.get('service').get('finished').setValue('0001-01-01T00:00:00.000Z');

    if (form.get('service').get('id').value === null)
      form.get('service').get('id').setValue(0);



    const toSave: BudgetServiceDto = { ...form.value }

    this.update$<BudgetServiceDto>('BudgetsServices/OpenBudgetServices', toSave).subscribe({
      next: (x => {
        this._communicationsAlerts.defaultSnackMsg('0', 0);
        form.reset();
      }),
      error: (errors => {
         this._communicationsAlerts.defaultSnackMsg('4', 1);
        console.log(errors)
      })
    })
  }



  // save(form: FormGroup) {

  //   const toSave: ProductDto = { ...form.value };
  //   this.add$<ProductDto>(toSave, 'products/AddProductAsync').subscribe({
  //     next: () => {
  //       this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
  // this._communicationsAlerts.defaultSnackMsg('4', 1);
  //       form.reset();
  //     },
  //     error: (errors) => {
  //       this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
  // this._communicationsAlerts.defaultSnackMsg('4', 1);
  //       console.log(errors)
  //     }
  //   })
  // }

}
