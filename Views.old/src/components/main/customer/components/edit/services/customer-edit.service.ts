import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";


import { environment } from 'src/environments/environment';
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CustomerDto } from "../../commons-components/dtos/customer-dto";

@Injectable({ providedIn: 'root' })
export class CustomerEditService extends BackEndService<CustomerDto> {


  // private _valueDate: boolean;

  constructor(
    override _http: HttpClient,
    private _router: Router,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._BACK_END_ROOT_URL);
  }

  update(form: FormGroup) {
    if (form.get('entityType').value)
      form.get('entityType').setValue(0);
    else
      form.get('entityType').setValue(1);

    const toSave: CustomerDto = { ...form.value }

    this.update$<CustomerDto>('customers/update', toSave).subscribe({
      next: (_cli: CustomerDto) => {
        this._communicationsAlerts.defaultSnackMsg('2', 0);
      },
      error: (err) => {
        console.log(err)
        const erroCode: string = err.error.Message
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })



  }




}
