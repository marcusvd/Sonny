import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressService } from "src/shared/components/address/services/address.service";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";

import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { PartnerDto } from "src/components/partner/dto/partner-dto";

@Injectable()

export class CollectDeliverCreateService extends BackEndService<CollectDeliverDto, number> {

  //private _formMain: FormGroup;
  public cli: CustomerDto[] = [];
  public par: PartnerDto[] = [];
  public com: CompanyDto[] = [];

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) { super(_http, environment._COLLECTDELIVER) }


  // get formMain(): FormGroup {
  //   return this._formMain
  // }


  save(form: FormGroup) {
    const toSave: CollectDeliverDto = { ...form.value }
    this.add$<CollectDeliverDto>(toSave,'').subscribe({
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
