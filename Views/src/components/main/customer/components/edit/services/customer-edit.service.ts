import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";
@Injectable({ providedIn: 'root' })
export class CustomerEditService extends BackEndService<CustomerDto> {


  // private _valueDate: boolean;

  constructor(
    override _http: HttpClient,
    private _router: Router,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }


  companyId: number = JSON.parse(localStorage.getItem('companyId'));



  update(form: FormGroup) {
    if (form.get('entityType').value)
      form.get('entityType').setValue(0);
    else
      form.get('entityType').setValue(1);

    const toSave: CustomerDto = { ...form.value }

    this.update$<CustomerDto>('customers/update', toSave).subscribe({
      next: (_cli: CustomerDto) => {
        this._communicationsAlerts.communication('', 2, 2, 'top', 'center');
        // this._route.navigateByUrl(`/side-nav/customer-dash/list/${this.companyId}`)
        // this._router.navigateByUrl(`/side-nav/customer-dash/edit/${toSave.id}`)
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })



  }




}
