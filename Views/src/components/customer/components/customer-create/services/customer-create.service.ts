import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class CustomerCreateService extends BackEndService<CustomerDto, number> {


  // private _valueDate: boolean;

  constructor(
    protected _Http: HttpClient,
    private _route: Router,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_Http, environment._CUSTOMERS);
  }

  save(form: FormGroup) {
    const toSave: CustomerDto = { ...form.value }
    if (!form.get('assured').value) {
      toSave.payment = 0;
      toSave.expiration = 0;
    }

    this.add$<CustomerDto>(toSave).subscribe({
      next: (_cli: CustomerDto) => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
        // this._route.navigateByUrl('/clientlist').then((item) => {
        //   if (!item) {
        //     this._route.navigateByUrl('create');
        //   }
        // });
        // this._Route.navigate(['/clientmain/clientlist']);
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })



  }

  // valueAndDateChange() {
  //   this._valueDate = !this._valueDate
  // }

  // get valueDateGet() {
  //   return this._valueDate
  // }



}