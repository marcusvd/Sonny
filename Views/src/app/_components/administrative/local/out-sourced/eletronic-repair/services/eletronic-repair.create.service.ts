import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressValidatorsService } from "src/app/_shared/components/address/services/address-validators.service";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "../../../../client/dto/client-dto";
import { CollectDeliverDto } from "../../dto/collect-deliver-dto";
import { PartnerDto } from "../../dto/partner-dto";
import { EletronicRepairDto } from "../dto/eletronic-repair-dto";

@Injectable()

export class EletronicRepairCreateService extends BackEndService<CollectDeliverDto, number> {



  formMain: FormGroup;
  cli: ClientDto[] = [];
  par: PartnerDto[] = [];


  constructor(
    protected Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,

  ) { super(Http, environment._ELETRONIC_REPAIR) }


  formLoad() {
    return this.formMain = this._Fb.group({

      item: ['', []],
      day: ['', []],
      problem: ['', []],
      user: ['', []],
      password: ['', []],
      price: ['', []],
      partnerId: ['', []],
      solution: ['', []],
      authorized: ['', []],
      finished: ['', []],
    })
  }



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
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this.formMain);
        this._Route.navigate(['partners']);
      }
    })

  }
}
