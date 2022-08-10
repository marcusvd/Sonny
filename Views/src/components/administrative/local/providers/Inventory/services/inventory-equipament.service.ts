import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PartnerDto } from "src/components/administrative/local/out-sourced/dto/partner-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { EquipamentDto } from "../inventory-equipament/dto/equipament-dto";


@Injectable()
export class InventoryEquipamentService extends BackEndService<EquipamentDto, number>{

  private _formMain: FormGroup;

  startDate: Date = new Date()

  constructor(
    protected _Http: HttpClient,
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,

    ) {
    super(_Http, environment._EQUIPAMENTS)
  }



get formGet(){
  return this._formMain;
}

  _form() {
    return this._formMain = this._FormBuilder.group({
      name: ['', []],
      description: ['', []],
    })
  }

  save() {
    const typeP: EquipamentDto = { ... this._formMain.value }
    this.add$<EquipamentDto>(typeP).subscribe((x) => {
      this._SnackBar.msgCenterTop(`Parceiro ${typeP.name}`, 0, 5);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formMain);

    });
  }








}
