import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
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
      error: (err) => {
        console.log(err)
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
