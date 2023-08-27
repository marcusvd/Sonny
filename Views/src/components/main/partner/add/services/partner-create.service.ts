import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation, ToolTips } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';

import { PartnerDto } from "src/components/main/partner/dto/partner-dto";

@Injectable({ providedIn: 'root' })
export class PartnerCreateService extends BackEndService<PartnerDto> {


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,


  ) {
    super(_http, environment._PARTNERS);
  }

  public businesslineArray: any[] = [
    { id: 0, businessLine: 'SELECIONE UMA OPÇÃO' },
    { id: 1, businessLine: 'FORNECEDOR HARDWARE' },
    { id: 2, businessLine: 'TÉCNICO DE INFORMÁTICA' },
    { id: 3, businessLine: 'REDE FÍSICA' },
    { id: 4, businessLine: 'MOTOBOY' },
    { id: 5, businessLine: 'REPARO NOTEBOOKS' },
    { id: 6, businessLine: 'REPARO ELETÔNICA GERAL' },
    { id: 7, businessLine: 'OUTROS' },
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
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();

      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');

      }
    })
  }



}
