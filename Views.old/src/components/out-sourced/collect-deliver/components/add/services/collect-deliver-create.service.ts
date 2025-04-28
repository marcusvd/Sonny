import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";



@Injectable()

export class CollectDeliverCreateService extends BackEndService<CollectDeliverDto> {

  // public cli: CustomerDto[] = [];
  // public transporters: PartnerDto[] = [];
  // public com: CompanyDto[] = [];

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) { super(_http, environment._COLLECT_DELIVER) }

  save(form: FormGroup) {

    const toSave: CollectDeliverDto = { ...form.value }
    this.add$<CollectDeliverDto>(toSave, 'addcollectdeliver').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        this._router.navigateByUrl(`/side-nav/partner-dash/list-collect-deliver/${this.companyId}`)
        form.reset();
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.defaultSnackMsg('4',1);
      }
    })

  }

}
