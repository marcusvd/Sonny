import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { NavBackService } from "src/app/_shared/services/navigation/nav-back.service";
import { environment } from "src/environments/environment";
import { SupplierDto } from "../../supplier/dto/supplier-dto";

@Injectable()
export class InventoryListService extends BackEndService<InventoryDto, number>{

  private _inventories: InventoryDto[] = [];

  constructor(
    protected _Http: HttpClient,
    // private _Fb: FormBuilder,
    // private _ValidationMsg: ValidatorsService,
    // private _SnackBar: MsgOperation,
    // private _Router: Router,
  ) {

    super(_Http, '', environment._INVENTORIES_EQUIPAMENT_INCLUDED);
  }

  get inventories() {
    return this._inventories
  }


  loadAll() {

    this.loadAllIncluded$<InventoryDto>().subscribe((i: InventoryDto[]) => {
      this._inventories = i;
     })

    // this.loadAllIncluded$<InventoryDto>().subscribe(
    //   (_inventories: InventoryDto[]) => {
    //     console.log(_inventories)
    //   });

  }



}
