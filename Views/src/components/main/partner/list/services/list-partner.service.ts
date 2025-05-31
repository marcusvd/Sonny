import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { environment } from "../../../../../environments/environment";
import { BackEndService } from "../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../shared/services/messages/snack-bar.service";
import { PartnerDto } from "../../dtos/partner-dto";


@Injectable({providedIn: 'root' })

export class ListPartnerService extends BackEndService<PartnerDto>{

  private _partner: PartnerDto;
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts

  ) {
    super(_http, environment._PARTNERS)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const partner = new PartnerDto();
    partner.id = id;

    this.deleteFake$<PartnerDto>('DeleteFakePartner', partner).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, '', 4);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg(error, 1);
          return false;
        }

      }
    );


  }



}
