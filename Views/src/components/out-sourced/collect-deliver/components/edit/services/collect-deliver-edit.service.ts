import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";



@Injectable()

export class CollectDeliverEditService extends BackEndService<CollectDeliverDto> {


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) { super(_http, environment._COLLECTDELIVER) }


  update(form: FormGroup) {
    const toSave: CollectDeliverDto = { ...form.value }

    this.update$<CollectDeliverDto>('update', toSave).subscribe({
      next: (collectDeliver: CollectDeliverDto) => {
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.defaultSnackMsg('4', 1);
      }
    })



  }



  // companyId: number = JSON.parse(localStorage.getItem('companyId'));
  // save(form: FormGroup) {

  //   const toSave: CollectDeliverDto = { ...form.value }
  //   console.log(toSave);


  //   this.add$<CollectDeliverDto>(toSave, 'addcollectdeliver').subscribe({
  //     next: () => {

  //       this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
  //       this._router.navigateByUrl(`/side-nav/partner-dash/list-collect-deliver/${this.companyId}`)
  //       form.reset();
  //     },
  //     error: (errors) => {
  //       console.log(errors)
  //       this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
  //     }
  //   })

  // }

}
