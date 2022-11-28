import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { InventoryDto } from "src/components/providers/Inventory/dto/inventory-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { NavBackService } from "src/shared/services/navigation/nav-back.service";
import { environment } from "src/environments/environment";
import { EquipamentDto } from "../components/inventory-equipament/dto/equipament-dto";


@Injectable()
export class InventoryCreateService extends BackEndService<InventoryDto, number>{


  private _isNewShowHide: boolean = false;
  private _selectedCat: number;
  public _formInventory: FormGroup;
  startDate = new Date(2021, 0, 1);

  constructor(
    protected _http: HttpClient,
    private _SnackBar: MsgOperation
  ) {
    super(_http, environment._INVENTORIES);
  }

  get isNewShowHide() {
    return this._isNewShowHide;
  }
  get selectedCat() {
    return this._selectedCat;
  }



  // getResolver(e: EquipamentDto[], p: PartnerDto[]) {

  //   console.log(e)
  //   console.log(p)

  // }


  save(form: FormGroup) {

    const _inventory: InventoryDto = { ...form.value };

    console.log('Antes', _inventory)

    this.add$<InventoryDto>(_inventory).subscribe((_inv: InventoryDto) => {

      this._SnackBar.msgCenterTop(`${_inv.manufactorer} ${_inv.model}`, 0, 2);

      // this._Router.navigate(['/list']);
    })


  }



}
