import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { environment } from '../../../../../environments/environment';
import { BackEndService } from "../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../shared/services/messages/snack-bar.service";

import { Router } from "@angular/router";
import { EntityTypeEnumDto } from "../../../../../components/main/inheritances/dtos/enum/entity-type.enum-dto";
import { PartnerDto } from "../../dtos/partner-dto";

@Injectable({ providedIn: 'root' })
export class AddPartnerService extends BackEndService<PartnerDto> {


  constructor(
    override _http: HttpClient,
        private _route: Router,
    private _communicationsAlerts: CommunicationAlerts,


  ) {
    super(_http, environment._PARTNERS);
  }

  //companyId: number = JSON.parse(localStorage.getItem('companyId'));

  save(form: FormGroup) {

    const toSave: PartnerDto = { ...form.value };

    if (toSave.entityType)
      toSave.entityType = EntityTypeEnumDto.PJ;
    else
      toSave.entityType = EntityTypeEnumDto.PF;

    this.add$<PartnerDto>(toSave, 'AddPartner').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, "", 3);
          this._route.navigateByUrl(`/partner-dash/list-partner/${this.companyId}`)
      },
      error: (err) => {
        console.log(err)
        const erroCode: string = err.error.Message
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);

      }
    })
  }



}
