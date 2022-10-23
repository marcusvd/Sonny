import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';

import { PartnerDto } from "src/components/partner/dto/partner-dto";

@Injectable({ providedIn: 'root' })
export class PartnerCreateService extends BackEndService<PartnerDto, number> {


  constructor(
    protected _Http: HttpClient,
    private _Route: Router,
    private _SnackBar: MsgOperation,

  ) {
    super(_Http, environment._CLIENTS);
  }

  save(form: FormGroup) {
    if (form.valid) {
      const _Partner: PartnerDto = { ...form.value };
      this.add$(_Partner).subscribe((Partner: PartnerDto) => {
        this._SnackBar.msgCenterTop(`Parceiro ${_Partner.name} ${_Partner.businessline}`, 0, 5);

        this._Route.navigate(['partners']);
      })
    }
  }





}
