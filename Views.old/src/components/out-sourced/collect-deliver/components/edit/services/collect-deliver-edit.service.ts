import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";
import { CollectDeliverUpdateDto } from "../../../dto/collect-deliver-update-dto";



@Injectable()

export class CollectDeliverEditService extends BackEndService<CollectDeliverDto> {


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) { super(_http, environment._COLLECT_DELIVER) }


  update(form: FormGroup) {
    const toSave: CollectDeliverUpdateDto = { ...form.value }

    this.update$<CollectDeliverDto>('updatecollectDeliver', toSave).subscribe({
      next: (collectDeliver: CollectDeliverDto) => {
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.defaultSnackMsg('4', 1);
      }
    })



  }


}
