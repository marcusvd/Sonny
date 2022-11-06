import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { EquipamentDto } from "../components/inventory-equipament/dto/equipament-dto";


@Injectable()
export class InventoryEquipamentService extends BackEndService<EquipamentDto, number>{



  startDate: Date = new Date()

  constructor(
    protected _Http: HttpClient,
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,


    ) {
    super(_Http, environment._EQUIPAMENTS)
  }



  save(form:FormGroup) {
    const typeP: EquipamentDto = { ...form.value }
    this.add$<EquipamentDto>(typeP).subscribe((x) => {
      this._SnackBar.msgCenterTop(`Parceiro ${typeP.name}`, 0, 5);


    });
  }








}
