import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { environment } from 'src/environments/environment';
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";

@Injectable({ providedIn: 'root' })
export class PartnerEditService extends BackEndService<PartnerDto> {


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,


  ) {
    super(_http, environment._PARTNERS);
  }



  save(form: FormGroup) {

    // if (form.get('businessLine').value.toLowerCase() === this.businesslineArray[7].businessLine.toLowerCase()) {
    //   form.get('businessLine').setValue(form.get('businessLineOther').value);
    //   form.controls['businessLineOther'].disable();
    // }

    // if (form.get('businessLine').value.toLowerCase() === this.businesslineArray[1].businessLine.toLowerCase()) {
    //   form.get('hardwareSupplier').setValue(true);
    // }
    // if (form.get('businessLine').value.toLowerCase() === this.businesslineArray[4].businessLine.toLowerCase()) {
    //   form.get('transporter').setValue(true);
    // }
    // if (form.get('businessLine').value.toLowerCase() === this.businesslineArray[6].businessLine.toLowerCase()) {
    //   form.get('eletronicRepair').setValue(true);
    // }
    // if (form.get('businessLine').value.toLowerCase() === this.businesslineArray[5].businessLine.toLowerCase()) {
    //   form.get('eletronicRepair').setValue(true);
    // }





    const toSave: PartnerDto = { ...form.value };
    console.log(toSave)
    this.add$<PartnerDto>(toSave, 'AddPartner').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 3);
        form.reset();
      },
      error: (err) => {
        console.log(err)
        const erroCode: string = err.error.Message
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);

      }
    })
  }



}
