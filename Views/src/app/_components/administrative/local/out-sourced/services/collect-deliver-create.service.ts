import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressValidatorsService } from "src/app/_shared/components/address/services/address-validators.service";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "../../../client/dto/client-dto";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";
import { PartnerDto } from "../dto/partner-dto";

@Injectable()

export class CollectDeliverCreateService extends BackEndService<CollectDeliverDto, number> {



  formMain: FormGroup;
   cli: ClientDto[]=[];
   par: PartnerDto[]=[];


  constructor(
    protected Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,

  ) { super(Http, environment._COLLECTDELIVER) }


  formLoad() {
    return this.formMain = this._Fb.group({
      typeOfService: ['', []],
      transporter: ['', []],
      noregisterd: ['', []],
      start: ['', []],
      price: ['', []],
      clientId: ['', []],
      partnerId: ['', []],
      noRegisterName: ['', []],
      noRegisterAddress: ['', []],
      items: ['', []],
      comments: ['', []],

    })
  }



  save() {
    let cdDto: CollectDeliverDto = { ...this.formMain.value }

    const clientId: number = parseInt(this.formMain.get('clientId').value);
    const partnerId: number = parseInt(this.formMain.get('partnerId').value);

    if (!clientId) {
      cdDto.clientId = 0
    }
    if (!partnerId) {
      cdDto.partnerId = 0
    }
    this.add$<CollectDeliverDto>(cdDto).subscribe({
      next: (result: CollectDeliverDto) => {
        this._SnackBar.msgCenterTop(`Parceiro ${result.typeOfService} ${result.price}`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this.formMain);
        this._Route.navigate(['partners']);
      }
    })

  }
}
