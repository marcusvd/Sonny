import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";
@Injectable({ providedIn: 'root' })
export class CustomerCreateService extends BackEndService<CustomerDto> {


  // private _valueDate: boolean;

  constructor(
    override _http: HttpClient,
    private _route: Router,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(
      _http, environment._CUSTOMERS

    );
  }



  companyId: number = JSON.parse(localStorage.getItem('companyId'));



save(form: FormGroup) {
  if (form.get('entityType').value)
    form.get('entityType').setValue(0);
  else
    form.get('entityType').setValue(1);

  const toSave: CustomerDto = { ...form.value }

  this.add$<CustomerDto>(toSave, 'AddCustomer').subscribe({
    next: (_cli: CustomerDto) => {
      this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
      this._route.navigateByUrl(`/side-nav/customer-dash/list/${this.companyId}`)
    },
    error: (errors) => {
      console.log(errors)
      this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
    }
  })



}




}
