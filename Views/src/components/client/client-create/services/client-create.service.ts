import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClientDto } from "src/components/client/dto/client-dto";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class ClientCreateService extends BackEndService<ClientDto, number> {


  // private _valueDate: boolean;

  constructor(
    protected _Http: HttpClient,
    private _Route: Router,
    private _SnackBar: MsgOperation,
  ) {
    super(_Http, environment._CUSTOMERS);
  }





  save(form: FormGroup) {

    const toSave: ClientDto = { ...form.value }

    this.add$<ClientDto>(toSave).subscribe({
      next: (_cli: ClientDto) => {
        this._SnackBar.msgCenterTop(`Parceiro ${_cli.name} ${_cli.assured}`, 0, 5);
        this._Route.navigateByUrl('/clientlist').then((item) => {
          if (!item) {
            this._Route.navigateByUrl('create');
          }
        });
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
