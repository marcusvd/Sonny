import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";

import { PartnerDto } from "../../../partner/dto/partner-dto";
import { EletronicRepairDto } from "../dto/eletronic-repair-dto";
import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { PartnerListService } from "src/components/partner/services/partner-list.service";
import { CollectDeliverDto } from "../../collect-deliver/collect-deliver-create/dto/collect-deliver-dto";

@Injectable()

export class EletronicRepairCreateService extends BackEndService<CollectDeliverDto, number> {






  constructor(
    protected _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,

    // private _Route: Router,
    // private _PartnerListService: PartnerListService,
  ) { super(_http, environment._ELETRONIC_REPAIR) }

  // loadAllClients() {
  //   this._http.get(environment._CUSTOMERS).subscribe(
  //     (customer: CustomerDto[]) => {
  //       this.customers = customer;
  //     },
  //     (error) => {
  //       console.log(error)
  //     },
  //     () => {
  //       console.log('complete')
  //     })
  // }

  // loadPartners() {
  //   this._PartnerListService.loadAll$<PartnerDto>().subscribe({
  //     next: (parteners:PartnerDto[]) => {
  //       this.partners = parteners
  //     },
  //     error:(errors)=>{
  //       console.log(errors)
  //     }
  //   })
  // }

  save(form: UntypedFormGroup) {
    let toSave: EletronicRepairDto = { ...form.value }

    // const partnerId: number = parseInt(form.get('partnerId').value);
    // let authorized = (form.get('authorized').value);
    // let finished = (form.get('finished').value);

    // if (!authorized) {
    //   toSave.authorized = false;

    // }
    // if (!partnerId) {
    //   toSave.partnerId = 0;
    // }
    // if (!toSave.finished) {
    //   toSave.finished = false;
    // }

    this.add$<EletronicRepairDto>(toSave).subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
        // this._route.navigateByUrl('/clientlist').then((item) => {
        //   if (!item) {
        //     this._route.navigateByUrl('create');
        //   }
        // });
        // this._Route.navigate(['/clientmain/clientlist']);
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })
  }
}



