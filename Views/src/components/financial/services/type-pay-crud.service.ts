import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { TypePaymentDto } from "../dto/type-payment-dto";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { FormGroup } from "@angular/forms";

@Injectable()

export class TypePayCrudService extends BackEndService<TypePaymentDto, number>{
  constructor(
    protected _Http: HttpClient,
    private _SnackBar: MsgOperation,

    ) {
    super(_Http, environment._TYPEPAY)
  }






  save(form:FormGroup){
    const typeP: TypePaymentDto = {... form.value}
    this.add$<TypePaymentDto>(typeP).subscribe((x)=> {
      this._SnackBar.msgCenterTop(`Parceiro ${typeP.name}`, 0, 5);
     // this._ValidationMsg.cleanAfters(['contact', 'addresss'], form);

    });
  }


}
