import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class CustomerCreateService extends BackEndService<CustomerDto> {


  // private _valueDate: boolean;

  constructor(
    override _http: HttpClient,
    private _route: Router,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._CUSTOMERS);
  }

  save(form: FormGroup) {
    const toSave: CustomerDto = { ...form.value }
    if (!form.get('customerType').value)
      form.get('customerType').setValue(1);
     else
      form.get('customerType').setValue(0);

      this.add$<CustomerDto>(toSave, 'AddCustomer').subscribe({
      next: (_cli: CustomerDto) => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
        console.log('aqui', toSave)
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })



  }




}
