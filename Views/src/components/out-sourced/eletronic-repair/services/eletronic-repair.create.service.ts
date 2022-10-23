import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressService } from "src/shared/components/address/services/address.service";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "../../../client/dto/client-dto";
import { CollectDeliverDto } from "../../collect-deliver-list-table-all/dto/collect-deliver-dto";

import { PartnerDto } from "../../../partner/dto/partner-dto";
import { EletronicRepairDto } from "../dto/eletronic-repair-dto";

@Injectable()

export class EletronicRepairCreateService extends BackEndService<CollectDeliverDto, number> {



  formMain: FormGroup;
  cli: ClientDto[] = [];
  par: PartnerDto[] = [];


  constructor(
    protected Http: HttpClient,
    private _SnackBar: MsgOperation,
    private _Route: Router,


  ) { super(Http, environment._ELETRONIC_REPAIR) }




  save() {
    let eletronicRepair: EletronicRepairDto = { ...this.formMain.value }



    const partnerId: number = parseInt(this.formMain.get('partnerId').value);
    let authorized  = (this.formMain.get('authorized').value);
    let finished = (this.formMain.get('finished').value);

    if (!authorized) {
      eletronicRepair.authorized = false;

    }
    if (!partnerId) {
      eletronicRepair.partnerId = 0;
    }
    if (!eletronicRepair.finished) {
      eletronicRepair.finished = false;
    }
    this.add$<EletronicRepairDto>(eletronicRepair).subscribe({
      next: (result: EletronicRepairDto) => {
        this._SnackBar.msgCenterTop(`Parceiro ${result.item} ${result.price}`, 0, 5);

        this._Route.navigate(['partners']);
      }
    })

  }
}
