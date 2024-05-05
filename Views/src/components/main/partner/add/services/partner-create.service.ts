import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';

import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";

@Injectable({ providedIn: 'root' })
export class PartnerCreateService extends BackEndService<PartnerDto> {


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,


  ) {
    super(_http, environment._PARTNERS);
  }

  public businesslineArray: any[] = [
    { id: 3, businessLine: 'SELECIONE UMA OPÇÃO' },
    { id: 1, businessLine: 'FORNECEDOR HARDWARE' },
    { id: 3, businessLine: 'TÉCNICO DE INFORMÁTICA' },
    { id: 3, businessLine: 'REDE FÍSICA' },
    { id: 0, businessLine: 'MOTOBOY / TRANSPORTADOR' },
    { id: 2, businessLine: 'REPARO NOTEBOOKS' },
    { id: 2, businessLine: 'REPARO ELETÔNICA GERAL' },
    { id: 3, businessLine: 'OUTROS' },
  ];

  save(form: FormGroup) {

    if (form.get('businessLine').value.toLowerCase() === this.businesslineArray[7].businessLine.toLowerCase()) {
      form.get('businessLine').setValue(form.get('businessLineOther').value);
      form.controls['businessLineOther'].disable();
    }

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
        // this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();

      },
      error: (errors) => {
        console.log(errors)
        // this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');

      }
    })
  }



}
