import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { NavBackService } from "src/app/_shared/services/navigation/nav-back.service";
import { environment } from "src/environments/environment";
import { PartnerDto } from "../../../out-sourced/dto/partner-dto";
import { SupplierDto } from "../../supplier/dto/supplier-dto";
import { EquipamentDto } from "../inventory-equipament/dto/equipament-dto";


@Injectable()
export class InventoryCreateService extends BackEndService<InventoryDto, number>{

  private _suppliers: SupplierDto[] = [];
  private _isNewShowHide: boolean = false;
  private _selectedCat: number;
  public _formInventory: FormGroup;
  startDate = new Date(2021, 0, 1);

  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder,
    private _ValidationMsg: ValidatorsService,
    private _SnackBar: MsgOperation
  ) {
    super(_Http, environment._INVENTORIES);
  }

  get suppliers() {
    return this._suppliers;
  }
  get isNewShowHide() {
    return this._isNewShowHide;
  }
  get selectedCat() {
    return this._selectedCat;
  }

  formLoad() {
    this._formInventory = this._Fb.group({
      equipamentId: ['', []],
      cost: ['', []],
      saleprice: ['', []],
      isnew: [false, []],
      istested: [false, []],
      quantity: ['', []],
      partnerId: ['', []],
      warranty: ['', []],
      today: ['', []],
      sn: ['', []],
      driver: ['', []],
      manufactorer: ['', []],
      model: ['', []],
      generation: ['', []],
      capacity: ['', []],
      speed: ['', []],
      comment: ['', []],
      historical: ['', []],
    })
  }

  // getResolver(e: EquipamentDto[], p: PartnerDto[]) {

  //   console.log(e)
  //   console.log(p)

  // }


  save() {
    const _inventory: InventoryDto = { ...this._formInventory.value };
    console.log('Antes', _inventory)

    this.add$<InventoryDto>(_inventory).subscribe((_inv: InventoryDto) => {

      this._SnackBar.msgCenterTop(`${_inv.manufactorer} ${_inv.model}`, 0, 2);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formInventory)
      // this._Router.navigate(['/list']);
    })


  }



}
