import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";


import { environment } from 'src/environments/environment';
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CustomerDto } from "../../commons-components/dtos/customer-dto";
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



  //companyId: number = JSON.parse(localStorage.getItem('companyId'));



save(form: FormGroup) {
  if (form.get('entityType').value)
    form.get('entityType').setValue(0);
  else
    form.get('entityType').setValue(1);

  const toSave: CustomerDto = { ...form.value }

  this.add$<CustomerDto>(toSave, 'AddCustomer').subscribe({
    next: (_cli: CustomerDto) => {
       this._communicationsAlerts.defaultSnackMsg('0', 0);
      this._route.navigateByUrl(`/side-nav/customer-dash/list/${this.companyId}`)
    },
    error: (err) => {
      const erroCode: string = err.error.Message
      this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
    }
  })



}




}
