import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { environment } from 'src/environments/environment';
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";
import { EntityTypeEnumDto } from "src/shared/entities-dtos/main/inheritances/enum/entity-type.enum-dto";

@Injectable({ providedIn: 'root' })
export class PartnerEditService extends BackEndService<PartnerDto> {


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._PARTNERS);
  }

  update(form: FormGroup) {

    const toSave: PartnerDto = { ...form.value };

    if (toSave.entityType)
      toSave.entityType = EntityTypeEnumDto.PJ;
    else
      toSave.entityType = EntityTypeEnumDto.PF;

    this.update$<PartnerDto>('UpdatePartner', toSave).subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 3);
      },
      error: (err) => {
        console.log(err)
        const erroCode: string = err.error.Message
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);

      }
    })
  }



}
