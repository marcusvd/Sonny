import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


import { environment } from "src/environments/environment";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";
import { Router } from "@angular/router";
import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";


@Injectable()

export class CollectDeliverEditService extends BackEndService<CollectDeliverDto> {

  //private _formMain: FormGroup;
  public cli: CollectDeliverDto[] = [];
  public transporters: PartnerDto[] = [];
  public com: CompanyDto[] = [];

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) { super(_http, environment._COLLECTDELIVER) }


  update(form: FormGroup) {
    const toSave: CollectDeliverDto = { ...form.value }

    this.update$<CollectDeliverDto>('update', toSave).subscribe({
      next: (collectDeliver: CollectDeliverDto) => {
        this._communicationsAlerts.communication('', 2, 2, 'top', 'center');
        // this._route.navigateByUrl(`/side-nav/customer-dash/list/${this.companyId}`)
        // this._router.navigateByUrl(`/side-nav/customer-dash/edit/${toSave.id}`)
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
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
